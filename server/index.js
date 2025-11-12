const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const pool = require("./db");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure upload directories exist
const createDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
createDir("uploads/reports");
createDir("uploads/bills");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "report") cb(null, "uploads/reports");
    else cb(null, "uploads/bills");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Helper: JWT
function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
}

// Auth middlewares
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing token" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function requireDoctor(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing token" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "doctor")
      return res.status(403).json({ error: "Not a doctor token" });
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Base route
app.get("/", (req, res) => res.json({ message: "MediTrack API running" }));

// ------------------- REGISTER -------------------
app.post("/api/register", async (req, res) => {
  try {
    const {
      hospital_name,
      username,
      password,
      receptionist_name,
      receptionist_contact,
      shift_timings,
    } = req.body;

    if (!hospital_name || !username || !password || !receptionist_name)
      return res.status(400).json({ error: "Missing required fields" });

    const [exists] = await pool.query(
      "SELECT * FROM hospitals WHERE hospital_name=? OR username=?",
      [hospital_name, username]
    );
    if (exists.length)
      return res
        .status(400)
        .json({ error: "Hospital name or username already exists" });

    const hash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO hospitals (hospital_name, username, password_hash) VALUES (?, ?, ?)",
      [hospital_name, username, hash]
    );
    const hospital_id = result.insertId;

    await pool.query(
      "INSERT INTO receptionists (name, contact, shift_timings, hospital_id) VALUES (?, ?, ?, ?)",
      [
        receptionist_name,
        receptionist_contact || "",
        shift_timings || "Morning",
        hospital_id,
      ]
    );

    res.json({ message: "Hospital and Receptionist registered successfully!" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// ------------------- LOGIN -------------------
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM hospitals WHERE username=?", [
      username,
    ]);
    const hospital = rows[0];
    if (!hospital) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, hospital.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken({
      hospital_id: hospital.hospital_id,
      hospital_name: hospital.hospital_name,
    });
    res.json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------- DOCTOR LOGIN -------------------
app.post("/api/doctor/login", async (req, res) => {
  try {
    const { doctor_name, specialization, hospital_name } = req.body;
    if (!doctor_name || !hospital_name)
      return res.status(400).json({ error: "Missing fields" });

    const [hrows] = await pool.query(
      "SELECT * FROM hospitals WHERE hospital_name=?",
      [hospital_name]
    );
    const hospital = hrows[0];
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    const [drows] = await pool.query(
      "SELECT * FROM doctors WHERE name=? AND hospital_id=?",
      [doctor_name, hospital.hospital_id]
    );

    let doctor = drows[0];
    if (!doctor) {
      const [r] = await pool.query(
        "INSERT INTO doctors (name, specialization, hospital_id) VALUES (?, ?, ?)",
        [doctor_name, specialization || "", hospital.hospital_id]
      );
      doctor = { doctor_id: r.insertId, name: doctor_name };
    }

    const token = signToken({
      role: "doctor",
      doctor_id: doctor.doctor_id,
      doctor_name: doctor.name,
      hospital_id: hospital.hospital_id,
    });
    res.json({ token });
  } catch (err) {
    console.error("DOCTOR LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------- ADD PATIENT -------------------
app.post(
  "/api/patients",
  requireAuth,
  upload.fields([
    { name: "report", maxCount: 1 },
    { name: "bill", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const hospital_id = req.user.hospital_id;
      const {
        patient_id,
        name,
        guardian_name,
        gender,
        contact,
        payment_status,
        amount,
      } = req.body;

      const report_file = req.files["report"]
        ? `uploads/reports/${req.files["report"][0].filename}`
        : null;
      const bill_file = req.files["bill"]
        ? `uploads/bills/${req.files["bill"][0].filename}`
        : null;

      await pool.query(
        `INSERT INTO patients 
        (patient_id, name, guardian_name, gender, contact, payment_status, amount, report_file, bill_file, hospital_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          patient_id,
          name,
          guardian_name,
          gender,
          contact,
          payment_status,
          amount || 0,
          report_file,
          bill_file,
          hospital_id,
        ]
      );

      res.json({ message: "Patient added successfully" });
    } catch (err) {
      console.error("ADD PATIENT ERROR:", err);
      res.status(500).json({ error: "Server error adding patient" });
    }
  }
);

// ------------------- GET ALL PATIENTS -------------------
app.get("/api/patients", requireAuth, async (req, res) => {
  try {
    const hospital_id = req.user.hospital_id;
    const [rows] = await pool.query(
      "SELECT * FROM patients WHERE hospital_id=? ORDER BY patient_id DESC",
      [hospital_id]
    );
    res.json(rows);
  } catch (err) {
    console.error("GET PATIENTS ERROR:", err);
    res.status(500).json({ error: "Error loading patients" });
  }
});

// ------------------- UPDATE PATIENT -------------------
// ✅ FIXED PATIENT UPDATE ROUTE
app.put(
  "/api/patients/:patient_id",
  requireAuth,
  upload.fields([
    { name: "report", maxCount: 1 },
    { name: "bill", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const hospital_id = req.user.hospital_id;
      const pid = req.params.patient_id;

      // 1️⃣ Get existing record
      const [existingRows] = await pool.query(
        "SELECT * FROM patients WHERE patient_id = ? AND hospital_id = ?",
        [pid, hospital_id]
      );
      if (!existingRows.length)
        return res.status(404).json({ error: "Patient not found" });

      const existing = existingRows[0];

      // 2️⃣ Extract form/body data
      const {
        name,
        guardian_name,
        gender,
        contact,
        payment_status,
        amount,
      } = req.body;

      // 3️⃣ File handling
      let report_file = existing.report_file;
      let bill_file = existing.bill_file;

      if (req.files?.report?.[0]) {
        report_file = `uploads/reports/${req.files.report[0].filename}`;
      }
      if (req.files?.bill?.[0]) {
        bill_file = `uploads/bills/${req.files.bill[0].filename}`;
      }

      // 4️⃣ Preserve old values if missing
      const updatedData = {
        name: name && name.trim() !== "" ? name : existing.name,
        guardian_name:
          guardian_name && guardian_name.trim() !== ""
            ? guardian_name
            : existing.guardian_name,
        gender: gender && gender.trim() !== "" ? gender : existing.gender,
        contact: contact && contact.trim() !== "" ? contact : existing.contact,
        payment_status:
          payment_status && payment_status.trim() !== ""
            ? payment_status
            : existing.payment_status,
        amount:
          amount && !isNaN(amount) && amount !== ""
            ? parseFloat(amount)
            : existing.amount || 0,
      };

      // 5️⃣ Update query
      await pool.query(
        `UPDATE patients 
         SET name=?, guardian_name=?, gender=?, contact=?, payment_status=?, amount=?, report_file=?, bill_file=?
         WHERE patient_id=? AND hospital_id=?`,
        [
          updatedData.name,
          updatedData.guardian_name,
          updatedData.gender,
          updatedData.contact,
          updatedData.payment_status,
          updatedData.amount,
          report_file,
          bill_file,
          pid,
          hospital_id,
        ]
      );

      res.json({ message: "✅ Patient updated successfully!" });
    } catch (err) {
      console.error("UPDATE PATIENT ERROR:", err);
      res.status(500).json({ error: "Server error updating patient" });
    }
  }
);


// ------------------- DELETE PATIENT -------------------
app.delete("/api/patients/:patient_id", requireAuth, async (req, res) => {
  try {
    const hospital_id = req.user.hospital_id;
    const pid = req.params.patient_id;

    await pool.query("DELETE FROM patients WHERE patient_id=? AND hospital_id=?", [
      pid,
      hospital_id,
    ]);

    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.error("DELETE PATIENT ERROR:", err);
    res.status(500).json({ error: "Error deleting patient" });
  }
});

// ------------------- DOCTOR VIEW PATIENT -------------------
// --- Doctor view patient (fixed version)
app.post("/api/doctor/patient", requireDoctor, async (req, res) => {
  try {
    const { patient_id, patient_name } = req.body;
    const hospital_id = req.user.hospital_id;

    if (!patient_id && !patient_name) {
      return res.status(400).json({ error: "Provide patient ID or name" });
    }

    let query = `
      SELECT 
        patient_id, 
        name, 
        guardian_name, 
        gender, 
        report_file
      FROM patients 
      WHERE hospital_id = ?`;

    const params = [hospital_id];

    if (patient_id) {
      query += " AND patient_id = ?";
      params.push(patient_id);
    } else {
      query += " AND name = ?";
      params.push(patient_name);
    }

    const [rows] = await pool.query(query, params);
    if (!rows.length) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patient = rows[0];

    // ✅ Convert to full public URL
    if (patient.report_file) {
      patient.report_url = `http://localhost:4000/${patient.report_file.replace(/\\/g, "/")}`;
    }

    res.json(patient);
  } catch (err) {
    console.error("DOCTOR VIEW ERROR:", err);
    res.status(500).json({ error: "Server error fetching patient" });
  }
});


// ------------------- STATS -------------------
app.get("/api/hospital/stats", requireAuth, async (req, res) => {
  try {
    const hospital_id = req.user.hospital_id;
    const [[{ doctorCount }]] = await pool.query(
      "SELECT COUNT(*) AS doctorCount FROM doctors WHERE hospital_id=?",
      [hospital_id]
    );
    const [[{ patientCount }]] = await pool.query(
      "SELECT COUNT(*) AS patientCount FROM patients WHERE hospital_id=?",
      [hospital_id]
    );
    const [[{ receptionistCount }]] = await pool.query(
      "SELECT COUNT(*) AS receptionistCount FROM receptionists WHERE hospital_id=?",
      [hospital_id]
    );

    const [doctors] = await pool.query(
      "SELECT name, specialization FROM doctors WHERE hospital_id=?",
      [hospital_id]
    );
    const [receptionists] = await pool.query(
      "SELECT name, shift_timings FROM receptionists WHERE hospital_id=?",
      [hospital_id]
    );

    res.json({ doctorCount, patientCount, receptionistCount, doctors, receptionists });
  } catch (err) {
    console.error("STATS ERROR:", err);
    res.status(500).json({ error: "Error fetching stats" });
  }
});

// ------------------- START SERVER -------------------
app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [form, setForm] = useState({
    patient_id: "",
    name: "",
    guardian_name: "",
    gender: "",
    contact: "",
    payment_status: "Pending",
    amount: "",
  });
  const [patients, setPatients] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [report, setReport] = useState(null);
  const [bill, setBill] = useState(null);
  const nav = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ Load all patients when page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      nav("/login");
      return;
    }
    loadPatients();
  }, []);


  async function loadPatients() {
    try {
      const res = await fetch("http://localhost:4000/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load patients");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error("Error loading patients:", err);
      alert("Error loading patient data");
    }
  }

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update Patient
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (report) fd.append("report", report);
      if (bill) fd.append("bill", bill);

      const method = editMode ? "PUT" : "POST";
      const url = editMode
        ? `http://localhost:4000/api/patients/${form.patient_id}`
        : "http://localhost:4000/api/patients";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error saving patient");

      alert(editMode ? "Patient updated successfully!" : "Patient added successfully!");
      resetForm();
      loadPatients();
    } catch (err) {
      console.error("Error adding/updating:", err);
      alert(err.message);
    }
  };

  const resetForm = () => {
    setForm({
      patient_id: "",
      name: "",
      guardian_name: "",
      gender: "",
      contact: "",
      payment_status: "Pending",
      amount: "",
    });
    setReport(null);
    setBill(null);
    setEditMode(false);
  };

  const startEdit = (p) => {
    setForm(p);
    setEditMode(true);
    window.scrollTo(0, 0);
  };

  const deletePatient = async (pid) => {
    if (!window.confirm("Delete this patient?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/patients/${pid}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error deleting patient");
      alert("Patient deleted!");
      loadPatients();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-container">
      {/* --- Add Patient Form --- */}
      <div className="card form-card">
        <h2>{editMode ? "Edit Patient" : "Add New Patient"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              name="patient_id"
              placeholder="Patient ID"
              value={form.patient_id}
              onChange={handleChange}
              required
              disabled={editMode}
            />
            <input
              name="name"
              placeholder="Patient Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="guardian_name"
              placeholder="Guardian Name"
              value={form.guardian_name}
              onChange={handleChange}
            />
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              name="contact"
              placeholder="Contact"
              value={form.contact}
              onChange={handleChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
            />
            <div className="form-section">
              <label htmlFor="payment_status">Payment Status</label>
              <select
                id="payment_status"
                name="payment_status"
                value={form.payment_status}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
              <label htmlFor="report">Upload Report</label>
              <input
                id="report"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="file-input"
                onChange={(e) => setReport(e.target.files[0])}
              />

              <label htmlFor="bill">Upload Bill</label>
              <input
                id="bill"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="file-input"
                onChange={(e) => setBill(e.target.files[0])}
              />
            </div>
          </div>
          <div className="btn-group">
            <button type="submit" className="btn-primary">
              {editMode ? "Update Patient" : "Add Patient"}
            </button>
            {editMode && (
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- Patients List --- */}
      <div className="card table-card">
        <h3>Patient Records</h3>
        {patients.length === 0 ? (
          <p>No patients added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Guardian</th>
                <th>Gender</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.patient_id}>
                  <td>{p.patient_id}</td>
                  <td>{p.name}</td>
                  <td>{p.guardian_name}</td>
                  <td>{p.gender}</td>
                  <td>
                    {p.payment_status} ₹{p.amount}
                  </td>
                  <td>
                    <button onClick={() => startEdit(p)} className="btn-warning">
                      Edit
                    </button>
                    <button
                      onClick={() => deletePatient(p.patient_id)}
                      className="btn-danger"
                    >
                      Delete
                    </button>
                    {p.report_file && (
                      <a
                        href={`http://localhost:4000/${p.report_file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-link"
                      >
                        Report
                      </a>
                    )}
                    {p.bill_file && (
                      <a
                        href={`http://localhost:4000/${p.bill_file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-link"
                      >
                        Bill
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style jsx="true">{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 30px;
          max-width: 1000px;
          margin: auto;
        }
          body {
  background-image: url("https://images.unsplash.com/photo-1588776814546-ec7eea9b8c0a?auto=format&fit=crop&w=1920&q=80");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
}

        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 25px;
        }
        h2,
        h3 {
          color: #0077b6;
          margin-bottom: 15px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        input,
        select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          width: 100%;
        }
        .btn-group {
          margin-top: 15px;
          display: flex;
          gap: 10px;
        }
        .btn-primary {
          background: #06d6a0;
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
        }
        .btn-secondary {
          background: #adb5bd;
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          border-bottom: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        th {
          background: #caf0f8;
        }
        .btn-warning {
          background: #ffb703;
          border: none;
          padding: 6px 10px;
          border-radius: 6px;
          margin-right: 5px;
        }
        .btn-danger {
          background: #d62828;
          border: none;
          padding: 6px 10px;
          border-radius: 6px;
          margin-right: 5px;
          color: white;
        }
        .btn-link {
          background: #118ab2;
          border: none;
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          text-decoration: none;
          margin-right: 5px;
        }
        
        .form-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 15px;
}

  label {
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
  }

  .input-field,
  .file-input,
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    background-color: #fafafa;
    transition: 0.3s ease;
  }

  .input-field:focus,
  .file-input:focus,
  select:focus {
    outline: none;
    border-color: #0077b6;
    background-color: #f0f8ff;
  }

  .file-input {
    background-color: #fff;
    padding: 8px;
  }

  .form-section input[type="file"]::-webkit-file-upload-button {
    background: #0077b6;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
  }

  .form-section input[type="file"]::-webkit-file-upload-button:hover {
    background: #023e8a;
  }

      `}</style>
    </div>
  );
}


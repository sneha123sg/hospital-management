import React, { useState } from "react";

export default function DoctorView() {
  const [form, setForm] = useState({ patient_id: "", patient_name: "" });
  const [patient, setPatient] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("doctor_token");

    try {
      const res = await fetch("http://localhost:4000/api/doctor/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");

      setPatient(data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert(err.message);
    }
  }

  return (
    <div className="doctor-view">
      <div className="card">
        <h2>Doctor — View Patient Report</h2>
        <form onSubmit={handleSubmit} className="grid">
          <input
            placeholder="Patient ID"
            value={form.patient_id}
            onChange={(e) =>
              setForm({ ...form, patient_id: e.target.value, patient_name: "" })
            }
          />
          <input
            placeholder="Patient Name"
            value={form.patient_name}
            onChange={(e) =>
              setForm({ ...form, patient_name: e.target.value, patient_id: "" })
            }
          />
          <button className="button" type="submit">
            View Patient
          </button>
        </form>
      </div>

      {patient && (
        <div className="card patient-info-card">
          <h3>🩺 Patient Information</h3>
          <table className="patient-info-table">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{patient.patient_id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{patient.name}</td>
              </tr>
              <tr>
                <th>Guardian</th>
                <td>{patient.guardian_name || "N/A"}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{patient.gender || "N/A"}</td>
              </tr>
              <tr>
                <th>Report</th>
                <td>
                  {patient.report_url ? (
                    <a
                      href={patient.report_url}
                      target="_blank"
                      rel="noreferrer"
                      className="button"
                      style={{ background: "#0077b6", color: "#fff" }}
                    >
                      View Report
                    </a>
                  ) : (
                    "No report uploaded"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <style jsx="true">{`
        .doctor-view {
          padding: 30px;
          max-width: 700px;
          margin: auto;
        }
        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 25px;
          margin-bottom: 25px;
        }
        h2, h3 {
          color: #0077b6;
          margin-bottom: 15px;
        }
        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          width: 100%;
          margin-bottom: 10px;
        }
        .button {
          background: #06d6a0;
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
        th, td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        th {
          color: #0077b6;
          width: 30%;
        }
      `}</style>
    </div>
  );
}

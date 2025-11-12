// import React, {useState} from "react";
// export default function AddPatient(){
//   const [form, setForm] = useState({ patient_id:"", name:"", guardian_name:"", contact:"", payment_status:"Pending", amount:"" });
//   const [report, setReport] = useState(null);
//   const [bill, setBill] = useState(null);

//   async function handleSubmit(e){
//     e.preventDefault();
//     const fd = new FormData();
//     Object.keys(form).forEach(k=>fd.append(k, form[k]));
//     if(report) fd.append("report", report);
//     if(bill) fd.append("bill", bill);

//     const token = localStorage.getItem("token");
//     const res = await fetch("http://localhost:4000/api/patients", { method:"POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
//     const data = await res.json();
//     if(res.ok) { alert("Patient added"); setForm({ patient_id:"", name:"", guardian_name:"", contact:"", payment_status:"Pending", amount:"" }); setReport(null); setBill(null); }
//     else alert(data.error || "Error adding patient");
//   }

//   return (
//     <div className="card" style={{maxWidth:680, margin:"20px auto"}}>
//       <h2>Add Patient (Step 3)</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Patient ID</label>
//         <input required value={form.patient_id} onChange={e=>setForm({...form, patient_id:e.target.value})} />
//         <label>Name</label>
//         <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
//         <label>Guardian</label>
//         <input value={form.guardian_name} onChange={e=>setForm({...form, guardian_name:e.target.value})} />
//         <label>Contact</label>
//         <input value={form.contact} onChange={e=>setForm({...form, contact:e.target.value})} />
//         <label>Amount</label>
//         <input type="number" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} />
//         <label>Payment Status</label>
//         <select value={form.payment_status} onChange={e=>setForm({...form, payment_status:e.target.value})}>
//           <option>Pending</option>
//           <option>Paid</option>
//         </select>
//         <label>Upload Report</label>
//         <input type="file" accept=".pdf,.jpg,.png" onChange={e=>setReport(e.target.files[0])} />
//         <label>Upload Bill</label>
//         <input type="file" accept=".pdf,.jpg,.png" onChange={e=>setBill(e.target.files[0])} />
//         <div style={{marginTop:12}}>
//           <button className="button" type="submit">Add Patient</button>
//         </div>
//       </form>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import "./AddPatient.css"; // 👈 import the new CSS
// import "../styles/FormPage.css";


// export default function AddPatient() {
//   const [form, setForm] = useState({
//     patient_id: "",
//     name: "",
//     guardian_name: "",
//     contact: "",
//     payment_status: "Pending",
//     amount: "",
//   });
//   const [report, setReport] = useState(null);
//   const [bill, setBill] = useState(null);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const fd = new FormData();
//     Object.entries(form).forEach(([key, value]) => fd.append(key, value));
//     if (report) fd.append("report", report);
//     if (bill) fd.append("bill", bill);

//     const token = localStorage.getItem("token");
//     const res = await fetch("http://localhost:4000/api/patients", {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: fd,
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("✅ Patient added successfully!");
//       setForm({
//         patient_id: "",
//         name: "",
//         guardian_name: "",
//         contact: "",
//         payment_status: "Pending",
//         amount: "",
//       });
//       setReport(null);
//       setBill(null);
//     } else {
//       alert(data.error || "Error adding patient");
//     }
//   }

//   return (
//     <div className="add-patient-container">
//       <h2 className="form-title">🩺 Add New Patient</h2>

//       <form className="patient-form" onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-grid">
//           {/* Left Column */}
//           <div className="form-section">
//             <label>Patient ID</label>
//             <input
//               type="text"
//               placeholder="Enter Patient ID"
//               value={form.patient_id}
//               required
//               onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
//             />

//             <label>Patient Name</label>
//             <input
//               type="text"
//               placeholder="Enter Patient Name"
//               value={form.name}
//               required
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />

//             <label>Guardian Name</label>
//             <input
//               type="text"
//               placeholder="Enter Guardian Name"
//               value={form.guardian_name}
//               onChange={(e) => setForm({ ...form, guardian_name: e.target.value })}
//             />

//             <label>Contact Number</label>
//             <input
//               type="text"
//               placeholder="Enter Contact Number"
//               value={form.contact}
//               onChange={(e) => setForm({ ...form, contact: e.target.value })}
//             />
//           </div>

//           {/* Right Column */}
//           <div className="form-section">
//             <label>Payment Status</label>
//             <select
//               value={form.payment_status}
//               onChange={(e) => setForm({ ...form, payment_status: e.target.value })}
//             >
//               <option value="Pending">Pending</option>
//               <option value="Paid">Paid</option>
//             </select>

//             <label>Amount (₹)</label>
//             <input
//               type="number"
//               placeholder="Enter Amount"
//               value={form.amount}
//               onChange={(e) =>
//                 setForm({ ...form, amount: e.target.value ? e.target.value : 0 })
//               }
//             />

//             <label>Upload Report (PDF/JPG/PNG)</label>
//             <input
//               type="file"
//               accept=".pdf,.jpg,.jpeg,.png"
//               onChange={(e) => setReport(e.target.files[0])}
//             />

//             <label>Upload Bill (PDF/JPG/PNG)</label>
//             <input
//               type="file"
//               accept=".pdf,.jpg,.jpeg,.png"
//               onChange={(e) => setBill(e.target.files[0])}
//             />
//           </div>
//         </div>

//         <div className="button-container">
//           <button className="submit-btn" type="submit">
//             ➕ Add Patient
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/FormPage.css";

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function AddPatient() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patient_id: "",
    name: "",
    guardian_name: "",
    contact: "",
    payment_status: "Pending",
    amount: "",
  });
  const [report, setReport] = useState(null);
  const [bill, setBill] = useState(null);
  const nav = useNavigate();

  // Load patients when page opens
  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    const res = await fetch("http://localhost:4000/api/patients", {
      headers: { ...authHeader() },
    });
    if (res.status === 401) {
      localStorage.removeItem("token");
      nav("/login");
      return;
    }
    const data = await res.json();
    if (res.ok) setPatients(data);
  }

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new patient
  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value || ""));
    if (report) fd.append("report", report);
    if (bill) fd.append("bill", bill);

    const res = await fetch("http://localhost:4000/api/patients", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: fd,
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Patient added successfully!");
      setForm({
        patient_id: "",
        name: "",
        guardian_name: "",
        contact: "",
        payment_status: "Pending",
        amount: "",
      });
      setReport(null);
      setBill(null);
      loadPatients();
    } else {
      alert(data.error || "Error adding patient");
    }
  }

  return (
    <>
      {/* 🌐 Navigation Bar */}
      <header className="topbar" style={{ background: "#0077b6", color: "white", padding: "14px 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1100px", margin: "auto", padding: "0 20px" }}>
          <h2 style={{ margin: 0 }}>🏥 MediTrack</h2>
          <nav>
            <Link to="/" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>Home</Link>
            <Link to="/add-patient" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>Add Patient</Link>
            <Link to="/stats" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>Stats</Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                nav("/login");
              }}
              style={{
                background: "white",
                color: "#0077b6",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* 🧾 Add Patient Form */}
      <div className="form-page" style={{ marginTop: "40px" }}>
        <h2 className="form-title">➕ Add New Patient</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Patient ID</label>
          <input
            name="patient_id"
            value={form.patient_id}
            placeholder="Enter Patient ID"
            onChange={handleChange}
            required
          />

          <label>Patient Name</label>
          <input
            name="name"
            value={form.name}
            placeholder="Enter Full Name"
            onChange={handleChange}
            required
          />

          <label>Guardian Name</label>
          <input
            name="guardian_name"
            value={form.guardian_name}
            placeholder="Enter Guardian Name"
            onChange={handleChange}
          />

          <label>Contact</label>
          <input
            name="contact"
            value={form.contact}
            placeholder="Enter Contact Number"
            onChange={handleChange}
          />

          <label>Amount</label>
          <input
            name="amount"
            type="number"
            placeholder="Enter Payment Amount"
            value={form.amount}
            onChange={handleChange}
          />

          <label>Payment Status</label>
          <select
            name="payment_status"
            value={form.payment_status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>

          <label>Upload Report (PDF, JPG, PNG)</label>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setReport(e.target.files[0])} />

          <label>Upload Bill (PDF, JPG, PNG)</label>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setBill(e.target.files[0])} />

          <div className="form-actions">
            <button className="primary-btn" type="submit">Add Patient</button>
          </div>
        </form>
      </div>

      {/* 📋 Patient List */}
      <div className="form-page" style={{ marginTop: "30px" }}>
        <h2 className="form-title">📋 Patient Records</h2>
        {patients.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No patients added yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0077b6", color: "white" }}>
                <th style={{ padding: "10px" }}>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Payment</th>
                <th>Files</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.patient_id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{p.patient_id}</td>
                  <td>{p.name}</td>
                  <td>{p.contact}</td>
                  <td>
                    {p.payment_status} {p.amount ? `₹${p.amount}` : ""}
                  </td>
                  <td>
                    {p.report_file && (
                      <a
                        href={`http://localhost:4000/${p.report_file}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#0077b6", marginRight: "8px" }}
                      >
                        Report
                      </a>
                    )}
                    {p.bill_file && (
                      <a
                        href={`http://localhost:4000/${p.bill_file}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#0096c7" }}
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
    </>
  );
}

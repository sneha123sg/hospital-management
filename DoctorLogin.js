// import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";

// export default function DoctorLogin(){
//   const [form, setForm] = useState({ doctor_name:"", specialization:"", hospital_name:"" });
//   const nav = useNavigate();

//   async function submit(e){
//     e.preventDefault();
//     const res = await fetch("http://localhost:4000/api/doctor/login", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
//     const data = await res.json();
//     if(res.ok){ localStorage.setItem("doctor_token", data.token); localStorage.setItem("doctor_name", form.doctor_name); localStorage.setItem("specialization", form.specialization); nav("/doctor/view"); }
//     else alert(data.error || "Error");
//   }

//   return (
//     <div className="card" style={{maxWidth:520, margin:"20px auto"}}>
//       <h2>Doctor Login</h2>
//       <form onSubmit={submit}>
//         <label>Doctor name</label>
//         <input required value={form.doctor_name} onChange={e=>setForm({...form, doctor_name:e.target.value})} />
//         <label>Specialization</label>
//         <input value={form.specialization} onChange={e=>setForm({...form, specialization:e.target.value})} />
//         <label>Hospital name</label>
//         <input required value={form.hospital_name} onChange={e=>setForm({...form, hospital_name:e.target.value})} />
//         <div style={{marginTop:12}}>
//           <button className="button" type="submit">Login as Doctor</button>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormPage.css";

export default function DoctorLogin() {
  const [form, setForm] = useState({
    doctor_name: "",
    specialization: "",
    hospital_name: "",
  });
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/doctor/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("doctor_token", data.token);
      nav("/doctor/view");
    } else {
      alert(data.error || "Login failed");
    }
  }

  return (
    <div className="form-page">
      <h2 className="form-title">🩺 Doctor Login</h2>
      <form onSubmit={submit}>
        <label>Doctor Name</label>
        <input
          required
          placeholder="Enter your name"
          onChange={(e) => setForm({ ...form, doctor_name: e.target.value })}
        />

        <label>Specialization</label>
        <input
          required
          placeholder="e.g. Cardiologist"
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
        />

        <label>Hospital Name</label>
        <input
          required
          placeholder="Enter your hospital name"
          onChange={(e) => setForm({ ...form, hospital_name: e.target.value })}
        />

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            Login ➜ View Patients
          </button>
        </div>
      </form>
    </div>
  );
}

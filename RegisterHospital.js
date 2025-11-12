// import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";

// export default function RegisterHospital(){
//   const [form, setForm] = useState({ hospital_name:"", username:"", password:"" });
//   const nav = useNavigate();

//   function next() {
//     if(!form.hospital_name || !form.username || !form.password){ alert("Fill all fields"); return; }
//     localStorage.setItem("hospitalReg", JSON.stringify(form));
//     nav("/register/receptionist");
//   }

//   return (
//     <div className="card" style={{maxWidth:640, margin:"20px auto"}}>
//       <h2>Step 1 — Hospital Details</h2>
//       <label>Hospital Name</label>
//       <input value={form.hospital_name} onChange={e=>setForm({...form, hospital_name:e.target.value})} />
//       <label>Username</label>
//       <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
//       <label>Password</label>
//       <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
//       <div style={{marginTop:12}}>
//         <button className="button" onClick={next}>Next ➜</button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormPage.css";

export default function RegisterHospital() {
  const [form, setForm] = useState({
    hospital_name: "",
    username: "",
    password: "",
  });
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("hospitalReg", JSON.stringify(form));
    nav("/register/receptionist");
  }

  return (
    <div className="form-page">
      <h2 className="form-title">🏥 Register Your Hospital</h2>
      <form onSubmit={handleSubmit}>
        <label>Hospital Name</label>
        <input
          required
          placeholder="Enter hospital name"
          onChange={(e) => setForm({ ...form, hospital_name: e.target.value })}
        />

        <label>Username</label>
        <input
          required
          placeholder="Choose a username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <label>Password</label>
        <input
          required
          type="password"
          placeholder="Enter a strong password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            Next ➜ Receptionist Info
          </button>
        </div>
      </form>
    </div>
  );
}

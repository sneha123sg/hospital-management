import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterReceptionist(){
  const [form, setForm] = useState({ receptionist_name:"", shift_timings:"Morning", receptionist_contact:"" });
  const nav = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const hospitalData = JSON.parse(localStorage.getItem("hospitalReg"));
    if(!hospitalData){ alert("Start at hospital registration"); nav("/register"); return; }

    // Merge and hit server's /api/register
    const body = {...hospitalData, receptionist_name: form.receptionist_name, receptionist_contact: form.receptionist_contact, shift_timings: form.shift_timings};
    const res = await fetch("http://localhost:4000/api/register", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
    const data = await res.json();
    if(res.ok){
      alert("Registered successfully. Please login.");
      localStorage.removeItem("hospitalReg");
      nav("/login");
    } else alert(data.error || "Server error");
  }

  return (
    <div className="card" style={{maxWidth:640, margin:"20px auto"}}>
      <h2>Step 2 — Receptionist Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Receptionist Name</label>
        <input required onChange={e=>setForm({...form, receptionist_name:e.target.value})} />
        <label>Shift Timings</label>
        <select required onChange={e=>setForm({...form, shift_timings:e.target.value})} value={form.shift_timings}>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
        </select>
        <label>Contact</label>
        <input required onChange={e=>setForm({...form, receptionist_contact:e.target.value})} />
        <div style={{marginTop:12}}>
          <button className="button" type="submit">Finish & Go to Login</button>
        </div>
      </form>
    </div>
  );
}

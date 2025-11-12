import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [form, setForm] = useState({});
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    const res = await fetch('http://localhost:4000/api/register', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      alert('Registered! Please login via Receptionist Login');
      // nav('/login');
      nav('');
    } else {
      alert(data.error || 'Error');
    }
  }

  return (
    <div className="card" style={{maxWidth:800}}>
      <h2>Register Hospital & Receptionist</h2>
      <form onSubmit={submit} className="grid">
        <div>
          <label>Hospital name</label>
          <input className="input" required onChange={e=>setForm({...form, hospital_name:e.target.value})}/>
          <label>Username</label>
          <input className="input" required onChange={e=>setForm({...form, username:e.target.value})}/>
          <label>Password</label>
          <input className="input" type="password" required onChange={e=>setForm({...form, password:e.target.value})}/>
        </div>
        <div>
          <label>Receptionist name</label>
          <input className="input" required onChange={e=>setForm({...form, receptionist_name:e.target.value})}/>
          <label>Receptionist contact</label>
          <input className="input" onChange={e=>setForm({...form, receptionist_contact:e.target.value})}/>
          <div style={{marginTop:12}}>
            <button className="button" type="submit">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}

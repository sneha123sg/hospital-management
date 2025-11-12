// import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login(){
//   const [creds, setCreds] = useState({ username:"", password:"" });
//   const nav = useNavigate();
//   async function handle(e){
//     e.preventDefault();
//     const res = await fetch("http://localhost:4000/api/login", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(creds) });
//     const data = await res.json();
//     if(res.ok){ localStorage.setItem("token", data.token); nav("/dashboard"); }
//     else alert(data.error || "Login failed");
//   }
//   return (
//     <div className="card" style={{maxWidth:480, margin:"20px auto"}}>
//       <h2>Receptionist Login</h2>
//       <form onSubmit={handle}>
//         <label>Username</label>
//         <input value={creds.username} onChange={e=>setCreds({...creds, username:e.target.value})} required />
//         <label>Password</label>
//         <input type="password" value={creds.password} onChange={e=>setCreds({...creds, password:e.target.value})} required />
//         <div style={{marginTop:12}}>
//           <button className="button" type="submit">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormPage.css";

export default function Login() {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      nav("/dashboard");
    } else {
      alert(data.error || "Login failed");
    }
  }

  return (
    <div className="form-page">
      <h2 className="form-title">👩‍💼 Receptionist Login</h2>
      <form onSubmit={submit}>
        <label>Username</label>
        <input
          required
          placeholder="Enter your username"
          onChange={(e) => setCreds({ ...creds, username: e.target.value })}
        />

        <label>Password</label>
        <input
          required
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
        />

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            Login ➜ Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div className="card" style={{display:"flex",gap:20,alignItems:"center"}}>
      <div style={{ width:'50%', margin:'auto'}}>
        <h1 style={{color:"#0066cc", marginBottom:6}}>MediTrack — Modern Receptionist Portal</h1>
        <p className="small">Register your hospital, add patients, upload reports & bills, and let doctors securely access patient reports.</p>

        <div style={{marginTop:18, display:"flex", gap:'20px'}}>
          <Link to="/register"><button className="button">Register Hospital</button></Link>
          <Link to="/login"><button className="button" style={{background:"#06d6a0"}}>Receptionist Login</button></Link>
          <Link to="/doctor/login"><button className="button" style={{background:"#118ab2"}}>Doctor Login</button></Link>
          {/* <Link to="/stats"><button className="button ghost">View Stats</button></Link> */}
        </div>
      </div>

      {/* <div style={{width:320}}>
        <img alt="Hospital" src="https://images.unsplash.com/photo-1586773860411-7bcf8b0d2b57?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f7ea32e6b0d3b2c4092a0b23f5b4d82" style={{width:"100%", borderRadius:12}} /> */}
      {/* </div> */}
      {/* <footer style = {{textalign: center,
    padding: '18px',
    color: rgb(102, 102, 102),
    position: fixed,
    bottom: '0px',
    left: '50%'}}>© 2025 MediTrack</footer> */}
    </div>
  );
}

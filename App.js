// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import Home from "./pages/Home";
// import RegisterHospital from "./pages/RegisterHospital";
// import RegisterReceptionist from "./pages/RegisterReceptionist";
// import AddPatient from "./pages/AddPatient";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import DoctorLogin from "./pages/DoctorLogin";
// import DoctorView from "./pages/DoctorView";
// import Stats from "./pages/Stats";
// import HospitalInfo from "./pages/HospitalInfo";
// import Contact from "./pages/Contact";
// import './App.css';
// import Stats from "./Stats";
// import Navbar from "./Navbar";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RegisterHospital from "./pages/RegisterHospital";
import RegisterReceptionist from "./pages/RegisterReceptionist";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorView from "./pages/DoctorView";
import Stats from "./pages/Stats";
import Contact from "./pages/Contact";

// export default function App(){
//   return (
//     <Router>
//       <header className="topbar">
//         <div className="brand">🏥 <span>MediTrack</span></div>
//         <nav>
//           <Link to="/">Home</Link>
//           <Link to="/contact">Contact</Link>
//         </nav>
//       </header>

//       <main className="container">
//         <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="/register" element={<RegisterHospital/>} />
//           <Route path="/register/receptionist" element={<RegisterReceptionist/>} />
//           <Route path="/add-patient" element={<AddPatient/>} />
//           <Route path="/login" element={<Login/>} />
//           <Route path="/dashboard" element={<Dashboard/>} />
//           <Route path="/doctor/login" element={<DoctorLogin/>} />
//           <Route path="/doctor/view" element={<DoctorView/>} />
//           <Route path="/stats" element={<Stats/>} />
//           <Route path="/hospital/:id" element={<HospitalInfo/>} />
//           <Route path="/contact" element={<Contact/>} />
//           <Route path="*" element={<div className="card center"><h2>404 — Page not found</h2></div>} />
//         </Routes>
//       </main>

//       <footer style={{textAlign:"center", padding:18, color:"#666"}}>© {new Date().getFullYear()} MediTrack</footer>
//     </Router>
//   );
// }


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🔹 Import all pages


export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="page-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<RegisterHospital />} />
            <Route path="/register-receptionist" element={<RegisterReceptionist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />

            {/* Protected pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctor/view" element={<DoctorView />} />
            <Route path="/stats" element={<Stats />} />

            {/* Default fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
      <footer style={{textAlign:"center", padding:18, color:"#666"}}>© {new Date().getFullYear()} MediTrack</footer>

      {/* 🌈 Global Styling */}
      <style jsx="true">{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: url("https://img.freepik.com/free-vector/abstract-medical-wallpaper-template-design_53876-61802.jpg?t=st=1731426063~exp=1731429663~hmac=7bbf2e9bb52a692fa57a33139ad6a79c5ad42023b522b6d9cf35aabec4cfb93e&w=1380")
            no-repeat center center fixed;
          background-size: cover;
          font-family: "Poppins", sans-serif;
        }

        .page-content {
          flex: 1;
          padding: 30px;
          backdrop-filter: blur(4px);
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Router>
  );
}

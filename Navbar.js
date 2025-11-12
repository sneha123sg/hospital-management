import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="logo">🏥 MediTrack</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="/stats">Stats</Link>}
        <Link to="/contact">Contact</Link>
      </div>

      <style jsx="true">{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(90deg, #0077b6, #00b4d8);
          padding: 15px 30px;
          color: white;
          font-family: "Poppins", sans-serif;
        }
        .logo {
          font-weight: 600;
          font-size: 20px;
        }
        .nav-links a {
          color: white;
          margin-left: 20px;
          text-decoration: none;
          font-weight: 500;
        }
        .nav-links a:hover {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
}

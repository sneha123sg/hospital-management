// // import React, { useEffect, useState } from "react";

// // function auth() { const t = localStorage.getItem("token"); return t ? { Authorization: `Bearer ${t}` } : {}; }

// // export default function Stats(){
// //   const [stats, setStats] = useState(null);
// //   const [detail, setDetail] = useState(null);
// //   const [detailType, setDetailType] = useState(null);

// //   useEffect(()=>{ fetchStats(); }, []);

// //   async function fetchStats(){
// //     try{
// //       const res = await fetch("http://localhost:4000/api/hospital/stats", { headers: { ...auth() } });
// //       const data = await res.json();
// //       if(res.ok) setStats(data); else alert(data.error || "Error");
// //     }catch(e){ console.error(e) }
// //   }

// //   if(!stats) return <div className="card">Loading...</div>;

// //   return (
// //     <div className="card">
// //       <h2>Hospital Stats</h2>
// //       <div style={{display:"flex",gap:14}}>
// //         <div className="stat"><h3>{stats.doctorCount}</h3><p>Doctors</p></div>
// //         <div className="stat"><h3>{stats.patientCount}</h3><p>Patients</p></div>
// //         <div className="stat"><h3>{stats.receptionistCount}</h3><p>Receptionists</p></div>
// //       </div>

// //       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18, marginTop:16}}>
// //         <div>
// //           <h3>Doctors</h3>
// //           <ul className="click-list">
// //             {stats.doctors.map((d,i)=>(
// //               <li key={i} onClick={()=>{ setDetail(d); setDetailType("doctor"); }}>
// //                 <div>{d.name}</div>
// //                 <div className="meta">{d.specialization || "General"}</div>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>

// //         <div>
// //           <h3>Receptionists</h3>
// //           <ul className="click-list">
// //             {stats.receptionists.map((r,i)=>(
// //               <li key={i} onClick={()=>{ setDetail(r); setDetailType("receptionist"); }}>
// //                 <div>{r.name}</div>
// //                 <div className="meta">{r.shift_timings}</div>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>

// //       {detail && (
// //         <div style={{marginTop:18}} className="detail-panel">
// //           <h4>{detail.name}</h4>
// //           {detailType === "doctor" ? (
// //             <>
// //               <p><strong>Specialization:</strong> {detail.specialization || "General"}</p>
// //               <p><strong>Contact:</strong> {detail.contact || "-"}</p>
// //             </>
// //           ) : (
// //             <>
// //               <p><strong>Shift:</strong> {detail.shift_timings}</p>
// //               <p><strong>Contact:</strong> {detail.contact || "-"}</p>
// //             </>
// //           )}
// //           <div style={{marginTop:10}}>
// //             <button className="button ghost" onClick={()=>{ setDetail(null); setDetailType(null); }}>Close</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/FormPage.css"; // reuse global theme

// export default function Stats() {
//   const [stats, setStats] = useState({
//     doctorCount: 0,
//     patientCount: 0,
//     receptionistCount: 0,
//     doctors: [],
//     receptionists: [],
//   });
//   const [openSection, setOpenSection] = useState(null);
//   const nav = useNavigate();

//   useEffect(() => {
//     loadStats();
//   }, []);

//   async function loadStats() {
//     try {
//       const res = await fetch("http://localhost:4000/api/hospital/stats", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       if (res.ok) setStats(data);
//       else if (res.status === 401) {
//         localStorage.removeItem("token");
//         nav("/login");
//       } else alert(data.error || "Error loading stats");
//     } catch (err) {
//       console.error("Error loading stats:", err);
//     }
//   }

//   const toggleSection = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   return (
//     <>
//       {/* 🩺 Navbar */}
//       <header
//         className="topbar"
//         style={{
//           background: "#0077b6",
//           color: "white",
//           padding: "14px 0",
//         }}
//       >
//         <div
//           className="container"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             maxWidth: "1100px",
//             margin: "auto",
//             padding: "0 20px",
//           }}
//         >
//           <h2 style={{ margin: 0 }}>🏥 MediTrack</h2>
//           <nav>
//             <Link
//               to="/add-patient"
//               style={{
//                 color: "white",
//                 marginRight: "20px",
//                 textDecoration: "none",
//               }}
//             >
//               Add Patient
//             </Link>
//             <Link
//               to="/stats"
//               style={{
//                 color: "white",
//                 marginRight: "20px",
//                 textDecoration: "none",
//               }}
//             >
//               Stats
//             </Link>
//             <button
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 nav("/login");
//               }}
//               style={{
//                 background: "white",
//                 color: "#0077b6",
//                 border: "none",
//                 padding: "6px 12px",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 fontWeight: "500",
//               }}
//             >
//               Logout
//             </button>
//           </nav>
//         </div>
//       </header>

//       {/* 📊 Stats Section */}
//       <div className="form-page" style={{ marginTop: "40px" }}>
//         <h2 className="form-title">📊 Hospital Overview</h2>
//         <div className="stats-grid">
//           <div
//             className={`stats-card ${
//               openSection === "doctors" ? "active" : ""
//             }`}
//             onClick={() => toggleSection("doctors")}
//           >
//             <h3>👨‍⚕️ Doctors</h3>
//             <p>{stats.doctorCount}</p>
//             {openSection === "doctors" && (
//               <ul className="details-list">
//                 {stats.doctors.length > 0 ? (
//                   stats.doctors.map((doc, i) => (
//                     <li key={i}>
//                       <strong>{doc.name}</strong>{" "}
//                       <span style={{ color: "#555" }}>
//                         — {doc.specialization || "Not specified"}
//                       </span>
//                     </li>
//                   ))
//                 ) : (
//                   <p className="empty">No doctors found.</p>
//                 )}
//               </ul>
//             )}
//           </div>

//           <div className="stats-card">
//             <h3>🧑‍🤝‍🧑 Patients</h3>
//             <p>{stats.patientCount}</p>
//           </div>

//           <div
//             className={`stats-card ${
//               openSection === "receptionists" ? "active" : ""
//             }`}
//             onClick={() => toggleSection("receptionists")}
//           >
//             <h3>💼 Receptionists</h3>
//             <p>{stats.receptionistCount}</p>
//             {openSection === "receptionists" && (
//               <ul className="details-list">
//                 {stats.receptionists.length > 0 ? (
//                   stats.receptionists.map((r, i) => (
//                     <li key={i}>
//                       <strong>{r.name}</strong>{" "}
//                       <span style={{ color: "#555" }}>
//                         — Shift: {r.shift_timings}
//                       </span>
//                     </li>
//                   ))
//                 ) : (
//                   <p className="empty">No receptionists found.</p>
//                 )}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/hospital/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setStats(data);
      else alert(data.error || "Failed to load stats");
    } catch (err) {
      console.error(err);
      alert("Server error fetching stats");
    }
  }

  if (!stats) return <p>Loading stats...</p>;

  const renderDetails = () => {
    if (selected === "doctor")
      return (
        <div className="details-card">
          <h3>Doctors List</h3>
          {stats.doctors.length === 0 ? (
            <p>No doctors yet</p>
          ) : (
            <ul>
              {stats.doctors.map((d, i) => (
                <li key={i}>
                  <b>{d.name}</b> — {d.specialization || "No specialization"}
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    if (selected === "receptionist")
      return (
        <div className="details-card">
          <h3>Receptionists List</h3>
          {stats.receptionists.length === 0 ? (
            <p>No receptionists yet</p>
          ) : (
            <ul>
              {stats.receptionists.map((r, i) => (
                <li key={i}>
                  <b>{r.name}</b> — {r.shift_timings}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
  };

  return (
    <div className="stats-container">
      <h2>🏥 Hospital Statistics</h2>
      <div className="stats-boxes">
        <div className="box" onClick={() => setSelected("doctor")}>
          <h3>Doctors</h3>
          <p>{stats.doctorCount}</p>
        </div>
        <div className="box" onClick={() => setSelected(null)}>
          <h3>Patients</h3>
          <p>{stats.patientCount}</p>
        </div>
        <div className="box" onClick={() => setSelected("receptionist")}>
          <h3>Receptionists</h3>
          <p>{stats.receptionistCount}</p>
        </div>
      </div>

      {selected && renderDetails()}

      <style jsx="true">{`
        .stats-container {
          padding: 40px;
          max-width: 900px;
          margin: auto;
          font-family: "Poppins", sans-serif;
        }
        h2 {
          color: #0077b6;
          text-align: center;
          margin-bottom: 20px;
        }
        .stats-boxes {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 20px;
        }
        .box {
          flex: 1;
          min-width: 220px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 25px;
          text-align: center;
          cursor: pointer;
          transition: 0.3s;
        }
        .box:hover {
          transform: translateY(-5px);
          background: #caf0f8;
        }
        .box h3 {
          margin-bottom: 10px;
          color: #03045e;
        }
        .box p {
          font-size: 24px;
          font-weight: bold;
          color: #0077b6;
        }
        .details-card {
          margin-top: 30px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .details-card h3 {
          color: #0077b6;
          margin-bottom: 10px;
        }
        ul {
          list-style: none;
          padding-left: 0;
        }
        li {
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
      `}</style>
    </div>
  );
}

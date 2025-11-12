import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

export default function HospitalInfo(){
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(()=>{ if(id) fetchInfo(); }, [id]);

  async function fetchInfo(){
    try{
      const res = await fetch(`/api/hospital/${id}/info`);
      const json = await res.json();
      if(res.ok) setData(json);
      else alert(json.error || "Error");
    }catch(e){ console.error(e) }
  }

  if(!data) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <h2>{data.hospital.hospital_name}</h2>
      <p className="small">Username: {data.hospital.username}</p>

      <h3>Doctors</h3>
      <ul>{data.doctors.map((d,i)=><li key={i}>{d.name} — {d.specialization}</li>)}</ul>

      <h3>Receptionists</h3>
      <ul>{data.receptionists.map((r,i)=><li key={i}>{r.name} — {r.contact}</li>)}</ul>
    </div>
  );
}

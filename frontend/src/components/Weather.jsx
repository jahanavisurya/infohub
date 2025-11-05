import React, {useState} from 'react'
import axios from 'axios'
export default function Weather(){
  const [city,setCity]=useState('Mumbai'), s=setCity
  const [data,setData]=useState(null), [loading,setLoading]=useState(false), [err,setErr]=useState('')
  const fetchWeather = async ()=>{
    setErr(''); setLoading(true); setData(null)
    try{
      const r = await axios.get('http://localhost:5000/api/weather',{params:{city}});
      setData(r.data)
    }catch(e){ setErr(e.response?.data?.error || e.message) }
    setLoading(false)
  }
  return (<div>
    <div style={{display:'flex',gap:8,marginBottom:12}}>
      <input value={city} onChange={e=>s(e.target.value)}/>
      <button onClick={fetchWeather}>Get</button>
    </div>
    {loading && <div>Loading…</div>}
    {err && <div style={{color:'red'}}>{err}</div>}
    {data && <div>
      <strong>{data.city}</strong> — {data.temp}°C — {data.description}
    </div>}
  </div>)
}

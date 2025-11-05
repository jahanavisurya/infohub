import React, {useState} from 'react'
import axios from 'axios'

export default function Converter(){
  const [amount,setAmount]=useState(100), [to,setTo]=useState('USD')
  const [result,setResult]=useState(null), [loading,setLoading]=useState(false), [err,setErr]=useState('')

  const convert = async ()=>{
    setErr(''); setLoading(true); setResult(null)
    try{
      const r = await axios.get('https://infohub-54tf.onrender.com/api/convert', { params:{amount, from:'INR', to} });
      setResult(r.data)
    }catch(e){
      setErr(e.response?.data?.error || e.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:12}}>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)}/>
        <select value={to} onChange={e=>setTo(e.target.value)}>
          <option>USD</option><option>EUR</option>
        </select>
        <button onClick={convert}>Convert</button>
      </div>

      {loading && <div>Loading…</div>}
      {err && <div style={{color:'red'}}>{err}</div>}
      {result && <div>
        {amount} INR → <strong>{result.result}</strong> {to} {result.mocked ? '(mocked)' : ''}
      </div>}
    </div>
  )
}

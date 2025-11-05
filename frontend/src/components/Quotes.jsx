import React, {useState} from 'react'
import axios from 'axios'
export default function Quotes(){
  const [quote,setQuote]=useState(''), [loading,setLoading]=useState(false)
  const getQuote = async ()=>{
    setLoading(true)
    const r = await axios.get('http://localhost:5000/api/quote')
    setQuote(r.data.quote)
    setLoading(false)
  }
  return (<div>
    <button onClick={getQuote}>New Quote</button>
    {loading && <div>Loading…</div>}
    {quote && <blockquote style={{marginTop:12,fontStyle:'italic'}}>{quote}</blockquote>}
  </div>)
}

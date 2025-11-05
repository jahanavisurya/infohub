import React, {useState} from 'react'
import Weather from './components/Weather'
import Converter from './components/Converter'
import Quotes from './components/Quotes'
export default function App(){
  const [tab, setTab] = useState('weather')
  return (
    <div style={{fontFamily:'Arial',maxWidth:800,margin:'24px auto',padding:20}}>
      <h1>InfoHub</h1>
      <div style={{display:'flex',gap:8,marginBottom:16}}>
        <button onClick={()=>setTab('weather')}>Weather</button>
        <button onClick={()=>setTab('convert')}>Converter</button>
        <button onClick={()=>setTab('quotes')}>Quotes</button>
      </div>
      <div style={{padding:16,border:'1px solid #ddd',borderRadius:8}}>
        {tab==='weather' && <Weather/>}
        {tab==='convert' && <Converter/>}
        {tab==='quotes' && <Quotes/>}
      </div>
    </div>
  )
}

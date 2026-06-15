import { useState, useEffect } from 'react';
import { getPackages } from '../api';

const gold='#D4A017',navy='#071B3B',white='#FFFFFF';

const FALLBACK = [
  { _id:1, name:'Golden Triangle India', destination:'India', duration:'7 Days', price:899, category:'domestic', badge:'Bestseller', emoji:'🕌', includes:['Hotel','Meals','Guide','Transport'] },
  { _id:2, name:'Bali Island Escape', destination:'Indonesia', duration:'10 Days', price:1299, category:'international', badge:'Popular', emoji:'🌺', includes:['Resort','Flights','Spa','Excursions'] },
  { _id:3, name:'Swiss Alps Adventure', destination:'Switzerland', duration:'8 Days', price:2499, category:'luxury', badge:'Premium', emoji:'🏔️', includes:['Chalet','Skiing','Meals','Transfers'] },
  { _id:4, name:'Maldives Overwater Bliss', destination:'Maldives', duration:'6 Days', price:3199, category:'luxury', badge:'Exclusive', emoji:'🏝️', includes:['Villa','Diving','All-Inclusive','Spa'] },
  { _id:5, name:'Canadian Rockies Trek', destination:'Canada', duration:'12 Days', price:1899, category:'adventure', badge:'New', emoji:'🦅', includes:['Lodge','Hiking','Transport','Guide'] },
  { _id:6, name:'Family Fun in Dubai', destination:'UAE', duration:'5 Days', price:1599, category:'family', badge:'Family Pick', emoji:'🏙️', includes:['Hotel','Theme Parks','Flights','Meals'] },
];

export default function Packages() {
  const [packages, setPackages] = useState(FALLBACK);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getPackages().then(r => { if (r.data.data?.length) setPackages(r.data.data); }).catch(() => {});
  }, []);

  const filtered = filter === 'all' ? packages : packages.filter(p => p.category === filter);

  return (
    <section style={{ background:navy, color:white, padding:'130px 60px 100px', minHeight:'100vh', fontFamily:"'Jost',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ textAlign:'center', marginBottom:50 }}>
        <span style={{ fontSize:'0.7rem', letterSpacing:5, textTransform:'uppercase', color:gold, fontWeight:600 }}>✦ Handcrafted Itineraries</span>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem', fontWeight:700, marginTop:12 }}>All <span style={{color:gold,fontStyle:'italic'}}>Tour Packages</span></h2>
        <div style={{ width:60, height:2, background:gold, margin:'20px auto 0' }} />
      </div>
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center', marginBottom:50 }}>
        {['all','domestic','international','luxury','adventure','family'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background:filter===f?gold:'transparent', color:filter===f?navy:'rgba(255,255,255,0.6)', border:'1px solid rgba(212,160,23,0.25)', fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', padding:'8px 20px', cursor:'pointer', fontFamily:"'Jost',sans-serif", fontWeight:filter===f?700:400 }}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:28 }}>
        {filtered.map(pkg => (
          <div key={pkg._id} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(212,160,23,0.25)', overflow:'hidden' }}>
            <div style={{ height:220, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'4rem', background:'linear-gradient(135deg,#0d2d5a,#0a2347)' }}>{pkg.emoji || '🌍'}</div>
            <div style={{ padding:24 }}>
              <div style={{ background:gold, color:navy, fontSize:'0.6rem', fontWeight:700, letterSpacing:2, textTransform:'uppercase', padding:'4px 12px', display:'inline-block', marginBottom:12 }}>{pkg.badge || 'Package'}</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', fontWeight:700, marginBottom:8 }}>{pkg.name}</h3>
              <div style={{ display:'flex', gap:16, marginBottom:12, fontSize:'0.75rem', color:'rgba(255,255,255,0.55)' }}>
                <span>📍 {pkg.destination}</span><span>⏱ {pkg.duration}</span>
              </div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem', color:gold, fontWeight:700, marginBottom:12 }}>${pkg.price?.toLocaleString() || pkg.price} <small style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.4)',fontFamily:"'Jost'"}}>/ person</small></div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
                {(pkg.includes||[]).map(i => <span key={i} style={{ background:'rgba(212,160,23,0.1)', border:'1px solid rgba(212,160,23,0.2)', color:gold, fontSize:'0.65rem', padding:'3px 10px' }}>{i}</span>)}
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <button style={{ flex:1, background:gold, color:navy, fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', padding:'10px 16px', border:'none', cursor:'pointer', fontWeight:700, fontFamily:"'Jost',sans-serif" }}>Book Now</button>
                <button style={{ flex:1, background:'transparent', color:white, fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', padding:'10px 16px', border:'1px solid rgba(255,255,255,0.3)', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>Inquire</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

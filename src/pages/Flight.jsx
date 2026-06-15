import { useState } from 'react';
import { submitFlight } from '../api';

const gold='#D4A017',navy='#071B3B',white='#FFFFFF';

export default function Flight() {
  const [tripType, setTripType] = useState('round');
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', phone:'', from:'', to:'', departDate:'', returnDate:'', passengers:'1', cabinClass:'Economy', requirements:'' });

  const inp = { width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)', color:white, fontFamily:"'Jost',sans-serif", fontSize:'0.9rem', padding:'12px 16px', outline:'none', boxSizing:'border-box' };
  const lbl = { fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.5)', display:'block', marginBottom:8, fontWeight:500 };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await submitFlight({ ...form, tripType }); } catch (err) { console.log(err); }
    setLoading(false); setPopup(true);
    setForm({ name:'', email:'', phone:'', from:'', to:'', departDate:'', returnDate:'', passengers:'1', cabinClass:'Economy', requirements:'' });
  };

  return (
    <section style={{ background:navy, color:white, padding:'130px 60px 100px', minHeight:'100vh', fontFamily:"'Jost',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ textAlign:'center', marginBottom:50 }}>
        <span style={{ fontSize:'0.7rem', letterSpacing:5, textTransform:'uppercase', color:gold, fontWeight:600 }}>✦ Expert Assistance</span>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem', fontWeight:700, marginTop:12 }}>Flight <span style={{color:gold,fontStyle:'italic'}}>Booking Assistance</span></h2>
        <div style={{ width:60, height:2, background:gold, margin:'20px auto 0' }} />
        <p style={{ marginTop:20, color:'rgba(255,255,255,0.5)', maxWidth:500, margin:'20px auto 0' }}>Let our experts find the best flights for your journey.</p>
      </div>
      <div style={{ maxWidth:800, margin:'0 auto', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(212,160,23,0.25)', padding:40 }}>
        <div style={{ display:'flex', marginBottom:30, border:'1px solid rgba(212,160,23,0.25)', overflow:'hidden', width:'fit-content' }}>
          {['one-way','round','multi-city'].map(t => (
            <button key={t} onClick={() => setTripType(t)} style={{ background:tripType===t?gold:'transparent', color:tripType===t?navy:'rgba(255,255,255,0.6)', fontSize:'0.75rem', letterSpacing:2, textTransform:'uppercase', padding:'10px 24px', border:'none', cursor:'pointer', fontFamily:"'Jost',sans-serif", fontWeight:tripType===t?700:400 }}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginBottom:16 }}>
            <div><label style={lbl}>From *</label><input style={inp} required value={form.from} onChange={e=>setForm({...form,from:e.target.value})} placeholder="Edmonton, AB"/></div>
            <div><label style={lbl}>To *</label><input style={inp} required value={form.to} onChange={e=>setForm({...form,to:e.target.value})} placeholder="Dubai, UAE"/></div>
            <div><label style={lbl}>Depart *</label><input style={{...inp,colorScheme:'dark'}} type="date" required value={form.departDate} onChange={e=>setForm({...form,departDate:e.target.value})}/></div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginBottom:16 }}>
            {tripType==='round' && <div><label style={lbl}>Return</label><input style={{...inp,colorScheme:'dark'}} type="date" value={form.returnDate} onChange={e=>setForm({...form,returnDate:e.target.value})}/></div>}
            <div><label style={lbl}>Passengers</label>
              <select style={inp} value={form.passengers} onChange={e=>setForm({...form,passengers:e.target.value})}>
                {[1,2,3,4,5,'6+'].map(n=><option key={n}>{n}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Cabin Class</label>
              <select style={inp} value={form.cabinClass} onChange={e=>setForm({...form,cabinClass:e.target.value})}>
                {['Economy','Business','First Class'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
            <div><label style={lbl}>Full Name *</label><input style={inp} required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></div>
            <div><label style={lbl}>Email *</label><input style={inp} type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="email@example.com"/></div>
          </div>
          <div style={{ marginBottom:16 }}><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+1 (000) 000-0000"/></div>
          <div style={{ marginBottom:16 }}><label style={lbl}>Special Requirements</label><textarea style={{...inp,minHeight:80,resize:'vertical'}} value={form.requirements} onChange={e=>setForm({...form,requirements:e.target.value})} placeholder="Dietary needs, accessibility, etc..."/></div>
          <button type="submit" disabled={loading} style={{ width:'100%', background:gold, color:navy, fontWeight:700, fontSize:'0.8rem', letterSpacing:3, textTransform:'uppercase', padding:16, border:'none', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>
            {loading ? 'Submitting...' : 'Submit Flight Inquiry ✈'}
          </button>
        </form>
      </div>
      {popup && (
        <div onClick={() => setPopup(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:'#0a2347', border:'1px solid #D4A017', padding:'50px 40px', textAlign:'center', maxWidth:400 }}>
            <div style={{ fontSize:'3rem', marginBottom:16 }}>✅</div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem', color:gold, marginBottom:10 }}>Inquiry Sent!</h3>
            <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.6)', lineHeight:1.7, marginBottom:28 }}>We'll find the best flights and contact you within 24 hours.</p>
            <button onClick={() => setPopup(false)} style={{ background:gold, color:navy, fontWeight:700, fontSize:'0.75rem', letterSpacing:2, textTransform:'uppercase', padding:'12px 32px', border:'none', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

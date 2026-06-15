import { useState } from 'react';
import { submitInquiry } from '../api';

const gold='#D4A017',navy='#071B3B',white='#FFFFFF';

export default function Contact() {
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name:'', phone:'', email:'', destination:'', travelDate:'', travelers:'', message:'' });

  const inp = { width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)', color:white, fontFamily:"'Jost',sans-serif", fontSize:'0.9rem', padding:'12px 16px', outline:'none', boxSizing:'border-box' };
  const lbl = { fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.5)', display:'block', marginBottom:8, fontWeight:500 };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await submitInquiry({ ...form, type: 'general' }); } catch (err) { console.log(err); }
    setLoading(false); setPopup(true);
    setForm({ name:'', phone:'', email:'', destination:'', travelDate:'', travelers:'', message:'' });
  };

  return (
    <section style={{ background:navy, color:white, padding:'130px 60px 100px', minHeight:'100vh', fontFamily:"'Jost',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ textAlign:'center', marginBottom:60 }}>
        <span style={{ fontSize:'0.7rem', letterSpacing:5, textTransform:'uppercase', color:gold, fontWeight:600 }}>✦ Get In Touch</span>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem', fontWeight:700, marginTop:12 }}>Contact <span style={{color:gold,fontStyle:'italic'}}>Skylark</span></h2>
        <div style={{ width:60, height:2, background:gold, margin:'20px auto 0' }} />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start' }}>
        <div>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', fontWeight:700, marginBottom:20 }}>Let's Plan Your <span style={{color:gold,fontStyle:'italic'}}>Perfect Trip</span></h3>
          <p style={{ color:'rgba(255,255,255,0.55)', lineHeight:1.8, marginBottom:30 }}>Our expert team is ready to craft your ideal travel experience.</p>
          {[['📞','Phone','+1 (587) 774-2020\n+1 (825) 419-1125'],['✉️','Email','manik@travelskylark.com'],['📍','Address','9252 34 Ave NW #202\nEdmonton, AB T6N 1C9'],['🕐','Hours','Mon–Fri: 9AM–6PM\nSat: 10AM–4PM | Sun: Closed']].map(([icon,label,val]) => (
            <div key={label} style={{ display:'flex', gap:14, marginBottom:20 }}>
              <span style={{ color:gold, fontSize:'1.2rem', marginTop:2 }}>{icon}</span>
              <div><strong style={{ display:'block', fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginBottom:4 }}>{label}</strong><span style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.7)', whiteSpace:'pre-line' }}>{val}</span></div>
            </div>
          ))}
          <div style={{ marginTop:28, display:'flex', gap:12 }}>
            <a href="tel:+15877742020" style={{ background:gold, color:navy, fontWeight:700, fontSize:'0.75rem', letterSpacing:2, textTransform:'uppercase', padding:'12px 24px', textDecoration:'none', fontFamily:"'Jost',sans-serif", display:'inline-block' }}>📞 Call Now</a>
            <a href="https://wa.me/15877742020" target="_blank" rel="noreferrer" style={{ background:'transparent', color:white, fontSize:'0.75rem', letterSpacing:2, textTransform:'uppercase', padding:'11px 24px', border:'1px solid rgba(255,255,255,0.4)', textDecoration:'none', fontFamily:"'Jost',sans-serif", display:'inline-block' }}>💬 WhatsApp</a>
          </div>
          <div style={{ marginTop:28, background:'#0a2347', border:'1px solid rgba(212,160,23,0.25)', height:200, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, color:'rgba(255,255,255,0.4)', fontSize:'0.85rem' }}>
            <span style={{ fontSize:'2rem' }}>📍</span>
            <span>9252 34 Ave NW #202, Edmonton, AB</span>
            <span style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.25)' }}>Google Maps Integration</span>
          </div>
        </div>
        <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(212,160,23,0.25)', padding:40 }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
              <div><label style={lbl}>Full Name *</label><input style={inp} required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Smith"/></div>
              <div><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+1 (000) 000-0000"/></div>
            </div>
            <div style={{ marginBottom:16 }}><label style={lbl}>Email *</label><input style={inp} type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="john@email.com"/></div>
            <div style={{ marginBottom:16 }}><label style={lbl}>Destination</label><input style={inp} value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} placeholder="e.g. Bali, Switzerland"/></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
              <div><label style={lbl}>Travel Date</label><input style={{...inp,colorScheme:'dark'}} type="date" value={form.travelDate} onChange={e=>setForm({...form,travelDate:e.target.value})}/></div>
              <div><label style={lbl}>Travelers</label>
                <select style={inp} value={form.travelers} onChange={e=>setForm({...form,travelers:e.target.value})}>
                  <option value="">Select</option>{[1,2,3,4,5,'6+'].map(n=><option key={n}>{n}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom:16 }}><label style={lbl}>Message</label><textarea style={{...inp,minHeight:120,resize:'vertical'}} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your dream trip..."/></div>
            <button type="submit" disabled={loading} style={{ width:'100%', background:gold, color:navy, fontWeight:700, fontSize:'0.8rem', letterSpacing:3, textTransform:'uppercase', padding:16, border:'none', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>
              {loading ? 'Sending...' : 'Send Message ✈'}
            </button>
          </form>
        </div>
      </div>
      {popup && (
        <div onClick={() => setPopup(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:'#0a2347', border:'1px solid #D4A017', padding:'50px 40px', textAlign:'center', maxWidth:400 }}>
            <div style={{ fontSize:'3rem', marginBottom:16 }}>✅</div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem', color:gold, marginBottom:10 }}>Message Sent!</h3>
            <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.6)', lineHeight:1.7, marginBottom:28 }}>Thank you! Our team will contact you within 24 hours.</p>
            <button onClick={() => setPopup(false)} style={{ background:gold, color:navy, fontWeight:700, fontSize:'0.75rem', letterSpacing:2, textTransform:'uppercase', padding:'12px 32px', border:'none', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

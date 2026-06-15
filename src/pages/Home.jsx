import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitInquiry, subscribe, getPackages, getTestimonials, getFAQs } from '../api';

const gold = '#D4A017', navy = '#071B3B', white = '#FFFFFF';

const FALLBACK_PACKAGES = [
  { _id:1, name:'Golden Triangle India', destination:'India', duration:'7 Days', price:899, category:'domestic', badge:'Bestseller', emoji:'🕌', includes:['Hotel','Meals','Guide','Transport'] },
  { _id:2, name:'Bali Island Escape', destination:'Indonesia', duration:'10 Days', price:1299, category:'international', badge:'Popular', emoji:'🌺', includes:['Resort','Flights','Spa','Excursions'] },
  { _id:3, name:'Swiss Alps Adventure', destination:'Switzerland', duration:'8 Days', price:2499, category:'luxury', badge:'Premium', emoji:'🏔️', includes:['Chalet','Skiing','Meals','Transfers'] },
  { _id:4, name:'Maldives Overwater Bliss', destination:'Maldives', duration:'6 Days', price:3199, category:'luxury', badge:'Exclusive', emoji:'🏝️', includes:['Villa','Diving','All-Inclusive','Spa'] },
  { _id:5, name:'Canadian Rockies Trek', destination:'Canada', duration:'12 Days', price:1899, category:'adventure', badge:'New', emoji:'🦅', includes:['Lodge','Hiking','Transport','Guide'] },
  { _id:6, name:'Family Fun in Dubai', destination:'UAE', duration:'5 Days', price:1599, category:'family', badge:'Family Pick', emoji:'🏙️', includes:['Hotel','Theme Parks','Flights','Meals'] },
];

const FALLBACK_TESTIMONIALS = [
  { _id:1, name:'Priya Sharma', trip:'Bali Package', stars:5, quote:'Skylark made our honeymoon absolutely magical. Every detail was perfect — from the resort to the sunset dinner!', initials:'PS' },
  { _id:2, name:'James Anderson', trip:'Swiss Alps Tour', stars:5, quote:'Professional, responsive and incredibly knowledgeable. Manik personally ensured everything went smoothly.', initials:'JA' },
  { _id:3, name:'Fatima Al-Rashid', trip:'Dubai Family Trip', stars:5, quote:'Travelling with three kids is stressful but Skylark handled everything! Amazing value and service.', initials:'FA' },
];

const FALLBACK_FAQS = [
  { _id:1, question:'How do I book a tour package?', answer:'Fill out our inquiry form or contact us directly. Our team responds within 24 hours with a personalized itinerary.' },
  { _id:2, question:'Do you offer customized travel packages?', answer:'Absolutely! We specialize in fully customized itineraries tailored to your budget, interests, and travel style.' },
  { _id:3, question:'Do you assist with visa applications?', answer:'Yes! We provide comprehensive visa guidance and documentation support for all our international destinations.' },
  { _id:4, question:'Is travel insurance included?', answer:'Travel insurance is highly recommended. We can connect you with our trusted insurance partners to add it to any package.' },
];

function Counter({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let i = 0; const steps = 60;
        const t = setInterval(() => { i++; setVal(Math.round(target * i / steps)); if (i >= steps) clearInterval(t); }, 30);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(212,160,23,0.2)' }}>
      <div onClick={() => setOpen(!open)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', cursor: 'pointer', color: open ? gold : white, fontSize: '0.95rem', fontWeight: 500 }}>
        {item.question || item.q}
        <span style={{ color: gold, fontSize: '1.3rem', flexShrink: 0 }}>{open ? '−' : '+'}</span>
      </div>
      {open && <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.8, paddingBottom: 16 }}>{item.answer || item.a}</p>}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(FALLBACK_PACKAGES);
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [filter, setFilter] = useState('all');
  const [popup, setPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [pkgLoading, setPkgLoading] = useState(true);
  const [form, setForm] = useState({ name:'', phone:'', email:'', destination:'', travelDate:'', travelers:'', message:'' });

  // ── Fetch dynamic data from backend ─────────────────────────────
  useEffect(() => {
    // Fetch packages
    getPackages()
      .then(r => { if (r.data.data?.length > 0) setPackages(r.data.data); })
      .catch(() => {}) // fallback to static if backend unavailable
      .finally(() => setPkgLoading(false));

    // Fetch testimonials
    getTestimonials()
      .then(r => { if (r.data.data?.length > 0) setTestimonials(r.data.data); })
      .catch(() => {});

    // Fetch FAQs
    getFAQs()
      .then(r => { if (r.data.data?.length > 0) setFaqs(r.data.data); })
      .catch(() => {});
  }, []);

  const filtered = filter === 'all' ? packages : packages.filter(p => p.category === filter);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await submitInquiry({ ...form, type: 'general' }); } catch (err) { console.log(err); }
    setLoading(false); setPopup(true);
    setForm({ name:'', phone:'', email:'', destination:'', travelDate:'', travelers:'', message:'' });
  };

  const handleSubscribe = async () => {
    if (!email) return;
    try { await subscribe(email); alert('Subscribed! Welcome to Skylark.'); } catch (err) { alert('Already subscribed or error.'); }
    setEmail('');
  };

  const inp = { width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)', color:white, fontFamily:"'Jost',sans-serif", fontSize:'0.9rem', padding:'12px 16px', outline:'none', boxSizing:'border-box' };
  const lbl = { fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.5)', display:'block', marginBottom:8, fontWeight:500 };

  return (
    <div style={{ background: navy, color: white, fontFamily: "'Jost', sans-serif", minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Jost:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@1,300&display=swap" rel="stylesheet" />

      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg, #020d1e 0%, #071B3B 50%, #0a2f5a 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(212,160,23,0.08) 0%, transparent 70%)' }} />
        {/* Animated plane */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
          <div style={{ position:'absolute', fontSize:'2rem', animation:'flyPlane 14s linear infinite', top:'30%', opacity:0.6 }}>✈</div>
        </div>
        <style>{`@keyframes flyPlane { 0%{left:-5%;opacity:0} 10%{opacity:0.6} 90%{opacity:0.6} 100%{left:110%;opacity:0;transform:translateY(-40px)} }`}</style>
        <div style={{ textAlign:'center', maxWidth:900, padding:'0 24px', position:'relative', zIndex:2 }}>
          <p style={{ fontSize:'0.7rem', letterSpacing:6, textTransform:'uppercase', color:gold, marginBottom:20 }}>✦ Edmonton's Premier Travel Agency ✦</p>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(3rem, 8vw, 6rem)', fontWeight:900, lineHeight:1.05, marginBottom:24 }}>
            Discover the <span style={{ color:gold, fontStyle:'italic' }}>World</span> with Us
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'1.3rem', fontStyle:'italic', color:'rgba(255,255,255,0.7)', marginBottom:50 }}>
            "We Don't Just Plan Trips, We Create Memories."
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => document.getElementById('packages-section').scrollIntoView({behavior:'smooth'})} style={{ background:gold, color:navy, fontWeight:700, fontSize:'0.75rem', letterSpacing:3, textTransform:'uppercase', padding:'16px 36px', border:'none', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>Explore Packages</button>
            <button onClick={() => document.getElementById('inquiry').scrollIntoView({behavior:'smooth'})} style={{ background:'transparent', color:white, fontSize:'0.75rem', letterSpacing:3, textTransform:'uppercase', padding:'15px 36px', border:'1px solid rgba(255,255,255,0.4)', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>Book Consultation</button>
            <button onClick={() => navigate('/contact')} style={{ background:'transparent', color:white, fontSize:'0.75rem', letterSpacing:3, textTransform:'uppercase', padding:'15px 36px', border:'1px solid rgba(255,255,255,0.4)', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>Contact Us</button>
          </div>
        </div>
        <div style={{ position:'absolute', bottom:40, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, color:'rgba(255,255,255,0.4)', fontSize:'0.65rem', letterSpacing:3, textTransform:'uppercase', animation:'bounce 2s infinite' }}>
          <div style={{ width:1, height:40, background:'linear-gradient(to bottom, transparent, #D4A017)' }} />
          <span>Scroll</span>
        </div>
        <style>{`@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}`}</style>
      </section>

      {/* ── COUNTERS ── */}
      <div style={{ background:gold, padding:'40px 60px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
        {[{t:500,s:'+',l:'Happy Travelers'},{t:100,s:'+',l:'Destinations'},{t:1200,s:'+',l:'Successful Trips'},{t:8,s:'+',l:'Years of Experience'}].map((c,i) => (
          <div key={c.l} style={{ textAlign:'center', borderRight: i<3 ? '1px solid rgba(7,27,59,0.2)' : 'none' }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem', fontWeight:900, color:navy, lineHeight:1 }}><Counter target={c.t} suffix={c.s}/></div>
            <div style={{ fontSize:'0.7rem', letterSpacing:3, textTransform:'uppercase', color:'rgba(7,27,59,0.7)', marginTop:6, fontWeight:600 }}>{c.l}</div>
          </div>
        ))}
      </div>

      {/* ── PACKAGES (DYNAMIC) ── */}
      <section style={{ padding:'100px 60px' }} id="packages-section">
        <div style={{ textAlign:'center', marginBottom:50 }}>
          <span style={{ fontSize:'0.7rem', letterSpacing:5, textTransform:'uppercase', color:gold, fontWeight:600 }}>✦ Curated Journeys</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem', fontWeight:700, marginTop:12 }}>
            Featured <span style={{color:gold,fontStyle:'italic'}}>Tour Packages</span>
          </h2>
          <div style={{ width:60, height:2, background:gold, margin:'20px auto 0' }} />
          <p style={{ marginTop:14, fontSize:'0.8rem', color:'rgba(255,255,255,0.3)', letterSpacing:1 }}>
            {pkgLoading ? '⏳ Loading packages...' : `${packages.length} packages available`}
          </p>
        </div>

        {/* FILTER BAR */}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center', marginBottom:50 }}>
          {['all','domestic','international','luxury','adventure','family','budget'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background:filter===f?gold:'transparent', color:filter===f?navy:'rgba(255,255,255,0.6)', border:'1px solid rgba(212,160,23,0.25)', fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', padding:'8px 20px', cursor:'pointer', fontFamily:"'Jost',sans-serif", fontWeight:filter===f?700:400, transition:'all 0.3s' }}>
              {f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>

        {/* PACKAGES GRID */}
        {pkgLoading ? (
          <div style={{ textAlign:'center', padding:60, color:'rgba(255,255,255,0.3)', fontSize:'1.5rem' }}>⏳ Loading packages...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:60, color:'rgba(255,255,255,0.3)' }}>
            No packages found in this category.
            <br/><span style={{ fontSize:'0.8rem', marginTop:10, display:'block' }}>Add packages from the <span onClick={() => navigate('/admin')} style={{ color:gold, cursor:'pointer' }}>Admin Panel</span></span>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:28 }}>
            {filtered.map(pkg => (
              <div key={pkg._id} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(212,160,23,0.25)', overflow:'hidden', transition:'all 0.4s', cursor:'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-8px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
                {/* Package Image or Emoji */}
                {pkg.image ? (
                  <img src={`http://localhost:5000${pkg.image}`} alt={pkg.name} style={{ width:'100%', height:220, objectFit:'cover', display:'block' }} />
                ) : (
                  <div style={{ height:220, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'4rem', background:'linear-gradient(135deg,#0d2d5a,#0a2347)' }}>{pkg.emoji || '🌍'}</div>
                )}
                <div style={{ padding:24 }}>
                  <div style={{ background:gold, color:navy, fontSize:'0.6rem', fontWeight:700, letterSpacing:2, textTransform:'uppercase', padding:'4px 12px', display:'inline-block', marginBottom:12 }}>{pkg.badge || 'Package'}</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', fontWeight:700, marginBottom:8 }}>{pkg.name}</h3>
                  <div style={{ display:'flex', gap:16, marginBottom:12, fontSize:'0.75rem', color:'rgba(255,255,255,0.55)' }}>
                    <span>📍 {pkg.destination}</span>
                    <span>⏱ {pkg.duration}</span>
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem', color:gold, fontWeight:700, marginBottom:12 }}>
                    ${Number(pkg.price).toLocaleString()} <small style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.4)',fontFamily:"'Jost'",fontWeight:400}}>/ person</small>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
                    {(pkg.includes||[]).map(inc => <span key={inc} style={{ background:'rgba(212,160,23,0.1)', border:'1px solid rgba(212,160,23,0.2)', color:gold, fontSize:'0.65rem', padding:'3px 10px' }}>{inc}</span>)}
                  </div>
                  {pkg.description && <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.45)', lineHeight:1.6, marginBottom:16 }}>{pkg.description}</p>}
                  <div style={{ display:'flex', gap:10 }}>
                    <button onClick={() => document.getElementById('inquiry').scrollIntoView({behavior:'smooth'})} style={{ flex:1, background:gold, color:navy, fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', padding:'10px 16px', border:'none', cursor:'pointer', fontWeight:700, fontFamily:"'Jost',sans-serif" }}>Book Now</button>
                    <button onClick={() => document.getElementById('inquiry').scrollIntoView({behavior:'smooth'})} style={{ flex:1, background:'transparent', color:white, fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', padding:'10px 16px', border:'1px solid rgba(255,255,255,0.3)', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>Inquire</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign:'center', marginTop:40 }}>
          <button onClick={() => navigate('/packages')} style={{ background:'transparent', color:gold, border:'1px solid rgba(212,160,23,0.4)', fontSize:'0.75rem', letterSpacing:3, textTransform:'uppercase', padding:'12px 36px', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>
            View All Packages →
          </button>
        </div>
      </section>

      {/* ── TESTIMONIALS (DYNAMIC) ── */}
      <section style={{ padding:'100px 60px', background:'#0a2347' }}>
        <div style={{ textAlign:'center', marginBottom:50 }}>
          <span style={{ fontSize:'0.7rem', letterSpacing:5, textTransform:'uppercase', color:gold, fontWeight:600 }}>✦ Traveler Stories</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem', fontWeight:700, marginTop:12 }}>What Our <span style={{color:gold,fontStyle:'italic'}}>Clients Say</span></h2>
          <div style={{ width:60, height:2, background:gold, margin:'20px auto 0' }} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:24 }}>
          {testimonials.map(t => (
            <div key={t._id} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(212,160,23,0.25)', padding:32 }}>
              <div style={{ color:gold, fontSize:'1rem', letterSpacing:3, marginBottom:16 }}>{'★'.repeat(t.stars||5)}</div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', fontStyle:'italic', color:'rgba(255,255,255,0.8)', lineHeight:1.7, marginBottom:24 }}>"{t.quote}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:44, height:44, borderRadius:'50%', background:gold, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:navy, flexShrink:0 }}>{t.initials||t.name?.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight:600, fontSize:'0.9rem' }}>{t.name}</div>
                  <div style={{ fontSize:'0.72rem', color:gold }}>{t.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section style={{ padding:'100px 60px' }} id="inquiry">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start' }}>
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem', fontWeight:700, marginBottom:20 }}>Start Your <span style={{color:gold,fontStyle:'italic'}}>Dream Journey</span></h2>
            <p style={{ color:'rgba(255,255,255,0.55)', lineHeight:1.8, marginBottom:30 }}>Fill in the form and our expert travel consultants will contact you within 24 hours.</p>
            {[['📞','Phone','+1 (587) 774-2020\n+1 (825) 419-1125'],['✉️','Email','manik@travelskylark.com'],['📍','Office','9252 34 Ave NW #202\nEdmonton, AB T6N 1C9'],['🕐','Hours','Mon–Fri: 9AM–6PM | Sat: 10AM–4PM']].map(([icon,label,val]) => (
              <div key={label} style={{ display:'flex', gap:14, marginBottom:18 }}>
                <span style={{ color:gold, fontSize:'1.2rem', marginTop:2 }}>{icon}</span>
                <div><strong style={{ display:'block', fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginBottom:4 }}>{label}</strong><span style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.7)', whiteSpace:'pre-line' }}>{val}</span></div>
              </div>
            ))}
          </div>
          <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(212,160,23,0.25)', padding:40 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
                <div><label style={lbl}>Full Name *</label><input style={inp} required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Smith"/></div>
                <div><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+1 (000) 000-0000"/></div>
              </div>
              <div style={{ marginBottom:16 }}><label style={lbl}>Email *</label><input style={inp} type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="john@email.com"/></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
                <div><label style={lbl}>Destination</label><input style={inp} value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} placeholder="e.g. Bali, Dubai"/></div>
                <div><label style={lbl}>Travel Date</label><input style={{...inp,colorScheme:'dark'}} type="date" value={form.travelDate} onChange={e=>setForm({...form,travelDate:e.target.value})}/></div>
              </div>
              <div style={{ marginBottom:16 }}><label style={lbl}>Number of Travelers</label>
                <select style={inp} value={form.travelers} onChange={e=>setForm({...form,travelers:e.target.value})}>
                  <option value="">Select</option>{[1,2,3,4,5,'6+'].map(n=><option key={n}>{n}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:16 }}><label style={lbl}>Message</label><textarea style={{...inp,minHeight:100,resize:'vertical'}} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your dream trip..."/></div>
              <button type="submit" disabled={loading} style={{ width:'100%', background:gold, color:navy, fontWeight:700, fontSize:'0.8rem', letterSpacing:3, textTransform:'uppercase', padding:16, border:'none', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>
                {loading ? 'Sending...' : 'Send My Inquiry ✈'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ (DYNAMIC) ── */}
      <section style={{ padding:'100px 60px', background:'#0a2347' }}>
        <div style={{ textAlign:'center', marginBottom:50 }}>
          <span style={{ fontSize:'0.7rem', letterSpacing:5, textTransform:'uppercase', color:gold, fontWeight:600 }}>✦ Common Questions</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem', fontWeight:700, marginTop:12 }}>Frequently Asked <span style={{color:gold,fontStyle:'italic'}}>Questions</span></h2>
          <div style={{ width:60, height:2, background:gold, margin:'20px auto 0' }} />
        </div>
        <div style={{ maxWidth:760, margin:'0 auto' }}>{faqs.map(f => <FAQItem key={f._id} item={f}/>)}</div>
      </section>

      {/* ── NEWSLETTER ── */}
      <div style={{ background:'linear-gradient(135deg,#0d2d5a,#0a2347)', border:'1px solid rgba(212,160,23,0.25)', padding:60, textAlign:'center', margin:'0 60px 80px' }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.2rem', fontWeight:700, marginBottom:12 }}>Get Exclusive Travel Deals</h3>
        <p style={{ color:'rgba(255,255,255,0.5)', marginBottom:30 }}>Subscribe and be the first to receive special offers and travel inspiration.</p>
        <div style={{ display:'flex', maxWidth:480, margin:'0 auto' }}>
          <input value={email} onChange={e=>setEmail(e.target.value)} style={{ flex:1, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(212,160,23,0.25)', borderRight:'none', color:white, fontFamily:"'Jost',sans-serif", fontSize:'0.9rem', padding:'14px 20px', outline:'none' }} placeholder="Enter your email address"/>
          <button onClick={handleSubscribe} style={{ background:gold, color:navy, fontWeight:700, fontSize:'0.75rem', letterSpacing:2, textTransform:'uppercase', padding:'14px 28px', border:'none', cursor:'pointer', fontFamily:"'Jost',sans-serif", whiteSpace:'nowrap' }}>Subscribe</button>
        </div>
      </div>

      {/* SUCCESS POPUP */}
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
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const gold='#D4A017',navy='#071B3B',white='#FFFFFF';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const inp = { width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)', color:white, fontFamily:"'Jost',sans-serif", fontSize:'0.9rem', padding:'12px 16px', outline:'none', boxSizing:'border-box', marginBottom:16 };

  const handle = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:'100vh', background:navy, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Jost',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(212,160,23,0.25)', padding:'50px 44px', width:420, textAlign:'center' }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', color:gold, marginBottom:4 }}>✈ Skylark</div>
        <div style={{ fontSize:'0.6rem', letterSpacing:4, textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:36 }}>Tour & Travels</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', color:white, marginBottom:30 }}>Admin Portal</h2>
        {error && <div style={{ background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', color:'#f87171', fontSize:'0.8rem', padding:10, marginBottom:16 }}>{error}</div>}
        <form onSubmit={handle} style={{ textAlign:'left' }}>
          <label style={{ fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.5)', display:'block', marginBottom:8 }}>Email</label>
          <input style={inp} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="manik@travelskylark.com" required />
          <label style={{ fontSize:'0.7rem', letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.5)', display:'block', marginBottom:8 }}>Password</label>
          <input style={inp} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
          <button type="submit" disabled={loading} style={{ width:'100%', background:gold, color:navy, fontWeight:700, fontSize:'0.8rem', letterSpacing:3, textTransform:'uppercase', padding:16, border:'none', cursor:'pointer', fontFamily:"'Jost',sans-serif", marginTop:8 }}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
        <p style={{ marginTop:16, fontSize:'0.72rem', color:'rgba(255,255,255,0.3)' }}>First time? Run: POST /api/auth/seed</p>
      </div>
    </div>
  );
}

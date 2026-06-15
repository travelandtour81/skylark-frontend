import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = (path) => { navigate(path); setMobileOpen(false); window.scrollTo(0, 0); };

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: scrolled ? '12px 60px' : '18px 60px',
    background: 'rgba(7,27,59,0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(212,160,23,0.25)',
    transition: 'all 0.3s',
    fontFamily: "'Jost', sans-serif",
  };

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Packages', path: '/packages' },
    { label: 'Flights', path: '/flights' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <nav style={navStyle}>
        <div onClick={() => go('/')} style={{ cursor: 'pointer' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#D4A017', letterSpacing: 1 }}>✈ Skylark</div>
          <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: 4, textTransform: 'uppercase' }}>Tour & Travels</div>
        </div>

        <div style={{ display: 'flex', gap: 36, listStyle: 'none' }}>
          {links.map(l => (
            <span key={l.path} onClick={() => go(l.path)} style={{
              color: location.pathname === l.path ? '#D4A017' : 'rgba(255,255,255,0.8)',
              cursor: 'pointer', fontSize: '0.82rem', letterSpacing: 2,
              textTransform: 'uppercase', fontWeight: 500, transition: 'color 0.2s'
            }}>{l.label}</span>
          ))}
          <span onClick={() => go('/admin')} style={{ color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: 2, textTransform: 'uppercase' }}>Admin</span>
        </div>

        <button onClick={() => go('/contact')} style={{
          background: '#D4A017', color: '#071B3B', fontWeight: 700,
          fontSize: '0.75rem', letterSpacing: 2, textTransform: 'uppercase',
          padding: '10px 24px', border: 'none', cursor: 'pointer', fontFamily: "'Jost', sans-serif"
        }}>Book Now</button>
      </nav>
    </>
  );
}

import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ background: '#030e1e', padding: '70px 60px 30px', borderTop: '1px solid rgba(212,160,23,0.25)', fontFamily: "'Jost', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', gap: 60, marginBottom: 60 }}>

        {/* ── Brand ── */}
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#D4A017' }}>✈ Skylark</div>
          <div style={{ fontSize: '0.6rem', letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Tour & Travels</div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.9, marginBottom: 24, maxWidth: 320 }}>
            "We Don't Just Plan Trips, We Create Memories." — Your trusted Edmonton travel partner for unforgettable journeys worldwide.
          </p>
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { icon: '📷', href: '#', label: 'Instagram' },
              { icon: '👥', href: '#', label: 'Facebook' },
              { icon: '💬', href: 'https://wa.me/15877742020', label: 'WhatsApp' },
              { icon: '🎵', href: '#', label: 'TikTok' },
              { icon: '▶️', href: '#', label: 'YouTube' },
              { icon: '💼', href: '#', label: 'LinkedIn' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                style={{ width: 38, height: 38, border: '1px solid rgba(212,160,23,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#D4A017'; e.currentTarget.style.borderColor = '#D4A017'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'; }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* ── Contact ── */}
        <div>
          <div style={{ fontSize: '0.7rem', letterSpacing: 3, textTransform: 'uppercase', color: '#D4A017', fontWeight: 600, marginBottom: 24 }}>Contact Us</div>
          {[
            { icon: '📞', lines: ['+1 (587) 774-2020', '+1 (825) 419-1125'] },
            { icon: '✉️', lines: ['manik@travelskylark.com'] },
            { icon: '📍', lines: ['9252 34 Ave NW #202', 'Edmonton, AB T6N 1C9'] },
            { icon: '🕐', lines: ['Mon–Fri: 9AM – 6PM', 'Sat: 10AM – 4PM | Sun: Closed'] },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
              <span style={{ color: '#D4A017', fontSize: '1rem', marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
              <div>{item.lines.map((line, j) => (
                <div key={j} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{line}</div>
              ))}</div>
            </div>
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div>
          <div style={{ fontSize: '0.7rem', letterSpacing: 3, textTransform: 'uppercase', color: '#D4A017', fontWeight: 600, marginBottom: 24 }}>Newsletter</div>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: 20 }}>
            Subscribe to receive exclusive travel deals and destination guides.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(212,160,23,0.25)', color: '#fff', fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', padding: '12px 16px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
            />
            <button style={{ background: '#D4A017', color: '#071B3B', fontWeight: 700, fontSize: '0.72rem', letterSpacing: 2, textTransform: 'uppercase', padding: '12px', border: 'none', cursor: 'pointer', fontFamily: "'Jost', sans-serif', width: '100%'" }}>
              Subscribe →
            </button>
          </div>
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: '0.7rem', letterSpacing: 3, textTransform: 'uppercase', color: '#D4A017', fontWeight: 600, marginBottom: 16 }}>Pages</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['Home', '/'], ['Packages', '/packages'], ['Flights', '/flights'], ['Contact', '/contact']].map(([label, path]) => (
                <span key={label} onClick={() => { navigate(path); window.scrollTo(0,0); }}
                  style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#D4A017'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >{label}</span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ borderTop: '1px solid rgba(212,160,23,0.15)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
          © 2026 <span style={{ color: '#D4A017' }}>Skylark Tour & Travels</span>. All Rights Reserved.
        </div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
          Built with ♥ for unforgettable journeys
        </div>
      </div>
    </footer>
  );
}

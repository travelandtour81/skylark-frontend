import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { getInquiries, getPackages, getSubscribers, getFlights, createPackage, deletePackage, updateInquiry } from '../../api';

const gold = '#D4A017', navy = '#071B3B', white = '#FFFFFF';

const EMPTY_PKG = { name:'', destination:'', duration:'', price:'', category:'international', badge:'New', emoji:'🌍', includes:'', description:'' };

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [inquiries, setInquiries] = useState([]);
  const [packages, setPackages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [flights, setFlights] = useState([]);
  const [newPkg, setNewPkg] = useState(EMPTY_PKG);
  const [editPkg, setEditPkg] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState('');
  const [addError, setAddError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchAll = () => {
    getInquiries().then(r => setInquiries(r.data.data || [])).catch(() => {});
    getPackages().then(r => setPackages(r.data.data || [])).catch(() => {});
    getSubscribers().then(r => setSubscribers(r.data.data || [])).catch(() => {});
    getFlights().then(r => setFlights(r.data.data || [])).catch(() => {});
  };

  useEffect(() => { fetchAll(); }, []);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const handleAddPackage = async (e) => {
    e.preventDefault();
    setAddLoading(true); setAddError(''); setAddSuccess('');
    try {
      const payload = {
        ...newPkg,
        price: Number(newPkg.price),
        includes: newPkg.includes.split(',').map(s => s.trim()).filter(Boolean),
      };
      await createPackage(payload);
      setAddSuccess('✅ Package added successfully!');
      setNewPkg(EMPTY_PKG);
      setShowAddForm(false);
      getPackages().then(r => setPackages(r.data.data || [])).catch(() => {});
    } catch (err) {
      setAddError('❌ Error: ' + (err.response?.data?.message || err.message));
    }
    setAddLoading(false);
  };

  const handleDeletePackage = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await deletePackage(id);
      setPackages(packages.filter(p => p._id !== id));
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  const handleUpdateInquiry = async (id, status) => {
    try {
      await updateInquiry(id, { status });
      setInquiries(inquiries.map(i => i._id === id ? { ...i, status } : i));
    } catch (err) { console.log(err); }
  };

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'packages', icon: '✈️', label: 'Packages' },
    { id: 'inquiries', icon: '📩', label: 'Inquiries' },
    { id: 'flights', icon: '🛫', label: 'Flight Inquiries' },
    { id: 'newsletter', icon: '📧', label: 'Newsletter' },
  ];

  const s = {
    layout: { display: 'flex', minHeight: '100vh', fontFamily: "'Jost', sans-serif" },
    sidebar: { width: 240, background: '#030e1e', borderRight: '1px solid rgba(212,160,23,0.2)', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'fixed', top: 0, bottom: 0, left: 0 },
    main: { flex: 1, background: navy, overflowY: 'auto', marginLeft: 240 },
    navItem: (active) => ({ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 24px', cursor: 'pointer', color: active ? gold : 'rgba(255,255,255,0.5)', fontSize: '0.82rem', letterSpacing: 1, transition: 'all 0.2s', borderLeft: `3px solid ${active ? gold : 'transparent'}`, background: active ? 'rgba(212,160,23,0.08)' : 'transparent' }),
    card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,160,23,0.15)', marginBottom: 24 },
    cardHeader: { padding: '18px 24px', borderBottom: '1px solid rgba(212,160,23,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    cardTitle: { fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' },
    stat: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,160,23,0.25)', padding: 24 },
    th: { textAlign: 'left', padding: '12px 20px', fontSize: '0.65rem', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', borderBottom: '1px solid rgba(255,255,255,0.06)', fontWeight: 500 },
    td: { padding: '14px 20px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.04)', verticalAlign: 'middle' },
    inp: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: white, fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', padding: '10px 14px', outline: 'none', boxSizing: 'border-box' },
    lbl: { fontSize: '0.65rem', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 6, fontWeight: 500 },
    badge: (color, bg) => ({ background: bg, color, fontSize: '0.62rem', padding: '3px 10px', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', border: `1px solid ${color}30` }),
    btn: (bg, color) => ({ background: bg, color, fontSize: '0.7rem', letterSpacing: 1, textTransform: 'uppercase', padding: '7px 14px', border: 'none', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontWeight: 600, transition: 'all 0.2s' }),
  };

  return (
    <div style={s.layout}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* SIDEBAR */}
      <aside style={s.sidebar}>
        <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(212,160,23,0.2)' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: gold }}>✈ Skylark</div>
          <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: 3, textTransform: 'uppercase' }}>Admin Portal</div>
        </div>
        <nav style={{ flex: 1, padding: '20px 0' }}>
          {navItems.map(n => (
            <div key={n.id} style={s.navItem(tab === n.id)} onClick={() => setTab(n.id)}>
              <span>{n.icon}</span>{n.label}
            </div>
          ))}
        </nav>
        <div style={{ ...s.navItem(false), color: '#f87171' }} onClick={handleLogout}>
          <span>🚪</span> Logout
        </div>
      </aside>

      {/* MAIN */}
      <main style={s.main}>
        {/* TOPBAR */}
        <div style={{ padding: '20px 36px', borderBottom: '1px solid rgba(212,160,23,0.15)', background: 'rgba(3,14,30,0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: white }}>{navItems.find(n => n.id === tab)?.icon} {navItems.find(n => n.id === tab)?.label}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>👤 {admin?.name || 'Manik Mangla'}</div>
        </div>

        <div style={{ padding: 36 }}>

          {/* ═══ DASHBOARD ═══ */}
          {tab === 'dashboard' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 36 }}>
                {[{ icon: '📩', val: inquiries.length, label: 'Total Inquiries', color: gold },
                  { icon: '✈️', val: packages.length, label: 'Active Packages', color: '#818cf8' },
                  { icon: '📧', val: subscribers.length, label: 'Subscribers', color: '#4ade80' },
                  { icon: '🛫', val: flights.length, label: 'Flight Inquiries', color: '#fb923c' }
                ].map(c => (
                  <div key={c.label} style={s.stat}>
                    <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>{c.icon}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: c.color, fontWeight: 700 }}>{c.val}</div>
                    <div style={{ fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{c.label}</div>
                  </div>
                ))}
              </div>
              <div style={s.card}>
                <div style={s.cardHeader}><span style={s.cardTitle}>Recent Inquiries</span></div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr><th style={s.th}>Name</th><th style={s.th}>Email</th><th style={s.th}>Destination</th><th style={s.th}>Status</th></tr></thead>
                  <tbody>{inquiries.slice(0, 5).map(i => (
                    <tr key={i._id}>
                      <td style={s.td}>{i.name}</td>
                      <td style={s.td}>{i.email}</td>
                      <td style={s.td}>{i.destination || '—'}</td>
                      <td style={s.td}><span style={s.badge(gold, 'rgba(212,160,23,0.15)')}>{i.status}</span></td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && <tr><td colSpan={4} style={{ ...s.td, textAlign: 'center', color: 'rgba(255,255,255,0.25)', padding: 30 }}>No inquiries yet</td></tr>}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ═══ PACKAGES ═══ */}
          {tab === 'packages' && (
            <>
              {/* ADD PACKAGE BUTTON */}
              <div style={{ marginBottom: 24 }}>
                <button onClick={() => { setShowAddForm(!showAddForm); setAddSuccess(''); setAddError(''); }} style={{ ...s.btn(gold, navy), padding: '12px 28px', fontSize: '0.8rem' }}>
                  {showAddForm ? '✕ Cancel' : '+ Add New Package'}
                </button>
              </div>

              {/* ADD PACKAGE FORM */}
              {showAddForm && (
                <div style={{ background: 'rgba(212,160,23,0.05)', border: '1px solid rgba(212,160,23,0.3)', padding: 30, marginBottom: 30 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: gold, marginBottom: 24 }}>Add New Package</h3>
                  {addSuccess && <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', padding: 12, marginBottom: 16, fontSize: '0.85rem' }}>{addSuccess}</div>}
                  {addError && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', padding: 12, marginBottom: 16, fontSize: '0.85rem' }}>{addError}</div>}
                  <form onSubmit={handleAddPackage}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div><label style={s.lbl}>Package Name *</label><input style={s.inp} required value={newPkg.name} onChange={e => setNewPkg({ ...newPkg, name: e.target.value })} placeholder="e.g. Paris Romantic Getaway" /></div>
                      <div><label style={s.lbl}>Destination *</label><input style={s.inp} required value={newPkg.destination} onChange={e => setNewPkg({ ...newPkg, destination: e.target.value })} placeholder="e.g. France" /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div><label style={s.lbl}>Duration *</label><input style={s.inp} required value={newPkg.duration} onChange={e => setNewPkg({ ...newPkg, duration: e.target.value })} placeholder="e.g. 7 Days" /></div>
                      <div><label style={s.lbl}>Price (USD) *</label><input style={s.inp} type="number" required value={newPkg.price} onChange={e => setNewPkg({ ...newPkg, price: e.target.value })} placeholder="e.g. 1299" /></div>
                      <div><label style={s.lbl}>Emoji / Icon</label><input style={s.inp} value={newPkg.emoji} onChange={e => setNewPkg({ ...newPkg, emoji: e.target.value })} placeholder="e.g. 🗼" /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={s.lbl}>Category *</label>
                        <select style={s.inp} value={newPkg.category} onChange={e => setNewPkg({ ...newPkg, category: e.target.value })}>
                          {['international', 'domestic', 'luxury', 'budget', 'adventure', 'family'].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                        </select>
                      </div>
                      <div><label style={s.lbl}>Badge Label</label><input style={s.inp} value={newPkg.badge} onChange={e => setNewPkg({ ...newPkg, badge: e.target.value })} placeholder="e.g. Bestseller, New, Popular" /></div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={s.lbl}>Includes (comma separated)</label>
                      <input style={s.inp} value={newPkg.includes} onChange={e => setNewPkg({ ...newPkg, includes: e.target.value })} placeholder="e.g. Hotel, Flights, Meals, Tours" />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label style={s.lbl}>Description</label>
                      <textarea style={{ ...s.inp, minHeight: 80, resize: 'vertical' }} value={newPkg.description} onChange={e => setNewPkg({ ...newPkg, description: e.target.value })} placeholder="Describe the package..." />
                    </div>
                    <button type="submit" disabled={addLoading} style={{ ...s.btn(gold, navy), padding: '12px 32px', fontSize: '0.8rem' }}>
                      {addLoading ? 'Adding...' : '✈ Add Package'}
                    </button>
                  </form>
                </div>
              )}

              {/* PACKAGES TABLE */}
              <div style={s.card}>
                <div style={s.cardHeader}>
                  <span style={s.cardTitle}>All Packages ({packages.length})</span>
                  <button onClick={() => getPackages().then(r => setPackages(r.data.data || []))} style={s.btn('transparent', 'rgba(255,255,255,0.4)')}>↻ Refresh</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={s.th}>Package</th>
                    <th style={s.th}>Destination</th>
                    <th style={s.th}>Duration</th>
                    <th style={s.th}>Price</th>
                    <th style={s.th}>Category</th>
                    <th style={s.th}>Actions</th>
                  </tr></thead>
                  <tbody>
                    {packages.map(pkg => (
                      <tr key={pkg._id}>
                        <td style={s.td}><span style={{ marginRight: 8 }}>{pkg.emoji || '🌍'}</span>{pkg.name}</td>
                        <td style={s.td}>{pkg.destination}</td>
                        <td style={s.td}>{pkg.duration}</td>
                        <td style={{ ...s.td, color: gold, fontWeight: 600 }}>${pkg.price?.toLocaleString()}</td>
                        <td style={s.td}><span style={s.badge('#818cf8', 'rgba(99,102,241,0.15)')}>{pkg.category}</span></td>
                        <td style={s.td}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => handleDeletePackage(pkg._id, pkg.name)} style={{ ...s.btn('transparent', '#f87171'), border: '1px solid rgba(248,113,113,0.3)' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {packages.length === 0 && (
                      <tr><td colSpan={6} style={{ ...s.td, textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.25)' }}>
                        No packages yet. Click <strong style={{ color: gold }}>"+ Add New Package"</strong> above to get started!
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ═══ INQUIRIES ═══ */}
          {tab === 'inquiries' && (
            <div style={s.card}>
              <div style={s.cardHeader}><span style={s.cardTitle}>All Inquiries ({inquiries.length})</span></div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>
                  <th style={s.th}>Name</th><th style={s.th}>Email</th><th style={s.th}>Phone</th>
                  <th style={s.th}>Destination</th><th style={s.th}>Travelers</th>
                  <th style={s.th}>Date</th><th style={s.th}>Status</th><th style={s.th}>Action</th>
                </tr></thead>
                <tbody>
                  {inquiries.map(i => (
                    <tr key={i._id}>
                      <td style={s.td}>{i.name}</td>
                      <td style={s.td}>{i.email}</td>
                      <td style={s.td}>{i.phone || '—'}</td>
                      <td style={s.td}>{i.destination || '—'}</td>
                      <td style={s.td}>{i.travelers || '—'}</td>
                      <td style={s.td}>{new Date(i.createdAt).toLocaleDateString()}</td>
                      <td style={s.td}><span style={s.badge(i.status === 'replied' ? '#4ade80' : gold, i.status === 'replied' ? 'rgba(74,222,128,0.1)' : 'rgba(212,160,23,0.15)')}>{i.status}</span></td>
                      <td style={s.td}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {i.status === 'new' && <button onClick={() => handleUpdateInquiry(i._id, 'replied')} style={{ ...s.btn('rgba(74,222,128,0.15)', '#4ade80'), border: '1px solid rgba(74,222,128,0.3)' }}>✓ Replied</button>}
                          <a href={`mailto:${i.email}`} style={{ ...s.btn(gold, navy), textDecoration: 'none', display: 'inline-block' }}>Reply</a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.25)' }}>No inquiries yet. They will appear here when users submit the contact form.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {/* ═══ FLIGHTS ═══ */}
          {tab === 'flights' && (
            <div style={s.card}>
              <div style={s.cardHeader}><span style={s.cardTitle}>Flight Inquiries ({flights.length})</span></div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>
                  <th style={s.th}>Name</th><th style={s.th}>Email</th><th style={s.th}>From</th>
                  <th style={s.th}>To</th><th style={s.th}>Trip Type</th><th style={s.th}>Depart</th>
                  <th style={s.th}>Passengers</th><th style={s.th}>Status</th>
                </tr></thead>
                <tbody>
                  {flights.map(f => (
                    <tr key={f._id}>
                      <td style={s.td}>{f.name}</td>
                      <td style={s.td}>{f.email}</td>
                      <td style={s.td}>{f.from}</td>
                      <td style={s.td}>{f.to}</td>
                      <td style={s.td}><span style={s.badge('#fb923c', 'rgba(251,146,60,0.1)')}>{f.tripType}</span></td>
                      <td style={s.td}>{f.departDate}</td>
                      <td style={s.td}>{f.passengers}</td>
                      <td style={s.td}><span style={s.badge(gold, 'rgba(212,160,23,0.15)')}>{f.status}</span></td>
                    </tr>
                  ))}
                  {flights.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.25)' }}>No flight inquiries yet.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {/* ═══ NEWSLETTER ═══ */}
          {tab === 'newsletter' && (
            <div style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.cardTitle}>Subscribers ({subscribers.length})</span>
                <button onClick={() => {
                  const csv = 'Email,Date\n' + subscribers.map(s => `${s.email},${new Date(s.subscribedAt).toLocaleDateString()}`).join('\n');
                  const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
                  a.download = 'subscribers.csv'; a.click();
                }} style={{ ...s.btn(gold, navy) }}>⬇ Export CSV</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={s.th}>#</th><th style={s.th}>Email</th><th style={s.th}>Subscribed On</th></tr></thead>
                <tbody>
                  {subscribers.map((sub, i) => (
                    <tr key={sub._id}>
                      <td style={s.td}>{i + 1}</td>
                      <td style={s.td}>{sub.email}</td>
                      <td style={s.td}>{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {subscribers.length === 0 && <tr><td colSpan={3} style={{ ...s.td, textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.25)' }}>No subscribers yet.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
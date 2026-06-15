export default function WhatsApp() {
  return (
    <a
      href="https://wa.me/15877742020"
      target="_blank"
      rel="noreferrer"
      title="Chat on WhatsApp"
      style={{
        position: 'fixed', bottom: 30, right: 30, zIndex: 999,
        width: 58, height: 58, borderRadius: '50%',
        background: '#25D366', display: 'flex', alignItems: 'center',
        justifyContent: 'center', cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(37,211,102,0.4)',
        fontSize: '1.6rem', textDecoration: 'none',
        animation: 'pulse 2s infinite',
      }}
    >
      💬
    </a>
  );
}

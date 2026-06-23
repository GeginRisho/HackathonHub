export default function Home() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center'
    }} className="fade-in">
      <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '48px 32px' }}>
        <span style={{ 
          fontSize: '14px', 
          fontWeight: 700, 
          letterSpacing: '0.1em', 
          color: 'var(--primary)', 
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '16px'
        }}>
          Next-Generation Portal
        </span>
        <h1 style={{ 
          fontSize: '42px', 
          marginBottom: '16px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          fontWeight: 800
        }}>
          🎯 Hackathon Manager
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: 'var(--text-secondary)', 
          lineHeight: '1.6',
          marginBottom: '36px'
        }}>
          The ultimate platform for organizers, participants, and jury members to coordinate, submit projects, and evaluate hackathons.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <a href="/login" className="btn btn-primary" style={{ padding: '14px 32px' }}>
            Login to Dashboard
          </a>
          <a href="/register" className="btn btn-secondary" style={{ padding: '14px 32px' }}>
            Register Now
          </a>
        </div>
      </div>
    </div>
  )
}
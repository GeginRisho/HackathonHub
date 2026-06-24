import HeroBackground from '@/components/HeroBackground'

export default function Home() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }} className="fade-in">
      <HeroBackground />
      <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '48px 32px', position: 'relative', zIndex: 1 }}>
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
          fontSize: '48px', 
          marginBottom: '16px',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
          letterSpacing: '-0.03em'
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
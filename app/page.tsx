'use client'

import HeroBackground from '@/components/HeroBackground'
import { 
  Trophy, 
  Rocket, 
  Cpu, 
  Code, 
  GitFork, 
  Sparkles, 
  Users, 
  School, 
  Gavel, 
  ArrowRight, 
  Sliders, 
  LineChart, 
  Award, 
  Send 
} from 'lucide-react'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 20px 100px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }} className="fade-in">
      <HeroBackground />

      {/* Hero Section Container */}
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '75vh',
        width: '100%',
        position: 'relative',
        zIndex: 2,
        marginBottom: '100px'
      }}>
        {/* Floating Technology Icons */}
        <Trophy className="floating-tech-icon icon-1" size={32} />
        <Rocket className="floating-tech-icon icon-2" size={32} />
        <Cpu className="floating-tech-icon icon-3" size={32} />
        <Code className="floating-tech-icon icon-4" size={32} />
        <GitFork className="floating-tech-icon icon-5" size={32} />
        <Sparkles className="floating-tech-icon icon-6" size={28} />

        {/* Premium Hero Card */}
        <div className="glass-card glass-card-glow" style={{ maxWidth: '650px', width: '100%', padding: '56px 40px', position: 'relative', zIndex: 10 }}>
          <span style={{ 
            fontSize: '13px', 
            fontWeight: 700, 
            letterSpacing: '0.15em', 
            color: 'var(--primary)', 
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '20px'
          }}>
            Next-Generation Hackathon Portal
          </span>
          <h1 className="animated-gradient-text" style={{ 
            fontSize: '56px', 
            marginBottom: '24px',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: '1.1'
          }}>
            🎯 Hackathon Manager
          </h1>
          <p style={{ 
            fontSize: '17px', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.7',
            marginBottom: '40px',
            maxWidth: '520px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            The ultimate platform for organizers, participants, and jury members to coordinate projects, submit solutions, and evaluate results in real-time.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }} className="flex-mobile-wrap">
            <a href="/login" className="btn-cta-primary">
              Login to Dashboard <ArrowRight size={18} />
            </a>
            <a href="/register" className="btn-cta-secondary">
              Register Now
            </a>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ width: '100%', maxWidth: '1000px', position: 'relative', zIndex: 2, marginBottom: '120px' }}>
        <h2 className="section-title">Platform Statistics</h2>
        <p className="section-subtitle">Fueling technology ecosystems at global scale with performance indicators across institutions.</p>
        <div className="stats-grid">
          <div className="glass-card stat-card-gradient" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Users size={32} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>10,000+</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Active Participants</p>
          </div>
          <div className="glass-card stat-card-gradient" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Trophy size={32} style={{ color: 'var(--secondary)', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>500+</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Hackathons Hosted</p>
          </div>
          <div className="glass-card stat-card-gradient" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <School size={32} style={{ color: 'var(--accent)', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>200+</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Partnered Colleges</p>
          </div>
          <div className="glass-card stat-card-gradient" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Gavel size={32} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>50+</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Jury Members</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ width: '100%', maxWidth: '1100px', position: 'relative', zIndex: 2 }}>
        <h2 className="section-title">Core Platform Features</h2>
        <p className="section-subtitle">Everything you need to host, compete, and evaluate projects in a unified, modern interface.</p>
        <div className="features-grid">
          <div className="premium-feature-card">
            <div className="feature-icon-wrapper">
              <Send size={24} />
            </div>
            <h3 className="feature-title">Project Submission</h3>
            <p className="feature-desc">Participants submit repositories, pitch documents, slides, and demo video records effortlessly in a clean interface.</p>
          </div>
          <div className="premium-feature-card">
            <div className="feature-icon-wrapper">
              <Sliders size={24} />
            </div>
            <h3 className="feature-title">Jury Evaluation</h3>
            <p className="feature-desc">Judges score submissions using standard weighted criteria sliders with immediate feedback audit logs.</p>
          </div>
          <div className="premium-feature-card">
            <div className="feature-icon-wrapper">
              <LineChart size={24} />
            </div>
            <h3 className="feature-title">Real-Time Results</h3>
            <p className="feature-desc">Live leaderboards compile scores, ranking winners instantly inside student/admin dashboard screens.</p>
          </div>
          <div className="premium-feature-card">
            <div className="feature-icon-wrapper">
              <Award size={24} />
            </div>
            <h3 className="feature-title">Digital Certificates</h3>
            <p className="feature-desc">Generate and download secure, verifiable graduation certificates directly from student dashboard profile panels.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
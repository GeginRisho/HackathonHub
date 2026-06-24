'use client'

import React, { useState, useEffect } from 'react'
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
  Send,
  Box,
  TrendingUp
} from 'lucide-react'

// Custom lightweight high-performance CountUp component using requestAnimationFrame
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTimestamp: number | null = null
    let animationFrameId: number
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step)
      }
    }
    
    animationFrameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(animationFrameId)
  }, [end, duration])
  
  return <>{count.toLocaleString()}</>
}

export default function Home() {
  return (
    <div className="landing-dark-wrapper" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 20px 120px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
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
        marginBottom: '120px'
      }}>
        {/* Floating Technology Icons (9 Icons, Glowing Softly, Rotating & Moving Independently) */}
        <Trophy className="floating-tech-icon" size={34} style={{ position: 'absolute', top: '12%', left: '8%', color: '#7c3aed' }} />
        <Rocket className="floating-tech-icon" size={32} style={{ position: 'absolute', top: '22%', right: '8%', color: '#06b6d4', animationDelay: '-2s' }} />
        <Cpu className="floating-tech-icon" size={32} style={{ position: 'absolute', bottom: '22%', left: '10%', color: '#2563eb', animationDelay: '-5s' }} />
        <Users className="floating-tech-icon" size={30} style={{ position: 'absolute', bottom: '15%', right: '12%', color: '#10b981', animationDelay: '-8s' }} />
        <Code className="floating-tech-icon" size={32} style={{ position: 'absolute', top: '45%', left: '4%', color: '#7c3aed', animationDelay: '-3s' }} />
        <Box className="floating-tech-icon" size={30} style={{ position: 'absolute', top: '50%', right: '5%', color: '#06b6d4', animationDelay: '-6s' }} />
        <GitFork className="floating-tech-icon" size={28} style={{ position: 'absolute', top: '8%', right: '28%', color: '#2563eb', animationDelay: '-1s' }} />
        <Award className="floating-tech-icon" size={32} style={{ position: 'absolute', bottom: '35%', right: '28%', color: '#10b981', animationDelay: '-4s' }} />
        <TrendingUp className="floating-tech-icon" size={28} style={{ position: 'absolute', bottom: '38%', left: '26%', color: '#7c3aed', animationDelay: '-7s' }} />

        {/* Premium Dark Glassmorphism Hero Card */}
        <div className="glass-card-dark float-hero-card" style={{ maxWidth: '680px', width: '100%', padding: '60px 48px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '6px 16px', borderRadius: '30px' }}>
            <Sparkles size={14} style={{ color: '#06b6d4' }} />
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 700, 
              letterSpacing: '0.12em', 
              color: 'rgba(255, 255, 255, 0.9)', 
              textTransform: 'uppercase',
            }}>
              Now Live: Next-Generation Portal
            </span>
          </div>
          <h1 className="animated-gradient-text text-glow-purple" style={{ 
            fontSize: '60px', 
            marginBottom: '24px',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: '1.05'
          }}>
            Hackathon Manager
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: 'rgba(255, 255, 255, 0.7)', 
            lineHeight: '1.75',
            marginBottom: '44px',
            maxWidth: '540px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontWeight: 400
          }}>
            The ultimate futuristic console for organizers, developers, and panel judges to configure rounds, push submissions, and verify evaluative scores.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }} className="flex-mobile-wrap">
            <a href="/login" className="btn-cta-primary btn-cta-primary-glow">
              Enter Console <ArrowRight size={18} style={{ transition: 'transform 0.3s' }} className="cta-arrow" />
            </a>
            <a href="/register" className="btn-cta-secondary">
              Developer SignUp
            </a>
          </div>
        </div>
      </div>

      {/* Statistics Section (Animated Glass Cards with Icons & Count-Ups) */}
      <div style={{ width: '100%', maxWidth: '1020px', position: 'relative', zIndex: 2, marginBottom: '130px' }}>
        <h2 className="section-title">Global Platform Metrics</h2>
        <p className="section-subtitle">Scale operations across hundreds of developer leagues, universities, and panel networks.</p>
        <div className="stats-grid">
          <div className="glass-card-dark neon-border-purple" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Users size={36} style={{ color: '#7c3aed', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              <CountUp end={10000} />+
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', fontWeight: 500 }}>Active Developers</p>
          </div>
          <div className="glass-card-dark neon-border-cyan" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Trophy size={36} style={{ color: '#06b6d4', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              <CountUp end={500} />+
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', fontWeight: 500 }}>Events Hosted</p>
          </div>
          <div className="glass-card-dark neon-border-blue" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <School size={36} style={{ color: '#2563eb', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              <CountUp end={200} />+
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', fontWeight: 500 }}>Colleges Enrolled</p>
          </div>
          <div className="glass-card-dark neon-border-emerald" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Gavel size={36} style={{ color: '#10b981', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              <CountUp end={50} />+
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', fontWeight: 500 }}>Judges Panel</p>
          </div>
        </div>
      </div>

      {/* Features Grid Section (SaaS Glassmorphism Icon Highlights) */}
      <div style={{ width: '100%', maxWidth: '1100px', position: 'relative', zIndex: 2 }}>
        <h2 className="section-title">Platform Features</h2>
        <p className="section-subtitle">Fully automated pipelines constructed for high performance developer iterations.</p>
        <div className="features-grid">
          <div className="premium-feature-card glass-card-dark neon-border-purple">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
              <Send size={24} />
            </div>
            <h3 className="feature-title" style={{ color: '#ffffff' }}>Project Submission</h3>
            <p className="feature-desc" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Push project repositories, slide decks, and demo video references directly to the registry matrix.</p>
          </div>
          <div className="premium-feature-card glass-card-dark neon-border-cyan">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
              <Sliders size={24} />
            </div>
            <h3 className="feature-title" style={{ color: '#ffffff' }}>Jury Evaluation</h3>
            <p className="feature-desc" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Conduct weighted grading assessments utilizing slider score panels with inline logging comments.</p>
          </div>
          <div className="premium-feature-card glass-card-dark neon-border-blue">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
              <LineChart size={24} />
            </div>
            <h3 className="feature-title" style={{ color: '#ffffff' }}>Real-Time Results</h3>
            <p className="feature-desc" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Leaderboard lists synchronize and rank team submissions instantly upon grading completions.</p>
          </div>
          <div className="premium-feature-card glass-card-dark neon-border-emerald">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Award size={24} />
            </div>
            <h3 className="feature-title" style={{ color: '#ffffff' }}>Digital Certificates</h3>
            <p className="feature-desc" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Generate secure graduation credentials immediately download-ready from member profiles.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
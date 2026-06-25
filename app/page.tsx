'use client'

import React, { useState, useEffect, useRef } from 'react'
import HeroBackground from '@/components/HeroBackground'
import { 
  Trophy, 
  Rocket, 
  Cpu, 
  Code, 
  GitFork, 
  Sparkles, 
  Users, 
  Award, 
  ArrowRight, 
  Box,
  TrendingUp,
  School,
  Gavel,
  Send,
  Sliders,
  LineChart
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

// Custom lightweight IntersectionObserver React wrapper for 60fps fade-up scroll animations
function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <div className="landing-bright-wrapper">
      <HeroBackground />

      {/* Hero Section Container */}
      <div className="hero-section-container">
        {/* Floating Technology Icons (9 Icons, Glowing Softly, Rotating & Moving Independently) */}
        <Trophy className="floating-tech-icon" size={34} style={{ position: 'absolute', top: '12%', left: '8%', color: '#a855f7' }} />
        <Rocket className="floating-tech-icon" size={32} style={{ position: 'absolute', top: '22%', right: '8%', color: '#06b6d4', animationDelay: '-2s' }} />
        <Cpu className="floating-tech-icon" size={32} style={{ position: 'absolute', bottom: '22%', left: '10%', color: '#3b82f6', animationDelay: '-5s' }} />
        <Users className="floating-tech-icon" size={30} style={{ position: 'absolute', bottom: '15%', right: '12%', color: '#10b981', animationDelay: '-8s' }} />
        <Code className="floating-tech-icon" size={32} style={{ position: 'absolute', top: '45%', left: '4%', color: '#a855f7', animationDelay: '-3s' }} />
        <Box className="floating-tech-icon" size={30} style={{ position: 'absolute', top: '50%', right: '5%', color: '#06b6d4', animationDelay: '-6s' }} />
        <GitFork className="floating-tech-icon" size={28} style={{ position: 'absolute', top: '8%', right: '28%', color: '#3b82f6', animationDelay: '-1s' }} />
        <Award className="floating-tech-icon" size={32} style={{ position: 'absolute', bottom: '35%', right: '28%', color: '#10b981', animationDelay: '-4s' }} />
        <TrendingUp className="floating-tech-icon" size={28} style={{ position: 'absolute', bottom: '38%', left: '26%', color: '#a855f7', animationDelay: '-7s' }} />

        {/* Fade-in wrapper to handle clean animation entry */}
        <div className="hero-fade-in-wrapper">
          {/* Premium Vibrant Glassmorphism Hero Card */}
          <div className="glass-card-saas float-hero-card hero-main-card" style={{ maxWidth: '640px', padding: '50px 40px', position: 'relative', zIndex: 10, boxSizing: 'border-box' }}>
            {/* Glass Sweep Reflection effect */}
            <div className="glass-sweep-reflection" />
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '6px 16px', borderRadius: '30px' }}>
              <Sparkles size={14} style={{ color: '#3b82f6' }} />
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 700, 
                letterSpacing: '0.12em', 
                color: '#4f46e5', 
                textTransform: 'uppercase',
              }}>
                Now Live: Next-Generation Portal
              </span>
            </div>
            
            <h1 className="animated-gradient-text-bright" style={{ 
              fontSize: '56px', 
              marginBottom: '20px',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: '1.05'
            }}>
              Hackathon Manager
            </h1>
            
            <p style={{ 
              fontSize: '16px', 
              color: 'var(--text-secondary)', 
              lineHeight: '1.65',
              marginBottom: '36px',
              maxWidth: '520px',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontWeight: 400
            }}>
              The ultimate futuristic console for organizers, developers, and panel judges to configure rounds, push submissions, and verify evaluative scores.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }} className="flex-mobile-wrap">
              <a href="/login" className="btn-cta-primary-bright">
                Login to Dashboard <ArrowRight size={18} style={{ transition: 'transform 0.3s' }} className="cta-arrow" />
              </a>
              <a href="/register" className="btn-cta-secondary-bright">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
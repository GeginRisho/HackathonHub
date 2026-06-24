'use client'

import React, { useState, useEffect } from 'react'

export default function HeroBackground() {
  const [animationsPaused, setAnimationsPaused] = useState<boolean>(false)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('hero-bg-animations-paused')
    if (stored === 'true') {
      setAnimationsPaused(true)
    }
  }, [])

  const toggleAnimations = () => {
    const nextState = !animationsPaused
    setAnimationsPaused(nextState)
    localStorage.setItem('hero-bg-animations-paused', String(nextState))
  }

  return (
    <div className={`hero-bg-container ${animationsPaused ? 'animations-paused' : ''}`}>
      {/* 1. Glowing Particles */}
      <div className="hero-bg-layer">
        <div className="glow-particle particle-1" />
        <div className="glow-particle particle-2" />
        <div className="glow-particle particle-3" />
      </div>

      {/* 2. Floating Geometric Shapes */}
      <div className="hero-bg-layer">
        {/* Shape 1: Tech Hexagon */}
        <svg className="floating-shape shape-1" width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="50,5 92,29 92,71 50,95 8,71 8,29" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Shape 2: Crosshair / Target */}
        <svg className="floating-shape shape-2" width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="28" strokeDasharray="5 5" />
          <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="2 4" />
          <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2 4" />
        </svg>

        {/* Shape 3: Code Brackets */}
        <svg className="floating-shape shape-3" width="50" height="50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M35,25 L15,25 L15,75 L35,75" />
          <path d="M65,25 L85,25 L85,75 L65,75" />
          <circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.3" />
        </svg>

        {/* Shape 4: Grid tech fragment */}
        <svg className="floating-shape shape-4" width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="15" y="15" width="30" height="30" rx="3" strokeDasharray="4 2" />
          <rect x="55" y="15" width="30" height="30" rx="3" />
          <rect x="15" y="55" width="30" height="30" rx="3" />
          <circle cx="70" cy="70" r="12" fill="currentColor" fillOpacity="0.15" />
        </svg>
      </div>

      {/* 3. Moving Network Connection Lines */}
      <svg className="network-lines" viewBox="0 0 1000 600" preserveAspectRatio="none" fill="none">
        {/* Connection Lines with Dash Animations */}
        <line x1="150" y1="100" x2="350" y2="180" stroke="currentColor" strokeWidth="1" className="network-pulse-line" />
        <line x1="350" y1="180" x2="250" y2="350" stroke="currentColor" strokeWidth="1" className="network-pulse-line" />
        <line x1="350" y1="180" x2="550" y2="150" stroke="currentColor" strokeWidth="1.2" className="network-pulse-line" />
        <line x1="550" y1="150" x2="700" y2="320" stroke="currentColor" strokeWidth="1" className="network-pulse-line" />
        <line x1="700" y1="320" x2="850" y2="200" stroke="currentColor" strokeWidth="1" className="network-pulse-line" />
        <line x1="700" y1="320" x2="600" y2="450" stroke="currentColor" strokeWidth="1" className="network-pulse-line" />
        <line x1="250" y1="350" x2="600" y2="450" stroke="currentColor" strokeWidth="1.2" className="network-pulse-line" />
        
        {/* Nodes (Glowing Points) */}
        <circle cx="150" cy="100" r="3" fill="currentColor" className="network-node" />
        <circle cx="350" cy="180" r="3.5" fill="currentColor" className="network-node" />
        <circle cx="250" cy="350" r="3" fill="currentColor" className="network-node" />
        <circle cx="550" cy="150" r="4" fill="currentColor" className="network-node" />
        <circle cx="700" cy="320" r="3.5" fill="currentColor" className="network-node" />
        <circle cx="850" cy="200" r="3" fill="currentColor" className="network-node" />
        <circle cx="600" cy="450" r="4.5" fill="currentColor" className="network-node" />
      </svg>

      {/* 4. Subtle Digital Wave Effects */}
      <div className="wave-layer">
        <svg className="digital-wave wave-1" viewBox="0 0 2880 200" preserveAspectRatio="none">
          <path d="M 0 110 Q 360 60, 720 110 T 1440 110 Q 1800 60, 2160 110 T 2880 110 L 2880 200 L 0 200 Z" />
        </svg>
        <svg className="digital-wave wave-2" viewBox="0 0 2880 200" preserveAspectRatio="none">
          <path d="M 0 130 Q 360 85, 720 130 T 1440 130 Q 1800 85, 2160 130 T 2880 130 L 2880 200 L 0 200 Z" />
        </svg>
      </div>

      {/* 5. Performance Fallback Control (Clean Toggle in Bottom Right of Hero Area) */}
      <button
        onClick={toggleAnimations}
        title={animationsPaused ? "Enable Background Animations" : "Disable Background Animations"}
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          padding: '6px 12px',
          fontSize: '11px',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          background: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 10,
          transition: 'var(--transition-smooth)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#ffffff'
          e.currentTarget.style.color = 'var(--text-primary)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'
          e.currentTarget.style.color = 'var(--text-secondary)'
        }}
      >
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: animationsPaused ? '#94a3b8' : '#22c55e',
          display: 'inline-block'
        }} />
        {animationsPaused ? 'Animations Off' : 'Animations On'}
      </button>
    </div>
  )
}

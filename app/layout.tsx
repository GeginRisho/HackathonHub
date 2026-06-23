'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import NotificationBell from '@/components/NotificationBell'
import { Toaster, toast } from 'sonner'
import './globals.css'

function Navbar() {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string>('participant')
  const supabase = createClient()

  useEffect(() => {
    const getUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        let { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()
        
        if (error || !userData) {
          const newProfile = {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || 'Participant',
            role: user.user_metadata?.role || 'participant',
            created_at: new Date().toISOString()
          }
          const { data: insertedData, error: insertError } = await supabase
            .from('users')
            .insert(newProfile)
            .select()
            .single()
          
          if (!insertError && insertedData) {
            setUserRole(insertedData.role)
          } else {
            setUserRole(user.user_metadata?.role || 'participant')
          }
        } else {
          setUserRole(userData.role || 'participant')
        }
      }
    }
    getUserRole()
  }, [])

  const getLinks = () => {
    const baseLinks = [
      { href: '/participant', label: 'Participant' },
      { href: '/results', label: 'Results' },
      { href: '/certificates', label: 'Certificates' },
      { href: '/profile', label: 'Profile' },
    ]
    
    if (userRole === 'admin') {
      return [
        { href: '/admin', label: 'Admin' },
        { href: '/admin/approvals', label: 'Approvals' },
        { href: '/admin/announcements', label: 'Announcements' },
        ...baseLinks,
      ]
    }
    
    if (userRole === 'jury') {
      return [{ href: '/jury', label: 'Jury' }, ...baseLinks]
    }
    
    if (userRole === 'college') {
      return [{ href: '/college', label: 'College' }, ...baseLinks]
    }
    
    return baseLinks
  }

  const links = getLinks()

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(2, 132, 199, 0.1)',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 999,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link href="/" style={{
          textDecoration: 'none',
          fontSize: '20px',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #0284c7 0%, #16a34a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'var(--font-display)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          🎯 HackathonHub
        </Link>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              style={{ 
                color: pathname === link.href ? '#0369a1' : 'var(--text-secondary)', 
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: pathname === link.href ? '600' : '500',
                transition: 'var(--transition-smooth)',
                padding: '6px 12px',
                borderRadius: '6px',
                background: pathname === link.href ? 'rgba(2, 132, 199, 0.05)' : 'transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <NotificationBell />
        <button
          onClick={async () => {
            const supabase = createClient()
            await supabase.auth.signOut()
            window.location.href = '/'
          }}
          className="btn"
          style={{ 
            padding: '8px 16px', 
            fontSize: '14px',
            borderColor: 'var(--danger-border)',
            color: 'var(--danger)',
            background: 'var(--danger-bg)',
            fontWeight: 600
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.alert = (msg) => {
        toast(msg)
        console.log('WINDOW.ALERT:', msg)
      }
      window.confirm = (msg) => {
        console.log('WINDOW.CONFIRM (auto-confirmed):', msg)
        return true
      }
      window.prompt = (msg, defaultVal) => {
        console.log('WINDOW.PROMPT:', msg, defaultVal)
        return defaultVal || ''
      }
    }
  }, [])

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
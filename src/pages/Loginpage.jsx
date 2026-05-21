import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDB } from '@/data/db'
import logoImg from '@/assets/logo.png'

export default function Loginpage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showDrawer, setShowDrawer] = useState(false)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const db = getDB()
    setUsers(db.users || [])
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    const db = getDB()
    const activeUsers = db.users || []
    
    const matchedUser = activeUsers.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    )

    if (matchedUser) {
      localStorage.setItem('userRole', matchedUser.role)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('currentUser', JSON.stringify(matchedUser))

      if (matchedUser.role === 'admin') navigate('/admin/dashboard')
      else if (matchedUser.role === 'retailer') navigate('/retailer/dashboard')
      else if (matchedUser.role === 'marketing') navigate('/marketing/dashboard')
      else if (matchedUser.role === 'customer') navigate('/customer/home')
      return
    }

    setError('Invalid username or password. Try one of the accounts in the Demo drawer!')
  }

  const handleSelectAccount = (u) => {
    setUsername(u.username)
    setPassword(u.password)
    setError('')
  }

  return (
    <div className="login-container" style={{
      height: '100vh',
      minHeight: '100vh',
      maxHeight: '100vh',
      display: 'flex',
      fontFamily: "'Outfit', 'DM Sans', sans-serif",
      background: '#F5F7FA',
      overflow: 'hidden'
    }}>
      {/* LEFT SIDE: BRANDING, LOGO, FEATURES & FUNCTIONALITY (60% width) */}
      <div className="login-left" style={{
        width: '60%',
        height: '100vh',
        background: 'linear-gradient(135deg, #E9F1FA 0%, #E8F6F0 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 36px',
        color: '#0B2545',
        boxSizing: 'border-box',
        overflow: 'hidden',
        borderRight: '1px solid rgba(12, 68, 124, 0.08)'
      }}>
        {/* Decorative Glowing Orbs */}
        <div style={{
          position: 'absolute',
          top: '-200px',
          left: '-200px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(13, 92, 165, 0.12)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(30, 170, 79, 0.1)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} />

        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }}>
          <defs>
            <pattern id="loginGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0D5CA5" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loginGrid)" />
        </svg>

        {/* Top Tagline Banner */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span style={{
            fontSize: '10px',
            fontWeight: '800',
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            color: '#1EAA4F',
            background: 'rgba(30,170,79,0.08)',
            padding: '5px 10px',
            borderRadius: '20px',
            border: '1px solid rgba(30,170,79,0.15)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1EAA4F', display: 'inline-block' }} />
            SECURE SCAN & PROTECTION SYSTEM
          </span>
        </div>

        {/* Center Logo & Feature Grid */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '12px 24px',
            borderRadius: '14px',
            border: '1.5px solid rgba(12, 68, 124, 0.16)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '320px',
            boxSizing: 'border-box',
            marginBottom: '16px',
            boxShadow: '0 8px 24px rgba(12,68,124,0.08)'
          }}>
            <img 
              src={logoImg} 
              alt="ScanForSafe Logo" 
              style={{ 
                height: '44px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block' 
              }} 
            />
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '6px',
            letterSpacing: '-0.5px',
            color: '#0B2545'
          }}>
            Connect in Emergencies. <br />
            <span style={{ background: 'linear-gradient(120deg, #0C447C, #1EAA4F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Protect What Matters Most.
            </span>
          </h2>
          
          <p style={{
            fontSize: '13px',
            color: '#3F5166',
            maxWidth: '540px',
            lineHeight: '1.4',
            marginBottom: '14px',
            fontWeight: 400
          }}>
            ScanForSafe links physical tags to instant emergency notification networks without requiring app downloads.
          </p>

          {/* Features Grid (2x2) - Emojis Removed */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            maxWidth: '680px'
          }}>
            {[
              { 
                title: 'Vehicle Safety Decals', 
                desc: 'Radium windshield decals for quick owner notifications, tow warnings, and first-responder medical details retrieval.',
                color: '#3498db'
              },
              { 
                title: 'Senior Medical Wristbands', 
                desc: 'Medical-grade wristbands displaying allergy summaries and linking directly to primary emergency contacts.',
                color: '#e74c3c'
              },
              { 
                title: 'Kids Safety Uniform Patches', 
                desc: 'Woven uniform arm tags providing instant, automated parent and school admin alerts during daily transit.',
                color: '#9b59b6'
              },
              { 
                title: 'Lost Pet Smart Collars', 
                desc: 'Durable, scan-enabled smart tags featuring a secure cloud-lookup dashboard for lost pet recovery.',
                color: '#f39c12'
              }
            ].map(f => (
              <div 
                key={f.title} 
                className="feature-card"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  border: '1px solid rgba(12,68,124,0.08)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  transition: 'all 0.2s ease-in-out',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: f.color
                }} />
                <div style={{
                  fontSize: '12.5px',
                  fontWeight: '700',
                  color: '#0B2545',
                  marginBottom: '2px'
                }}>
                  {f.title}
                </div>
                <div style={{ fontSize: '11px', color: '#475569', lineHeight: '1.3' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Panel: Core Application Functionality */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          borderTop: '1px solid rgba(12,68,124,0.12)',
          paddingTop: '14px'
        }}>
          <h4 style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            color: '#1EAA4F',
            fontWeight: '800',
            letterSpacing: '1px',
            marginBottom: '8px'
          }}>
            ⚡ Core System Functionality
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px'
          }}>
            {[
              { badge: 'NFC/QR Scan', color: '#0C447C', bg: '#E6F0FA', step: '1. Scan Tag', text: 'Smartphones scan the QR tag to load profiles.' },
              { badge: 'GPS Tracking', color: '#008080', bg: '#E0F2F1', step: '2. Auto Location', text: 'Browser detects GPS and alerts nearby responders.' },
              { badge: 'SOS Alerts', color: '#C0392B', bg: '#FDEDEC', step: '3. SOS Dispatch', text: 'WhatsApp and SMS alerts fire to registered guardians.' },
              { badge: 'Security Log', color: '#6C4AB7', bg: '#F3E5F5', step: '4. Encrypted Log', text: 'Full telemetry is logged securely in the admin dashboard.' }
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  fontSize: '8px',
                  fontWeight: '800',
                  color: s.color,
                  background: s.bg,
                  padding: '2px 6px',
                  borderRadius: '10px',
                  display: 'inline-block',
                  alignSelf: 'flex-start',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {s.badge}
                </span>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#0C447C' }}>{s.step}</div>
                <div style={{ fontSize: '9.5px', color: '#4A5868', lineHeight: '1.25' }}>{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: SECURE LOGIN PANEL (40% width) */}
      <div className="login-right" style={{
        width: '40%',
        height: '100vh',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px 60px',
        boxShadow: '-10px 0 50px rgba(12,68,124,0.05)',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '380px', width: '100%', margin: '0 auto' }}>
          
          {/* Secure portal indicator */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{
              background: '#E6F0FA',
              color: 'var(--brand)',
              fontSize: '11px',
              fontWeight: '800',
              padding: '6px 12px',
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              SECURE ACCESS PORTAL
            </span>
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'var(--text-1)',
            letterSpacing: '-1px',
            lineHeight: '1.15',
            marginBottom: '6px'
          }}>
            Welcome Back.
          </h1>
          <p style={{
            fontSize: '12px',
            color: 'var(--text-3)',
            fontWeight: '600',
            marginBottom: '32px'
          }}>
            Enter your credentials to manage your safety profile or dashboards.
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--text-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '8px'
              }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin, retailer, customer or marketing"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border-md)',
                  fontSize: '14.5px',
                  outline: 'none',
                  background: '#fff',
                  color: 'var(--text-1)',
                  fontFamily: "'Outfit', 'DM Sans', sans-serif",
                  transition: 'all 0.15s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--brand)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(13,92,165,0.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-md)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--text-2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Password
                </label>
                <span style={{ fontSize: '11px', color: 'var(--brand)', fontWeight: '700', cursor: 'pointer' }}>FORGOT?</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border-md)',
                  fontSize: '14.5px',
                  outline: 'none',
                  background: '#fff',
                  color: 'var(--text-1)',
                  fontFamily: "'Outfit', 'DM Sans', sans-serif",
                  transition: 'all 0.15s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--brand)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(13,92,165,0.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-md)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {error && (
              <div style={{
                background: 'var(--danger-light)',
                color: 'var(--danger)',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: '600',
                border: '1px solid rgba(192,57,43,0.15)'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-btn"
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, var(--brand) 0%, #084882 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '800',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(13,92,165,0.3)',
                transition: 'all 0.2s ease-in-out',
                fontFamily: "'Outfit', 'DM Sans', sans-serif"
              }}
            >
              Access Dashboard →
            </button>
          </form>

          {/* Footer copyright */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '10px',
            color: 'var(--text-3)',
            fontWeight: '700',
            letterSpacing: '0.8px'
          }}>
            © 2026 SCANFORSAFE. GENIUS MINDS MAKING CODE.
          </div>

        </div>
      </div>

      {/* DRAWER POPUP */}
      {showDrawer && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(12,68,124,0.45)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s'
          }}
          onClick={() => setShowDrawer(false)}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '380px',
              height: '100%',
              background: 'white',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
              padding: '30px 24px',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              overflowY: 'auto',
              animation: 'slideLeft 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-1)' }}>Demo Profiles</h3>
              <button 
                onClick={() => setShowDrawer(false)}
                style={{
                  background: 'var(--surface-2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '14px',
                  color: 'var(--text-3)'
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '20px', lineHeight: 1.4 }}>
              Click any profile below to autofill the form. You will be redirected to the corresponding dashboard.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {users.map((u) => {
                let roleColor = 'var(--brand)';
                if (u.role === 'retailer') roleColor = 'var(--accent)';
                if (u.role === 'marketing') roleColor = '#6C4AB7';
                if (u.role === 'customer') roleColor = 'var(--brand-mid)';

                return (
                  <div
                    key={u.username}
                    onClick={() => {
                      handleSelectAccount(u)
                      setShowDrawer(false)
                    }}
                    style={{
                      border: '1.5px solid var(--border)',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease-in-out',
                      background: 'var(--surface-2)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = roleColor
                      e.currentTarget.style.transform = 'scale(1.02)'
                      e.currentTarget.style.background = 'white'
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.05)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.background = 'var(--surface-2)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--text-1)' }}>{u.name}</strong>
                      <span style={{
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        fontWeight: '800',
                        color: 'white',
                        background: roleColor,
                        padding: '2px 8px',
                        borderRadius: '10px'
                      }}>
                        {u.role}
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-2)' }}>
                      <strong>User:</strong> <code style={{ background: 'rgba(0,0,0,0.05)', padding: '1px 4px', borderRadius: '4px' }}>{u.username}</code>
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-2)', marginTop: '4px' }}>
                      <strong>Pass:</strong> <code style={{ background: 'rgba(0,0,0,0.05)', padding: '1px 4px', borderRadius: '4px' }}>{u.password}</code>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS Animations & Media Queries */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.95) !important;
          border-color: rgba(12,68,124,0.18) !important;
          transform: translateX(4px);
          box-shadow: 0 8px 24px rgba(12,68,124,0.05);
        }
        .login-btn:hover {
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(13,92,165,0.45) !important;
          opacity: 0.95;
        }
        @media (max-width: 1024px) {
          .login-container {
            flex-direction: column !important;
            height: auto !important;
            max-height: none !important;
            overflow-y: auto !important;
          }
          .login-left {
            display: none !important;
          }
          .login-right {
            width: 100% !important;
            padding: 40px 24px !important;
            height: 100vh !important;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

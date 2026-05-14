import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// CSS is already imported globally (e.g. in main.jsx / index.js / App.jsx)

/* ─────────────────────────────────────
   CREDENTIALS
───────────────────────────────────── */
const CREDENTIALS = {
  admin:     { username: 'admin',     password: 'admin123',     redirect: '/admin/dashboard' },
  retailer:  { username: 'retailer',  password: 'retailer123',  redirect: '/retailer/dashboard' },
  marketing: { username: 'marketing', password: 'marketing123', redirect: '/marketing/dashboard' },
  customer:  { username: 'customer',  password: 'customer123',  redirect: '/customer/home' },
}

/* ─────────────────────────────────────
   STATIC DATA
───────────────────────────────────── */
const stats = [
  {
    color: '#0F6E56',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    value: '24/7',  title: 'Monitoring', sub: 'Continuous protection round the clock',
  },
  {
    color: '#D97706',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    value: '99.9%', title: 'Protection',  sub: 'Advanced security you can trust',
  },
  {
    color: '#2563EB',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    value: '50K+',  title: 'Scans Daily', sub: 'Products verified every day',
  },
]

const roles = [
  {
    key: 'admin', label: 'Admin', color: '#0F6E56',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    key: 'retailer', label: 'Retailer', color: '#D97706',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    key: 'marketing', label: 'Marketing', color: '#7C3AED',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    key: 'customer', label: 'Customer', color: '#2563EB',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

/* ─────────────────────────────────────
   COMPONENT
───────────────────────────────────── */
export default function Loginpage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))

    for (const [role, creds] of Object.entries(CREDENTIALS)) {
      if (username === creds.username && password === creds.password) {
        localStorage.setItem('userRole', role)
        localStorage.setItem('isLoggedIn', 'true')
        navigate(creds.redirect)
        return
      }
    }

    setError('Invalid credentials. Please try again.')
    setLoading(false)
  }

  return (
    <div className="login-page">

      {/* ══════════════════════════════
          LEFT — background photo panel
         ══════════════════════════════ */}
      <div className="login-left">

        {/* BRAND */}
        <div className="login-brand">
          <div className="login-brand-logo">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div className="login-brand-text">
            <h3>Scan for Safe</h3>
            <p>Product Protection Platform</p>
          </div>
        </div>

        {/* HERO */}
        <div className="login-hero">
          <div className="login-tag">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            AI Powered Product Verification
          </div>

          <h1>
            Smart Product<br />
            Safety &amp;&nbsp;<span>Authentication</span>
          </h1>

          <p>
            Secure your ecosystem with intelligent QR verification,
            counterfeit detection, emergency reporting, and real-time
            monitoring across customers, retailers, and vendors.
          </p>

          {/* LIVE BADGES */}
          <div className="login-live-badges">
            <div className="login-live-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <div>
                <div className="login-live-badge-title">Live Product Scan</div>
                <div className="login-live-badge-sub">
                  Real-time Verification
                  <span className="login-pulse-dot" />
                </div>
              </div>
            </div>

            <div className="login-live-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8"  y1="23" x2="16" y2="23" />
              </svg>
              <div>
                <div className="login-live-badge-title">Threat Detection</div>
                <div className="login-live-badge-sub">
                  System Active
                  <span className="login-pulse-dot" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="login-stats">
          {stats.map((s) => (
            <div className="login-stat" key={s.title}>
              <div className="login-stat-icon" style={{ color: s.color }}>{s.icon}</div>
              <div className="login-stat-value">{s.value}</div>
              <div className="login-stat-title">{s.title}</div>
              <div className="login-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="login-left-footer">
          <div className="login-left-footer-inner">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span>© 2026 Scan for Safe. All rights reserved.</span>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════
          RIGHT — login form
         ══════════════════════════════ */}
      <div className="login-right">
        <div className="login-form-wrap">

          <div className="login-heading">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleLogin} noValidate>

            {/* USERNAME */}
            <div className="login-field">
              <label>Username</label>
              <div className="login-field-wrap">
                <span className="login-field-icon login-field-icon--left">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="login-field">
              <label>Password</label>
              <div className="login-field-wrap">
                <span className="login-field-icon login-field-icon--left">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="login-field-icon login-field-icon--right login-pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* FORGOT */}
            <div className="login-forgot">
              <a href="/">Forgot password?</a>
            </div>

            {/* ERROR */}
            {error && (
              <div className="login-error">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8"  x2="12"   y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className={`login-btn${loading ? ' login-btn--loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <><span className="login-spinner" /> Authenticating…</>
              ) : (
                <>
                  Access Dashboard
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5"  y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>

          </form>

          {/* ROLES */}
          <div className="login-roles">
            <strong>Available Roles</strong>
            <div className="login-roles-grid">
              {roles.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  className="login-role-chip"
                  style={{ '--chip-color': r.color }}
                  onClick={() => setUsername(r.key)}
                  title={`Quick-fill: ${r.key} / ${r.key}123`}
                >
                  <span style={{ color: r.color }}>{r.icon}</span>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Static credentials for each role
const CREDENTIALS = {
  admin: {
    username: 'admin',
    password: 'admin123',
    redirect: '/admin/dashboard'
  },
  retailer: {
    username: 'retailer',
    password: 'retailer123',
    redirect: '/retailer/dashboard'
  },
  marketing: {
    username: 'marketing',
    password: 'marketing123',
    redirect: '/marketing/dashboard'
  },
  customer: {
    username: 'customer',
    password: 'customer123',
    redirect: '/customer/home'
  }
}

export default function Loginpage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    // Check credentials against static data
    for (const [role, creds] of Object.entries(CREDENTIALS)) {
      if (username === creds.username && password === creds.password) {
        // Store role in localStorage for persistence
        localStorage.setItem('userRole', role)
        localStorage.setItem('isLoggedIn', 'true')
        navigate(creds.redirect)
        return
      }
    }

    setError('Invalid credentials. Please try again.')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F6E56 0%, #0C447C 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '420px',
        padding: '40px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--brand-light)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            margin: '0 auto 16px'
          }}>
            🛡️
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111211',
            marginBottom: '8px'
          }}>
            Scan for Safe
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--text-3)'
          }}>
            Sign in to your dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text-2)',
              marginBottom: '8px'
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-md)',
                fontSize: '14px',
                outline: 'none',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'border-color 0.15s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--brand-mid)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-md)'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text-2)',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-md)',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'border-color 0.15s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--brand-mid)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-md)'}
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
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: 'var(--brand)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.15s',
              fontFamily: "'DM Sans', sans-serif"
            }}
            onMouseOver={(e) => e.target.style.background = 'var(--brand-mid)'}
            onMouseOut={(e) => e.target.style.background = 'var(--brand)'}
          >
            Sign In
          </button>
        </form>

        {/* Credentials Info */}
        {/* <div style={{
          marginTop: '32px',
          padding: '16px',
          background: 'var(--surface-2)',
          borderRadius: '8px',
          fontSize: '12px',
          color: 'var(--text-3)'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--text-2)' }}>
            Demo Credentials:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>Retailer:</strong> retailer / retailer123</div>
            <div><strong>Marketing:</strong> marketing / marketing123</div>
            <div><strong>Customer:</strong> customer / customer123</div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

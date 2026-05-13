import { useNavigate } from 'react-router-dom'
import { ROLES } from '@/data/mockData'

export default function RoleSwitcher({ currentRole, onLogout }) {
  const navigate = useNavigate()

  // Get the logged-in role from localStorage
  const loggedInRole = localStorage.getItem('userRole')

  // Filter roles to show only the logged-in role
  const visibleRoles = loggedInRole ? ROLES.filter(r => r.key === loggedInRole) : ROLES

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 999,
      background: '#1a1a1a',
      display: 'flex', alignItems: 'center', gap: 0,
      padding: '0 16px',
      height: 'var(--switcher-h)',
      borderBottom: '2px solid #333',
    }}>
      <span style={{ fontSize: 11, color: '#888', letterSpacing: '.08em', textTransform: 'uppercase', marginRight: 12, whiteSpace: 'nowrap' }}>
        Interface
      </span>

      {visibleRoles.map(r => (
        <div
          key={r.key}
          onClick={() => navigate(`/${r.key}`)}
          style={{
            padding: '0 16px', height: 40,
            display: 'flex', alignItems: 'center', gap: 7,
            fontSize: 12, fontWeight: 500, cursor: 'pointer',
            color: currentRole === r.key ? '#fff' : '#999',
            borderBottom: currentRole === r.key ? '2px solid var(--brand-mid)' : '2px solid transparent',
            marginBottom: -2,
            transition: 'all .15s',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: r.dot, flexShrink: 0, display: 'inline-block' }} />
          {r.label}
        </div>
      ))}

      <div style={{ flex: 1 }} />
      <button
        onClick={onLogout}
        style={{
          fontSize: 11,
          color: '#ff6b6b',
          background: '#2a2a2a',
          border: '1px solid #444',
          borderRadius: 4,
          padding: '4px 12px',
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          transition: 'all .15s',
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#ff6b6b'
          e.target.style.color = '#fff'
        }}
        onMouseOut={(e) => {
          e.target.style.background = '#2a2a2a'
          e.target.style.color = '#ff6b6b'
        }}
      >
        Logout
      </button>
      <span style={{ fontSize: 10, color: '#555', background: '#2a2a2a', border: '1px solid #444', borderRadius: 4, padding: '2px 8px', fontFamily: "'DM Mono', monospace" }}>
        Demo v1.5
      </span>
    </div>
  )
}

import { useLocation, useNavigate } from 'react-router-dom'

export default function Sidebar({ bg, logoIcon, logoName, logoSub, navGroups, user, userRole }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav
      style={{
        width: 'var(--sidebar-w)',
        background: bg,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34,
            background: 'rgba(255,255,255,.15)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>
            {logoIcon}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{logoName}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.45)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 1 }}>{logoSub}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: 10 }}>
        {navGroups.map(({ label, items }) => (
          <div key={label}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', padding: '12px 10px 5px' }}>
              {label}
            </div>
            {items.map(({ icon, text, badge, badgeColor, path }) => {
              const isActive = location.pathname === path
              return (
                <div
                  key={path}
                  onClick={() => navigate(path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 10px', borderRadius: 8, marginBottom: 2,
                    cursor: 'pointer',
                    color: isActive ? '#fff' : 'rgba(255,255,255,.65)',
                    background: isActive ? 'rgba(255,255,255,.18)' : 'transparent',
                    fontWeight: isActive ? 500 : 400,
                    fontSize: 13,
                    transition: 'all .15s',
                  }}
                >
                  <span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>{icon}</span>
                  <span style={{ flex: 1 }}>{text}</span>
                  {badge && (
                    <span style={{
                      background: badgeColor === 'amber' ? 'var(--accent)' : 'var(--danger)',
                      color: '#fff', fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 20,
                    }}>
                      {badge}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* User */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600, color: '#fff',
            background: 'rgba(255,255,255,.2)', flexShrink: 0,
          }}>
            {user.initials}
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{user.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.45)' }}>{userRole}</div>
          </div>
        </div>
      </div>
    </nav>
  )
}

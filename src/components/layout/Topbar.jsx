export default function Topbar({ title, sub = 'Thursday, 7 May 2026', children }) {
  return (
    <header style={{
      height: 'var(--topbar-h)',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 14,

      position: 'fixed',
      top: 0,
      left: 'var(--sidebar-w)',
      right: 0,

      zIndex: 1000,
    }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-.01em' }}>
          {title}
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
          {sub}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {children}
    </header>
  )
}
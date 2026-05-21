import { MenuIcon } from '@/components/ui/Icons'

export default function Topbar({ title, sub, collapsed, onToggleSidebar, children }) {
  // Generate dynamic date string
  const dateStr = sub || new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header style={{
      height: 'var(--topbar-h)',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1.5px solid rgba(0, 0, 0, 0.06)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 14,

      position: 'fixed',
      top: 0,
      left: 'var(--sidebar-w)',
      right: 0,

      zIndex: 1000,
      transition: 'left .2s ease-in-out',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.015)'
    }}>
      {/* Toggle button */}
      <button
        onClick={onToggleSidebar}
        style={{
          background: 'none',
          border: 'none',
          padding: 6,
          cursor: 'pointer',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--theme-color, var(--brand))',
          transition: 'background .15s',
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'none'}
        title="Toggle Navigation Menu"
      >
        <MenuIcon size={20} />
      </button>

      <div>
        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--theme-color, var(--brand))' }}>
          {title}
        </div>

        <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>
          {dateStr}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {children}
    </header>
  )
}
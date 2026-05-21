const BADGE_STYLES = {
  active:   { bg: 'var(--brand-light)',  color: 'var(--brand)' },
  pending:  { bg: 'var(--accent-light)', color: 'var(--accent)' },
  inactive: { bg: 'var(--surface-3)',    color: 'var(--text-3)' },
  alert:    { bg: 'var(--danger-light)', color: 'var(--danger)' },
  info:     { bg: 'var(--info-light)',   color: 'var(--info)' },
  purple:   { bg: 'var(--purple-light)', color: 'var(--purple)' },
}

export default function Badge({ type = 'active', children, style = {} }) {
  const s = BADGE_STYLES[type] ?? BADGE_STYLES.inactive
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        padding: '3px 8px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        background: s.bg,
        color: s.color,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

// Render a premium colored badge with SVG icon for category tags
export function CategoryBadge({ cat }) {
  const key = String(cat || '').trim();
  let match = null;

  if (key.includes('🚗') || key.toLowerCase().includes('vehicle')) {
    match = {
      label: 'Vehicle Safety',
      bg: 'rgba(13, 92, 165, 0.12)',
      color: '#0D5CA5',
      svg: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    }
  } else if (key.includes('👴') || key.toLowerCase().includes('senior')) {
    match = {
      label: 'Senior Care',
      bg: 'rgba(108, 74, 183, 0.12)',
      color: '#6C4AB7',
      svg: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 11 11 13 15 9" />
        </svg>
      )
    }
  } else if (key.includes('👶') || key.toLowerCase().includes('kid')) {
    match = {
      label: 'Kids Safety',
      bg: 'rgba(30, 170, 79, 0.12)',
      color: '#1EAA4F',
      svg: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      )
    }
  } else if (key.includes('🐶') || key.toLowerCase().includes('pet')) {
    match = {
      label: 'Pet Guard',
      bg: 'rgba(242, 122, 24, 0.12)',
      color: '#F27A18',
      svg: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 5c-1.7 0-3 1.3-3 3 0 .6.2 1.1.5 1.5C9.2 9.8 9 10.4 9 11c0 1.7 1.3 3 3 3s3-1.3 3-3c0-.6-.2-1.2-.5-1.5.3-.4.5-.9.5-1.5 0-1.7-1.3-3-3-3z" />
          <path d="M19 14c1.7 0 3-1.3 3-3 0-.6-.2-1.1-.5-1.5.3-.4.5-.9.5-1.5 0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .6.2 1.2.5 1.5-.3.4-.5.9-.5 1.5 0 1.7 1.3 3 3 3z" />
        </svg>
      )
    }
  } else if (key.includes('🧳') || key.toLowerCase().includes('luggage') || key.toLowerCase().includes('bag')) {
    match = {
      label: 'Luggage Tag',
      bg: 'rgba(116, 125, 140, 0.15)',
      color: '#747d8c',
      svg: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <rect x="3" y="6" width="18" height="14" rx="2" ry="2" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      )
    }
  }

  if (!match) {
    return <span style={{ fontSize: 13, fontWeight: 500 }}>{cat}</span>;
  }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      background: match.bg,
      color: match.color,
      whiteSpace: 'nowrap'
    }}>
      {match.svg}
      <span>{match.label}</span>
    </span>
  )
}

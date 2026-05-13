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

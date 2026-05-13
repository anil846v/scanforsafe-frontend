const ACCENT_COLORS = {
  green:  'var(--brand-mid)',
  amber:  'var(--accent)',
  red:    'var(--danger)',
  blue:   'var(--info)',
  purple: 'var(--purple)',
}

export default function StatCard({ icon, label, value, delta, deltaType = 'up', color = 'green' }) {
  const accentColor = ACCENT_COLORS[color] ?? ACCENT_COLORS.green
  const deltaColor =
    deltaType === 'up'   ? 'var(--brand-mid)' :
    deltaType === 'down' ? 'var(--danger)'     :
                           'var(--text-3)'

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 18px',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow .15s, transform .15s',
      }}
    >
      {/* colour bar */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 3,
          background: accentColor,
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}
      />
      <span style={{ fontSize: 20, marginBottom: 8, display: 'block' }}>{icon}</span>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1, marginBottom: 5 }}>{value}</div>
      <div style={{ fontSize: 12, color: deltaColor }}>{delta}</div>
    </div>
  )
}

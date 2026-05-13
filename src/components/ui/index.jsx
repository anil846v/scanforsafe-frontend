// ── Card ──────────────────────────────────────────────────────────────────
export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden',
      marginBottom: 14,
      ...style,
    }}>
      {children}
    </div>
  )
}

export function CardHeader({ title, sub, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px', borderBottom: '1px solid var(--border)',
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{sub}</div>}
      </div>
      {action}
    </div>
  )
}

export function CardBody({ children, style = {} }) {
  return <div style={{ padding: 18, ...style }}>{children}</div>
}

// ── PageHeader ────────────────────────────────────────────────────────────
export function PageHeader({ title, sub, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
      <div>
        <h2 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.02em' }}>{title}</h2>
        {sub && <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{sub}</p>}
      </div>
      {action}
    </div>
  )
}

// ── AlertBanner ───────────────────────────────────────────────────────────
const ALERT_STYLES = {
  danger:  { bg: 'var(--danger-light)',  border: 'rgba(192,57,43,.2)',    color: 'var(--danger)' },
  warn:    { bg: 'var(--accent-light)',  border: 'rgba(186,117,23,.2)',   color: 'var(--accent)' },
  info:    { bg: 'var(--info-light)',    border: 'rgba(24,95,165,.2)',    color: 'var(--info)' },
  success: { bg: 'var(--brand-light)',   border: 'rgba(29,158,117,.2)',   color: 'var(--brand)' },
}
export function AlertBanner({ type = 'info', icon, text, action, onAction }) {
  const s = ALERT_STYLES[type] ?? ALERT_STYLES.info
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 14px', borderRadius: 'var(--radius)',
      marginBottom: 14,
      background: s.bg, border: `1px solid ${s.border}`,
    }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: s.color }}>{text}</span>
      {action && (
        <span
          style={{ fontSize: 12, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', color: s.color, whiteSpace: 'nowrap' }}
          onClick={onAction}
        >
          {action}
        </span>
      )}
    </div>
  )
}

// ── ActivityItem ──────────────────────────────────────────────────────────
export function ActivityItem({ dot, text, ts }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '11px 18px', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', marginTop: 5, flexShrink: 0, background: dot }} />
      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: text }} />
      <div style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap', marginTop: 3 }}>{ts}</div>
    </div>
  )
}

// ── Avatar ────────────────────────────────────────────────────────────────
export function Avatar({ initials, bg = '#E1F5EE', col = '#0F6E56', size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 600,
      background: bg, color: col, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

// ── Mono ──────────────────────────────────────────────────────────────────
export function Mono({ children }) {
  return (
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-3)' }}>
      {children}
    </span>
  )
}

// ── ProgressRow ───────────────────────────────────────────────────────────
export function ProgressRow({ label, pct, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0' }}>
      <span style={{ fontSize: 12, color: 'var(--text-1)', width: 90, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, background: 'var(--surface-2)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 4, background: color, width: `${pct}%` }} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: "'DM Mono', monospace", width: 32, textAlign: 'right' }}>
        {pct}%
      </span>
    </div>
  )
}

// ── Form primitives ───────────────────────────────────────────────────────
export function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)', marginBottom: 4, display: 'block' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '8px 12px', borderRadius: 8,
  border: '1px solid var(--border-md)',
  background: 'var(--surface)', color: 'var(--text-1)',
  fontSize: 13, outline: 'none',
  fontFamily: "'DM Sans', sans-serif",
}

export function FormInput({ style = {}, ...props }) {
  return <input style={{ ...inputStyle, ...style }} {...props} />
}

export function FormSelect({ options = [], style = {}, ...props }) {
  return (
    <select style={{ ...inputStyle, cursor: 'pointer', ...style }} {...props}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  )
}

export const TAG_OPTIONS = ['🚗 Vehicle safety', '👴 Senior care', '👶 Kids safety', '🐶 Pet', '🧳 Luggage']

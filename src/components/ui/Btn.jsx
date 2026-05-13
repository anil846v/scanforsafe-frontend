const VARIANTS = {
  default: { background: 'var(--surface)',  color: 'var(--text-1)', borderColor: 'var(--border-md)' },
  primary: { background: 'var(--brand)',    color: '#fff',          borderColor: 'var(--brand)' },
  danger:  { background: 'var(--danger)',   color: '#fff',          borderColor: 'var(--danger)' },
}
const SIZES = {
  md: { padding: '8px 14px', fontSize: 13 },
  sm: { padding: '5px 11px', fontSize: 12 },
  xs: { padding: '3px 8px',  fontSize: 11, borderRadius: 6 },
}

export default function Btn({ children, variant = 'default', size = 'md', onClick, style = {}, type = 'button' }) {
  const v = VARIANTS[variant] ?? VARIANTS.default
  const s = SIZES[size] ?? SIZES.md
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all .15s',
        border: `1px solid ${v.borderColor}`,
        ...v,
        ...s,
        ...style,
      }}
    >
      {children}
    </button>
  )
}

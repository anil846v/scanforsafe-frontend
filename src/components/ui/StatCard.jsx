import React from 'react'

const ACCENT_COLORS = {
  green:  '#1EAA4F',
  amber:  '#F27A18',
  red:    '#C0392B',
  blue:   '#0D5CA5',
  purple: '#6C4AB7',
}

const BG_COLORS = {
  green:  'rgba(30, 170, 79, 0.1)',
  amber:  'rgba(242, 122, 24, 0.1)',
  red:    'rgba(192, 57, 43, 0.1)',
  blue:   'rgba(13, 92, 165, 0.1)',
  purple: 'rgba(108, 74, 183, 0.1)',
}

const SVG_ICON = (path, color) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    {path}
  </svg>
)

const getSvgForEmoji = (emoji, color) => {
  switch(emoji) {
    case '🏷️': 
      return SVG_ICON(
        <>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </>,
        color
      );
    case '🤝': 
      return SVG_ICON(
        <>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>,
        color
      );
    case '🏢': 
      return SVG_ICON(
        <>
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="9" y1="22" x2="9" y2="16" />
          <line x1="15" y1="22" x2="15" y2="16" />
          <line x1="9" y1="16" x2="15" y2="16" />
          <path d="M8 6h.01M16 6h.01M8 11h.01M16 11h.01" />
        </>,
        color
      );
    case '📈': 
      return SVG_ICON(
        <>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </>,
        color
      );
    case '📦': 
      return SVG_ICON(
        <>
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
          <polygon points="12 22.08 12 12 3 7.44 3 17.52 12 22.08" />
          <polygon points="12 22.08 12 12 21 7.44 21 17.52 12 22.08" />
          <polygon points="12 12 3 7.44 12 2.88 21 7.44 12 12" />
        </>,
        color
      );
    case '✅': 
      return SVG_ICON(
        <>
          <polyline points="20 6 9 17 4 12" />
        </>,
        color
      );
    case '📥': 
      return SVG_ICON(
        <>
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </>,
        color
      );
    case '💰': 
      return SVG_ICON(
        <>
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </>,
        color
      );
    case '👤': 
      return SVG_ICON(
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>,
        color
      );
    case '🚨': 
      return SVG_ICON(
        <>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </>,
        color
      );
    case '🔲': 
      return SVG_ICON(
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <rect x="7" y="7" width="3" height="3" />
          <rect x="14" y="7" width="3" height="3" />
          <rect x="7" y="14" width="3" height="3" />
          <path d="M14 14h3v3h-3z" />
        </>,
        color
      );
    case '🏪': 
      return SVG_ICON(
        <>
          <path d="M20 20H4" />
          <path d="M20 12V4H4v8" />
          <path d="M12 4v8" />
          <path d="M3 12h18" />
          <path d="M6 16h2v4H6z" />
          <path d="M16 16h2v4h-2z" />
        </>,
        color
      );
    case '⚠️': 
      return SVG_ICON(
        <>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </>,
        color
      );
    default:
      return SVG_ICON(
        <circle cx="12" cy="12" r="10" />,
        color
      );
  }
}

export default function StatCard({ icon, label, value, delta, deltaType = 'up', color = 'green', onClick }) {
  const accentColor = ACCENT_COLORS[color] ?? ACCENT_COLORS.green
  const bgLightColor = BG_COLORS[color] ?? BG_COLORS.green
  const deltaColor =
    deltaType === 'up'   ? '#1EAA4F' :
    deltaType === 'down' ? '#C0392B' :
                           'var(--text-3)'

  const svgIcon = getSvgForEmoji(icon, accentColor);

  return (
    <div
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 0.9) 100%)',
        border: '1px solid rgba(0,0,0,0.03)',
        borderTop: '1.5px solid rgba(255,255,255,1)',
        borderLeft: '1.5px solid rgba(255,255,255,1)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '4px 8px 24px rgba(0, 0, 0, 0.04), inset -2px -2px 8px rgba(0,0,0,0.02), inset 2px 2px 8px rgba(255,255,255,1)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '8px 16px 32px rgba(0, 0, 0, 0.08), inset -1px -1px 4px rgba(0,0,0,0.01), inset 2px 2px 8px rgba(255,255,255,1)';
        e.currentTarget.style.borderColor = accentColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '4px 8px 24px rgba(0, 0, 0, 0.04), inset -2px -2px 8px rgba(0,0,0,0.02), inset 2px 2px 8px rgba(255,255,255,1)';
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.03)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>{label}</div>
          <div style={{ fontSize: '26px', fontWeight: '850', letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--text-1)' }}>{value}</div>
        </div>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: bgLightColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor,
          flexShrink: 0
        }}>
          {svgIcon}
        </div>
      </div>
      <div style={{ fontSize: '12px', color: deltaColor, fontWeight: '600' }}>
        {delta}
      </div>
    </div>
  )
}

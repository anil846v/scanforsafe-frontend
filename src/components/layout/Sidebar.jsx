import { useLocation, useNavigate } from 'react-router-dom'
import { getSidebarIcon } from '@/components/ui/Icons'
import logoImg from '@/assets/logo.png'

export default function Sidebar({ bg, logoIcon, logoName, logoSub, navGroups, user, userRole, collapsed }) {
  const location = useLocation()
  const navigate = useNavigate()

  const getIconColor = (menuText, active) => {
    if (active) return '#ffffff';
    switch (menuText) {
      case 'Dashboard':
      case 'My dashboard':
        return '#3498db'; // Soft blue
      case 'QR Management':
        return '#2ecc71'; // Vibrant green
      case 'Customers':
      case 'My customers':
      case 'Onboard customer':
        return '#9b59b6'; // Purple
      case 'Retailers':
      case 'Vendors':
        return '#e67e22'; // Orange
      case 'Marketing Team':
        return '#1abc9c'; // Turquoise
      case 'Emergencies':
      case 'Alert history':
        return '#e74c3c'; // Coral Red
      case 'Missing Vehicles':
      case 'Report missing vehicle':
        return '#f39c12'; // Amber
      case 'Commissions':
      case 'My commissions':
      case 'Commissions & payouts':
      case 'My earnings':
        return '#2ecc71'; // Green
      case 'Reports':
        return '#f1c40f'; // Yellow
      case 'Inventory':
      case 'Request restock':
        return '#f39c12'; // Dark Amber
      case 'Sales log':
      case 'My sales':
        return '#a4b0be'; // Light Slate
      case 'Activate tag':
      case 'My tags':
        return '#2ecc71'; // Lime Green
      case 'Emergency contacts':
        return '#e84393'; // Pink
      case 'My profile':
        return '#00cec9'; // Mint
      case 'Buy tags':
        return '#ff7675'; // Coral
      default:
        return 'rgba(255,255,255,.8)';
    }
  };

  return (
    <nav
      className="sidebar-nav-container"
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
        overflowX: 'hidden',
        transition: 'width .2s ease-in-out',
        borderRight: '1px solid rgba(0,0,0,.08)',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none' /* IE/Edge */
      }}
    >
      <style>{`
        .sidebar-nav-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Logo */}
      <div style={{ 
        padding: collapsed ? '10px 0' : '15px 18px', 
        borderBottom: '1px solid rgba(255,255,255,.08)',
        display: 'flex',
        justifyContent: collapsed ? 'center' : 'flex-start',
        alignItems: 'center',
        height: 'var(--topbar-h)',
        boxSizing: 'border-box'
      }}>
        {collapsed ? (
          <img src={logoImg} alt="Logo" style={{ width: 38, height: 38, objectFit: 'contain' }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={logoImg} alt="Logo" style={{ width: 38, height: 38, objectFit: 'contain' }} />
            <div style={{ whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', lineHeight: 1.2 }}>ScanForSafe</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,.5)', letterSpacing: '.05em', textTransform: 'uppercase', fontWeight: 600 }}>SECURE · SCAN · PROTECT</div>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: collapsed ? '10px 6px' : '10px' }}>
        {navGroups.map(({ label, items }) => (
          <div key={label} style={{ marginBottom: 12 }}>
            {!collapsed ? (
              <div style={{ 
                fontSize: 10, 
                fontWeight: 700, 
                letterSpacing: '.1em', 
                textTransform: 'uppercase', 
                color: 'rgba(255,255,255,.4)', 
                padding: '12px 10px 5px',
                whiteSpace: 'nowrap'
              }}>
                {label}
              </div>
            ) : (
              <div style={{ 
                height: 1, 
                background: 'rgba(255,255,255,0.08)', 
                margin: '12px 6px 6px' 
              }} />
            )}
            {items.map(({ icon, text, badge, badgeColor, path }) => {
              const isActive = location.pathname === path
              const iconColor = getIconColor(text, isActive)
              const svgIcon = getSidebarIcon(text, iconColor) || <span style={{ fontSize: 15, color: iconColor }}>{icon}</span>;

              return (
                <div
                  key={path}
                  onClick={() => navigate(path)}
                  title={collapsed ? text : undefined}
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    gap: collapsed ? 0 : 10,
                    padding: collapsed ? '10px 0' : '9px 10px', 
                    borderRadius: 8, 
                    marginBottom: 4,
                    cursor: 'pointer',
                    color: isActive ? '#fff' : 'rgba(255,255,255,.7)',
                    background: isActive ? 'rgba(255,255,255,.18)' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 13,
                    transition: 'all .15s ease-in-out',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,.06)';
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{ 
                    fontSize: collapsed ? 18 : 16, 
                    width: collapsed ? 'auto' : 20, 
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {svgIcon}
                  </span>
                  
                  {!collapsed && (
                    <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{text}</span>
                  )}

                  {badge && (
                    collapsed ? (
                      <span style={{
                        position: 'absolute',
                        top: 6,
                        right: 12,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: badgeColor === 'amber' ? 'var(--accent)' : 'var(--danger)',
                        border: '1px solid ' + bg
                      }} />
                    ) : (
                      <span style={{
                        background: badgeColor === 'amber' ? 'var(--accent)' : 'var(--danger)',
                        color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 20,
                        marginLeft: 6
                      }}>
                        {badge}
                      </span>
                    )
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* User info */}
      <div style={{ 
        padding: collapsed ? '12px 0' : '12px 10px', 
        borderTop: '1px solid rgba(255,255,255,.1)',
        display: 'flex',
        justifyContent: collapsed ? 'center' : 'flex-start'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: collapsed ? 0 : 9, 
          padding: collapsed ? '0' : '8px 10px', 
          borderRadius: 8,
          width: '100%'
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#fff',
            background: 'linear-gradient(135deg, rgba(255,255,255,.25) 0%, rgba(255,255,255,.1) 100%)', 
            flexShrink: 0,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}
            onClick={() => {
              const baseRole = location.pathname.split('/')[1];
              if (baseRole) {
                navigate(`/${baseRole}/profile`);
              }
            }}
            title="View Profile"
          >
            {user.initials}
          </div>
          {!collapsed && (
            <div style={{ whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{user.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.55)', fontWeight: 500 }}>{userRole}</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

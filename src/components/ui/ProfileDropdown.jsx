import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown({ onLogout, themeColor = 'var(--brand)' }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const initials = currentUser.initials || 'US';
  const name = currentUser.name || 'User';
  const role = currentUser.role || 'user';
  const details = currentUser.details || 'System User';

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setOpen(false);
    navigate(`/${role}/profile`);
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Avatar Trigger */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: themeColor,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          transform: open ? 'scale(0.95)' : 'scale(1)',
          userSelect: 'none'
        }}
      >
        {initials}
      </div>

      {/* Dropdown Card */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 50,
          right: 0,
          width: 260,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          borderRadius: 14,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
          overflow: 'hidden',
          zIndex: 9999,
          animation: 'popIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: 'top right'
        }}>
          <style>{`
            @keyframes popIn {
              0% { opacity: 0; transform: scale(0.95) translateY(-10px); }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            .profile-menu-item {
              padding: 12px 16px;
              display: flex;
              alignItems: center;
              gap: 12px;
              cursor: pointer;
              transition: background 0.2s;
              font-size: 13.5px;
              font-weight: 500;
              color: var(--text-2);
            }
            .profile-menu-item:hover {
              background: var(--surface-2);
              color: var(--theme-color, var(--brand));
            }
          `}</style>
          
          <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--surface-3)' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: themeColor, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.3px' }}>{name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500 }}>{details}</div>
            </div>
          </div>

          <div style={{ padding: '6px 0' }}>
            <div className="profile-menu-item" onClick={handleProfileClick}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              My Profile
            </div>
            <div className="profile-menu-item" onClick={() => setOpen(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Settings & Preferences
            </div>
          </div>

          <div style={{ padding: '6px 0', borderTop: '1px solid var(--surface-3)' }}>
            <div 
              className="profile-menu-item" 
              onClick={() => { setOpen(false); onLogout && onLogout(); }}
              style={{ color: 'var(--danger)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

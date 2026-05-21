import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell({ sidebarProps, topbarTitle, topbarActions, children }) {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  const toggleSidebar = () => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar_collapsed', String(next));
      return next;
    });
  };

  const sidebarW = collapsed ? '72px' : '240px';

  return (
    <div style={{ display: 'flex', '--sidebar-w': sidebarW, '--theme-color': sidebarProps?.bg || 'var(--brand)' }}>
      <Sidebar {...sidebarProps} collapsed={collapsed} />
      <div
        style={{
          marginLeft: sidebarW,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          transition: 'margin-left .2s ease-in-out',
        }}
      >
        <Topbar title={topbarTitle} collapsed={collapsed} onToggleSidebar={toggleSidebar}>
          {topbarActions}
        </Topbar>
        <main
          className="page-enter"
          style={{
            padding: '22px 24px',
            paddingTop: 'calc(var(--topbar-h) + 22px)',
            flex: 1,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}


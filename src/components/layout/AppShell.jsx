import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell({ sidebarProps, topbarTitle, topbarActions, children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar {...sidebarProps} />
      <div style={{ marginLeft: 'var(--sidebar-w)', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Topbar title={topbarTitle}>
          {topbarActions}
        </Topbar>
        <main
          className="page-enter"
          style={{
            padding: '22px 24px',
            paddingTop: 'calc(var(--topbar-h) + 22px)',
            flex: 1,
          }}
        >          {children}
        </main>
      </div>
    </div>
  )
}

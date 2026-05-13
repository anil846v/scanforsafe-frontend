import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import Btn from '@/components/ui/Btn'
import { MktDashboard, MktOnboard, MktLeads, MktSales, MktCommissions, MktTargets } from '@/pages/marketing/MarketingPages'
import { PAGE_TITLES } from '@/data/mockData'

const NAV_GROUPS = [
  { label: 'Overview', items: [
    { icon: '📊', text: 'My dashboard',      path: '/marketing/dashboard' },
    { icon: '➕', text: 'Onboard customer',  path: '/marketing/onboard' },
    { icon: '👥', text: 'My leads',          path: '/marketing/my_leads' },
    { icon: '💳', text: 'My sales',          path: '/marketing/my_sales' },
  ]},
  { label: 'Earnings', items: [
    { icon: '💰', text: 'My commissions', path: '/marketing/commissions_mkt' },
    { icon: '🎯', text: 'My targets',     path: '/marketing/targets' },
  ]},
]

export default function MarketingRole({ onLogout }) {
  const location = useLocation()
  const segment = location.pathname.split('/').pop()
  const title = PAGE_TITLES[segment] ?? 'My dashboard'

  const sidebarProps = {
    bg: '#4A3490',
    logoIcon: '📣', logoName: 'My Portal', logoSub: 'Marketing Executive',
    navGroups: NAV_GROUPS,
    user: { initials: 'PN', name: 'Priya Nair' },
    userRole: 'Dubai · Executive',
  }

  const topbarActions = (
    <>
      <div style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border-md)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15 }}>🔔</div>
      <Btn variant="primary" onClick={() => window.location.assign('/marketing/onboard')}>➕ Onboard customer</Btn>
      <button
        onClick={onLogout}
        style={{
          fontSize: 12,
          color: '#ff6b6b',
          background: 'var(--surface-2)',
          border: '1px solid var(--border-md)',
          borderRadius: 6,
          padding: '6px 12px',
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          transition: 'all .15s',
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#ff6b6b'
          e.target.style.color = '#fff'
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'var(--surface-2)'
          e.target.style.color = '#ff6b6b'
        }}
      >
        Logout
      </button>
    </>
  )

  return (
    <AppShell sidebarProps={sidebarProps} topbarTitle={title} topbarActions={topbarActions}>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"       element={<MktDashboard />} />
        <Route path="onboard"         element={<MktOnboard />} />
        <Route path="my_leads"        element={<MktLeads />} />
        <Route path="my_sales"        element={<MktSales />} />
        <Route path="commissions_mkt" element={<MktCommissions />} />
        <Route path="targets"         element={<MktTargets />} />
      </Routes>
    </AppShell>
  )
}

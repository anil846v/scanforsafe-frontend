import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import Btn from '@/components/ui/Btn'
import { BellIcon } from '@/components/ui/Icons'
import ProfileDropdown from '@/components/ui/ProfileDropdown'
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
  const navigate = useNavigate()
  const segment = location.pathname.split('/').pop()
  const title = PAGE_TITLES[segment] ?? 'My dashboard'

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const initials = currentUser.initials || 'PN'
  const name = currentUser.name || 'Priya Nair'
  const region = currentUser.region || 'Dubai'

  const sidebarProps = {
    bg: '#4A3490',
    logoIcon: '📣', logoName: name, logoSub: 'Marketing Executive',
    navGroups: NAV_GROUPS,
    user: { initials, name },
    userRole: `${region} · Executive`,
  }

  const topbarActions = (
    <>
      <div style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border-md)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <BellIcon size={18} color="var(--theme-color, #4A3490)" />
      </div>
      <Btn variant="primary" onClick={() => navigate('/marketing/onboard')}>➕ Onboard customer</Btn>
      <ProfileDropdown onLogout={onLogout} themeColor="#4A3490" />
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

import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import Btn from '@/components/ui/Btn'
import { BellIcon } from '@/components/ui/Icons'
import ProfileDropdown from '@/components/ui/ProfileDropdown'
import { RetailerDashboard, RetailerInventory, RetailerActivate, RetailerSales, RetailerCustomers, RetailerEarnings, RetailerRestock } from '@/pages/retailer/RetailerPages'
import { PAGE_TITLES } from '@/data/mockData'

const NAV_GROUPS = [
  { label: 'My Store', items: [
    { icon: '📊', text: 'Dashboard',    path: '/retailer/dashboard' },
    { icon: '📦', text: 'Inventory',    path: '/retailer/inventory', badge: 'Low', badgeColor: 'amber' },
    { icon: '💳', text: 'Sales log',    path: '/retailer/sales' },
    { icon: '🔲', text: 'Activate tag', path: '/retailer/activate' },
  ]},
  { label: 'Customers', items: [
    { icon: '👤', text: 'My customers', path: '/retailer/my_customers' },
  ]},
  { label: 'Account', items: [
    { icon: '💰', text: 'Earnings',       path: '/retailer/earnings' },
    { icon: '📦', text: 'Restock tags',   path: '/retailer/restock' },
  ]},
]

export default function RetailerRole({ onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const segment = location.pathname.split('/').pop()
  const title = PAGE_TITLES[segment] ?? 'Dashboard'

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const initials = currentUser.initials || 'SZ'
  const name = currentUser.name || 'SafeZone LLC'
  const city = currentUser.city || 'Dubai'

  const sidebarProps = {
    bg: '#7A5A1A',
    logoIcon: '🏪', logoName: name, logoSub: 'Retailer Portal',
    navGroups: NAV_GROUPS,
    user: { initials, name },
    userRole: `${city} · Retailer`,
  }

  const topbarActions = (
    <>
      <div style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border-md)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <BellIcon size={18} color="var(--theme-color, #7A5A1A)" />
      </div>
      <Btn variant="primary" onClick={() => navigate('/retailer/activate')}>🔲 Activate tag</Btn>
      <ProfileDropdown onLogout={onLogout} themeColor="#7A5A1A" />
    </>
  )

  return (
    <AppShell sidebarProps={sidebarProps} topbarTitle={title} topbarActions={topbarActions}>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"    element={<RetailerDashboard />} />
        <Route path="inventory"    element={<RetailerInventory />} />
        <Route path="activate"     element={<RetailerActivate />} />
        <Route path="sales"        element={<RetailerSales />} />
        <Route path="my_customers" element={<RetailerCustomers />} />
        <Route path="earnings"     element={<RetailerEarnings />} />
        <Route path="restock"      element={<RetailerRestock />} />
      </Routes>
    </AppShell>
  )
}

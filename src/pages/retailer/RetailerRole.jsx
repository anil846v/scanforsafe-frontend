import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import Btn from '@/components/ui/Btn'
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
  { label: 'Finance', items: [
    { icon: '💰', text: 'My earnings',      path: '/retailer/earnings' },
    { icon: '🔄', text: 'Request restock',  path: '/retailer/restock' },
  ]},
]

export default function RetailerRole({ onLogout }) {
  const location = useLocation()
  const segment = location.pathname.split('/').pop()
  const title = PAGE_TITLES[segment] ?? 'Dashboard'

  const sidebarProps = {
    bg: '#7A5A1A',
    logoIcon: '🏪', logoName: 'SafeZone LLC', logoSub: 'Retailer Portal',
    navGroups: NAV_GROUPS,
    user: { initials: 'SZ', name: 'SafeZone LLC' },
    userRole: 'Dubai · Retailer',
  }

  const topbarActions = (
    <>
      <div style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border-md)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15 }}>🔔</div>
      <Btn variant="primary" onClick={() => window.location.assign('/retailer/activate')}>🔲 Activate tag</Btn>
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

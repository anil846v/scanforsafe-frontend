import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import Btn from '@/components/ui/Btn'
import { QRBatchModal } from '@/components/ui/Modals'
import { BellIcon, SearchIcon } from '@/components/ui/Icons'
import { AdminDashboard, AdminQR, AdminCustomers, AdminRetailers } from '@/pages/admin/AdminPages1'
import { AdminEmergencies, AdminMissing, AdminVendors, AdminCommissions, AdminMarketing, AdminReports } from '@/pages/admin/AdminPages2'
import { PAGE_TITLES } from '@/data/mockData'
import ProfileDropdown from '@/components/ui/ProfileDropdown'

const NAV_GROUPS = [
  { label: 'Overview', items: [
    { icon: '📊', text: 'Dashboard',     path: '/admin/dashboard' },
    { icon: '🔲', text: 'QR Management', path: '/admin/qr', badge: '4', badgeColor: 'amber' },
  ]},
  { label: 'Users', items: [
    { icon: '👤', text: 'Customers',      path: '/admin/customers' },
    { icon: '🏪', text: 'Retailers',      path: '/admin/retailers' },
    { icon: '📣', text: 'Marketing Team', path: '/admin/marketing_admin' },
  ]},
  { label: 'Operations', items: [
    { icon: '🚨', text: 'Emergencies',     path: '/admin/emergencies', badge: '2' },
    { icon: '🔍', text: 'Missing Vehicles', path: '/admin/missing' },
    { icon: '🖨️', text: 'Vendors',         path: '/admin/vendors' },
  ]},
  { label: 'Finance', items: [
    { icon: '💰', text: 'Commissions', path: '/admin/commissions' },
    { icon: '📈', text: 'Reports',     path: '/admin/reports' },
  ]},
]

export default function AdminRole({ onLogout }) {
  const [qrOpen, setQrOpen] = useState(false)
  const location = useLocation()
  const segment = location.pathname.split('/').pop()
  const title = PAGE_TITLES[segment] ?? 'Dashboard'

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const initials = currentUser.initials || 'RA'
  const name = currentUser.name || 'Rajesh K.'

  const sidebarProps = {
    bg: 'var(--brand)',
    logoIcon: '🛡️', logoName: 'Scan for Safe', logoSub: 'Admin Console',
    navGroups: NAV_GROUPS,
    user: { initials, name },
    userRole: 'Super Admin',
  }

  const topbarActions = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-2)', border: '1px solid var(--border-md)', borderRadius: 8, padding: '7px 12px', width: 220, fontSize: 13, color: 'var(--text-3)' }}>
        <SearchIcon size={16} color="var(--theme-color, var(--brand))" />
        <span style={{ color: 'var(--text-3)' }}>Search users, tokens…</span>
      </div>
      <div style={{ position: 'relative', width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border-md)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <BellIcon size={18} color="var(--theme-color, var(--brand))" />
        <div style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7, borderRadius: '50%', background: 'var(--danger)', border: '1.5px solid white' }} />
      </div>
      <Btn variant="primary" onClick={() => setQrOpen(true)}>＋ New QR Batch</Btn>
      <ProfileDropdown onLogout={onLogout} themeColor="var(--brand)" />
    </>
  )

  return (
    <>
      <AppShell sidebarProps={sidebarProps} topbarTitle={title} topbarActions={topbarActions}>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard"      element={<AdminDashboard openQRModal={() => setQrOpen(true)} />} />
          <Route path="qr"             element={<AdminQR openQRModal={() => setQrOpen(true)} />} />
          <Route path="customers"      element={<AdminCustomers />} />
          <Route path="retailers"      element={<AdminRetailers />} />
          <Route path="marketing_admin" element={<AdminMarketing />} />
          <Route path="emergencies"    element={<AdminEmergencies />} />
          <Route path="missing"        element={<AdminMissing />} />
          <Route path="vendors"        element={<AdminVendors />} />
          <Route path="commissions"    element={<AdminCommissions />} />
          <Route path="reports"        element={<AdminReports />} />
        </Routes>
      </AppShell>
      <QRBatchModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  )
}

import { useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import Btn from '@/components/ui/Btn'
import { BellIcon } from '@/components/ui/Icons'
import ProfileDropdown from '@/components/ui/ProfileDropdown'
import { EmergencyModal } from '@/components/ui/Modals'
import { CustomerDashboard, CustomerTags, CustomerContacts, CustomerProfile, CustomerAlertHistory, CustomerMissingReport, CustomerBuyMore } from '@/pages/customer/CustomerPages'
import { PAGE_TITLES } from '@/data/mockData'

const NAV_GROUPS = [
  { label: 'My account', items: [
    { icon: '🏠', text: 'Home',               path: '/customer/home' },
    { icon: '🔲', text: 'My tags',            path: '/customer/my_tags' },
    { icon: '📞', text: 'Emergency contacts', path: '/customer/contacts' },
    { icon: '✏️', text: 'My profile',         path: '/customer/profile' },
  ]},
  { label: 'Safety', items: [
    { icon: '🚨', text: 'Alert history',        path: '/customer/emergency_history' },
    { icon: '🔍', text: 'Report missing vehicle',path: '/customer/missing_report' },
  ]},
  { label: 'Account', items: [
    { icon: '➕', text: 'Buy more tags', path: '/customer/buy_more' },
  ]},
]

export default function CustomerRole({ onLogout }) {
  const [emOpen, setEmOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const segment = location.pathname.split('/').pop()
  const title = PAGE_TITLES[segment] ?? 'Home'

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const initials = currentUser.initials || 'AH'
  const name = currentUser.name || 'Ahmed Al Farsi'
  const phone = currentUser.phone || '+971 50 123 4567'

  const sidebarProps = {
    bg: '#0C447C',
    logoIcon: '👤', logoName: name, logoSub: 'Customer Portal',
    navGroups: NAV_GROUPS,
    user: { initials, name },
    userRole: `${phone} · Customer`,
  }

  const topbarActions = (
    <>
      <div style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border-md)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <BellIcon size={18} color="var(--theme-color, #0C447C)" />
      </div>
      <Btn variant="danger" onClick={() => setEmOpen(true)}>🚨 Report emergency</Btn>
      <ProfileDropdown onLogout={onLogout} themeColor="#0C447C" />
    </>
  )

  return (
    <>
      <AppShell sidebarProps={sidebarProps} topbarTitle={title} topbarActions={topbarActions}>
        <Routes>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home"             element={<CustomerDashboard openEmergency={() => setEmOpen(true)} />} />
          <Route path="my_tags"          element={<CustomerTags />} />
          <Route path="contacts"         element={<CustomerContacts />} />
          <Route path="profile"          element={<CustomerProfile />} />
          <Route path="emergency_history" element={<CustomerAlertHistory />} />
          <Route path="missing_report"   element={<CustomerMissingReport />} />
          <Route path="buy_more"         element={<CustomerBuyMore />} />
        </Routes>
      </AppShell>
      <EmergencyModal open={emOpen} onClose={() => setEmOpen(false)} />
    </>
  )
}

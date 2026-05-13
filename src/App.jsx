import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Loginpage from '@/pages/Loginpage'
import AdminRole     from '@/pages/admin/AdminRole'
import RetailerRole  from '@/pages/retailer/RetailerRole'
import MarketingRole from '@/pages/marketing/MarketingRole'
import CustomerRole  from '@/pages/customer/CustomerRole'

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
    }
    checkAuth()

    // Listen for storage changes (for logout in other tabs)
    const handleStorageChange = () => {
      checkAuth()
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        navigate('/login')
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userRole')
    setIsLoggedIn(false)
    navigate('/login')
  }

  // If on login page, don't show RoleSwitcher
  if (location.pathname === '/login') {
    return (
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<Loginpage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/admin/*"    element={<ProtectedRoute><AdminRole onLogout={handleLogout} /></ProtectedRoute>} />
      <Route path="/retailer/*" element={<ProtectedRoute><RetailerRole onLogout={handleLogout} /></ProtectedRoute>} />
      <Route path="/marketing/*" element={<ProtectedRoute><MarketingRole onLogout={handleLogout} /></ProtectedRoute>} />
      <Route path="/customer/*" element={<ProtectedRoute><CustomerRole onLogout={handleLogout} /></ProtectedRoute>} />
      <Route path="*"           element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

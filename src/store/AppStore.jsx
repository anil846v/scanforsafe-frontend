import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  QR_BATCHES, ADMIN_CUSTOMERS, ADMIN_RETAILERS, ADMIN_MARKETING_EXECS,
  ADMIN_VENDORS, ADMIN_COMMISSIONS, ADMIN_EMERGENCIES, ADMIN_MISSING,
  RETAILER_EARNINGS, MKT_COMMISSIONS
} from '@/data/mockData'

const AppContext = createContext(null)

function load(key, fallback) {
  try {
    const v = sessionStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}

function save(key, value) {
  try { sessionStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function AppProvider({ children }) {
  const [customers,       setCustomers]       = useState(() => load('sfs_customers',       ADMIN_CUSTOMERS))
  const [retailers,       setRetailers]       = useState(() => load('sfs_retailers',       ADMIN_RETAILERS))
  const [marketingExecs,  setMarketingExecs]  = useState(() => load('sfs_mkt',             ADMIN_MARKETING_EXECS))
  const [vendors,         setVendors]         = useState(() => load('sfs_vendors',         ADMIN_VENDORS))
  const [qrBatches,       setQrBatches]       = useState(() => load('sfs_qr',              QR_BATCHES))
  const [commissions,     setCommissions]     = useState(() => load('sfs_commissions',     ADMIN_COMMISSIONS))
  const [emergencies,     setEmergencies]     = useState(() => load('sfs_emergencies',     ADMIN_EMERGENCIES))
  const [missingVehicles, setMissingVehicles] = useState(() => load('sfs_missing',         ADMIN_MISSING))
  const [retailerEarnings,setRetailerEarnings]= useState(() => load('sfs_ret_earnings',    RETAILER_EARNINGS))
  const [mktCommissions,  setMktCommissions]  = useState(() => load('sfs_mkt_commissions', MKT_COMMISSIONS))

  // Persist on change
  useEffect(() => save('sfs_customers',       customers),       [customers])
  useEffect(() => save('sfs_retailers',       retailers),       [retailers])
  useEffect(() => save('sfs_mkt',             marketingExecs),  [marketingExecs])
  useEffect(() => save('sfs_vendors',         vendors),         [vendors])
  useEffect(() => save('sfs_qr',              qrBatches),       [qrBatches])
  useEffect(() => save('sfs_commissions',     commissions),     [commissions])
  useEffect(() => save('sfs_emergencies',     emergencies),     [emergencies])
  useEffect(() => save('sfs_missing',         missingVehicles), [missingVehicles])
  useEffect(() => save('sfs_ret_earnings',    retailerEarnings),[retailerEarnings])
  useEffect(() => save('sfs_mkt_commissions', mktCommissions),  [mktCommissions])

  // ── Customers ─────────────────────────────────────────────────────────
  const addCustomer = useCallback((c) => setCustomers(prev => [c, ...prev]), [])
  const updateCustomer = useCallback((token, patch) =>
    setCustomers(prev => prev.map(c => c.token === token ? { ...c, ...patch } : c)), [])
  const toggleCustomerStatus = useCallback((token) =>
    setCustomers(prev => prev.map(c =>
      c.token === token ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c)), [])

  // ── Retailers ─────────────────────────────────────────────────────────
  const addRetailer = useCallback((r) => setRetailers(prev => [r, ...prev]), [])
  const updateRetailer = useCallback((name, patch) =>
    setRetailers(prev => prev.map(r => r.name === name ? { ...r, ...patch } : r)), [])
  const toggleRetailerStatus = useCallback((name) =>
    setRetailers(prev => prev.map(r =>
      r.name === name ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r)), [])

  // ── Marketing Execs ───────────────────────────────────────────────────
  const addExec = useCallback((e) => setMarketingExecs(prev => [e, ...prev]), [])
  const updateExec = useCallback((name, patch) =>
    setMarketingExecs(prev => prev.map(e => e.name === name ? { ...e, ...patch } : e)), [])
  const toggleExecStatus = useCallback((name) =>
    setMarketingExecs(prev => prev.map(e =>
      e.name === name ? { ...e, status: e.status === 'active' ? 'inactive' : 'active' } : e)), [])

  // ── Vendors ───────────────────────────────────────────────────────────
  const addVendor = useCallback((v) => setVendors(prev => [v, ...prev]), [])
  const updateVendor = useCallback((name, patch) =>
    setVendors(prev => prev.map(v => v.name === name ? { ...v, ...patch } : v)), [])
  const toggleVendorStatus = useCallback((name) =>
    setVendors(prev => prev.map(v =>
      v.name === name ? { ...v, status: v.status === 'active' ? 'inactive' : 'pending' } : v)), [])

  // ── QR Batches ────────────────────────────────────────────────────────
  const addQrBatch = useCallback((b) => setQrBatches(prev => [b, ...prev]), [])
  const updateQrBatch = useCallback((id, patch) =>
    setQrBatches(prev => prev.map(b => b.id === id ? { ...b, ...patch } : b)), [])

  // ── Commissions ───────────────────────────────────────────────────────
  const processPayouts = useCallback(() =>
    setCommissions(prev => prev.map(c => c.status === 'pending' ? { ...c, status: 'active' } : c)), [])

  // ── Emergencies ───────────────────────────────────────────────────────
  const resolveEmergency = useCallback((token) =>
    setEmergencies(prev => prev.map(e =>
      e.token === token ? { ...e, status: 'inactive', label: 'Resolved' } : e)), [])

  // ── Missing ───────────────────────────────────────────────────────────
  const addMissingVehicle = useCallback((m) => setMissingVehicles(prev => [m, ...prev]), [])
  const updateMissingStatus = useCallback((plate, status, label) =>
    setMissingVehicles(prev => prev.map(m =>
      m.plate === plate ? { ...m, status, label } : m)), [])

  return (
    <AppContext.Provider value={{
      customers, addCustomer, updateCustomer, toggleCustomerStatus,
      retailers, addRetailer, updateRetailer, toggleRetailerStatus,
      marketingExecs, addExec, updateExec, toggleExecStatus,
      vendors, addVendor, updateVendor, toggleVendorStatus,
      qrBatches, addQrBatch, updateQrBatch,
      commissions, processPayouts,
      emergencies, resolveEmergency,
      missingVehicles, addMissingVehicle, updateMissingStatus,
      retailerEarnings,
      mktCommissions,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

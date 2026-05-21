import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '@/components/ui/StatCard'
import Badge, { CategoryBadge } from '@/components/ui/Badge'
import Btn from '@/components/ui/Btn'
import { Card, CardHeader, CardBody, AlertBanner, ActivityItem, Avatar, Mono, ProgressRow, PageHeader, FormInput, FormSelect } from '@/components/ui/index'
import { useDB } from '@/hooks/useDB'
import { toggleStatus, editRecord, generateStickerForOrder, dispatchOrder, updateRegionCharge, validateBarcodeSeries } from '@/data/db'
import { 
  AddCustomerModal, 
  AddRetailerModal, 
  DetailsModal 
} from '@/components/ui/Modals'
import { EditIcon, EyeIcon, TrashIcon } from '@/components/ui/Icons'

// ── ADMIN DASHBOARD ────────────────────────────────────────────────────────
export function AdminDashboard({ openQRModal }) {
  const navigate = useNavigate()
  const db = useDB()
  
  // Calculate dynamic stats
  const totalQR = db.qr_batches.reduce((sum, b) => sum + b.qty, 0) + 12000
  const totalActivated = db.customers.length + 9200
  const activeEmergencies = db.emergencies.filter(e => e.status === 'alert').length
  const totalRevenue = (db.customers.length * 799) + 420000

  // Category counts
  const vehicleCount = db.customers.filter(c => c.tag === '🚗').length + 5835
  const seniorCount = db.customers.filter(c => c.tag === '👴').length + 2648
  const kidsCount = db.customers.filter(c => c.tag === '👶').length + 1818
  const otherCount = db.customers.filter(c => c.tag === '🐶' || c.tag === '🧳').length + 2168

  return (
    <div>
      {activeEmergencies > 0 && (
        <AlertBanner 
          type="danger" 
          icon="🚨" 
          text={`${activeEmergencies} active emergencies requiring attention`} 
          action="View log →" 
          onAction={() => navigate('/admin/emergencies')} 
        />
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🔲" label="QR Issued" value={totalQR.toLocaleString()} delta="↑ 340 this week" color="green" onClick={() => navigate('/admin/qr')} />
        <StatCard icon="✅" label="Activated" value={totalActivated.toLocaleString()} delta={`${((totalActivated / totalQR) * 100).toFixed(1)}% rate`} color="amber" onClick={() => navigate('/admin/customers')} />
        <StatCard icon="🚨" label="Active Alerts" value={String(activeEmergencies)} delta="Real-time monitor" deltaType="neu" color="red" onClick={() => navigate('/admin/emergencies')} />
        <StatCard icon="💰" label="Revenue MTD" value={`₹${(totalRevenue / 100000).toFixed(2)}L`} delta="↑ 18% vs last month" color="blue" onClick={() => navigate('/admin/commissions')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 14 }}>
        <Card>
          <CardHeader title="QR Scans — 14 days" sub="Live traffic index" />
          <CardBody>
            <svg width="100%" height="100" viewBox="0 0 500 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D9E75" stopOpacity=".18" />
                  <stop offset="100%" stopColor="#1D9E75" stopOpacity=".01" />
                </linearGradient>
              </defs>
              <path d="M0,85 C40,78 80,70 120,65 S200,55 240,45 S320,30 380,20 S460,10 500,6" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M0,85 C40,78 80,70 120,65 S200,55 240,45 S320,30 380,20 S460,10 500,6 L500,100 L0,100Z" fill="url(#g1)" />
              <circle cx="500" cy="6" r="4" fill="#1D9E75" />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-3)', marginTop: 6 }}>
              <span>24 Apr</span><span>28 Apr</span><span>2 May</span><span>7 May</span>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="By category" />
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="24" fill="none" stroke="#E1F5EE" strokeWidth="12" />
                <circle cx="36" cy="36" r="24" fill="none" stroke="#1D9E75" strokeWidth="12" strokeDasharray="64 87" strokeDashoffset="-8" />
                <circle cx="36" cy="36" r="24" fill="none" stroke="#BA7517" strokeWidth="12" strokeDasharray="27 124" strokeDashoffset="-72" />
                <circle cx="36" cy="36" r="24" fill="none" stroke="#185FA5" strokeWidth="12" strokeDasharray="16 135" strokeDashoffset="-99" />
                <circle cx="36" cy="36" r="24" fill="none" stroke="#6C4AB7" strokeWidth="12" strokeDasharray="20 131" strokeDashoffset="-115" />
                <text x="36" y="40" textAnchor="middle" fontSize="10" fontWeight="600" fill="#111" fontFamily="DM Sans">{(totalActivated / 1000).toFixed(1)}k</text>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[['#1D9E75', 'Vehicle', vehicleCount], ['#BA7517', 'Senior', seniorCount], ['#185FA5', 'Kids', kidsCount], ['#6C4AB7', 'Pet/Bag', otherCount]].map(([c, l, v]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12 }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: c, flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-2)' }}>{l}</span>
                    <span style={{ fontWeight: 600, marginLeft: 6 }}>{v.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <CardHeader title="Live activity feed" action={<Badge type="active">● Live</Badge>} />
          {db.live_feed.slice(0, 5).map((f, i) => (
            <ActivityItem key={i} dot={f.col} text={f.text} ts={f.ts} />
          ))}
        </Card>
        <Card>
          <CardHeader title="Region breakdown" />
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {[['Dubai', '3,840'], ['Abu Dhabi', '2,210'], ['Sharjah', '1,450'], ['Others', '1,714']].map(([r, v]) => (
                <div key={r} style={{ background: 'var(--surface-2)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{r}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--brand)' }}>{v}</div>
                </div>
              ))}
            </div>
            <ProgressRow label="Vehicle" pct={55} color="var(--brand-mid)" />
            <ProgressRow label="Senior care" pct={22} color="var(--accent)" />
            <ProgressRow label="Kids safety" pct={15} color="var(--info)" />
            <ProgressRow label="Pet/Bag" pct={8} color="var(--purple)" />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

// ── QR MANAGEMENT ──────────────────────────────────────────────────────────
export function AdminQR({ openQRModal }) {
  const db = useDB()
  const [activeTab, setActiveTab] = useState('batches')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [activeDetails, setActiveDetails] = useState(null)
  
  // Modals for online orders
  const [stickerOrder, setStickerOrder] = useState(null)
  const [dispatchOrderObj, setDispatchOrderObj] = useState(null)
  const [courierName, setCourierName] = useState('Delhivery')
  const [awbNumber, setAwbNumber] = useState('')

  // Validation state
  const [scanInput, setScanInput] = useState('')
  const [validationResult, setValidationResult] = useState(null) // { success: boolean, reason?: string, barcode?: string }
  const [showMismatchAlert, setShowMismatchAlert] = useState(false)
  const [mismatchCode, setMismatchCode] = useState('')

  // Region editor state
  const [editingRegionId, setEditingRegionId] = useState(null)
  const [editingCharge, setEditingCharge] = useState('')

  const handleViewDetails = (batch) => {
    const endRange = `SS-${parseInt(batch.id.replace('BTH-', '')) * 1000 + batch.qty}`
    setActiveDetails({
      'Batch ID': batch.id,
      'Tag Category': batch.cat,
      'Quantity': batch.qty,
      'Series Range': `SS-${parseInt(batch.id.replace('BTH-', '')) * 1000 + 1} to ${endRange}`,
      'Manufacturer Vendor': batch.vendor,
      'Assigned Outlet': batch.assign,
      'Current Status': batch.status === 'active' ? 'Active & Dispatched' : 'Pending validation',
      'Created Date': batch.date,
      'Validity Period': '3 months from assignment'
    })
    setDetailsOpen(true)
  }

  // Handle barcode validation
  const handleValidateBarcode = (e) => {
    e.preventDefault()
    if (!scanInput.trim()) return

    const barcode = scanInput.trim().toUpperCase()
    // Call the db function
    const res = validateBarcodeSeries(barcode)
    
    if (res.success) {
      setValidationResult({ success: true, barcode })
      setScanInput('')
      setShowMismatchAlert(false)
      // Auto-hide success after 4s
      setTimeout(() => setValidationResult(null), 4000)
    } else {
      setValidationResult({ success: false, reason: res.reason, barcode })
      setMismatchCode(barcode)
      setShowMismatchAlert(true)
      setScanInput('')
    }
  }

  // Handle generating sticker
  const handleTriggerSticker = (order) => {
    setStickerOrder(order)
  }

  const handleConfirmSticker = (orderId) => {
    // Determine batch details to assign
    const firstActiveBatch = db.qr_batches.find(b => b.status === 'active') || db.qr_batches[0]
    const batchId = firstActiveBatch.id
    const seriesNo = `SS-${Math.floor(10000 + Math.random() * 89999)}`
    const vendorCode = firstActiveBatch.vendor === 'PrintPro Dubai' ? 'VND-701' : 'VND-702'
    
    generateStickerForOrder(orderId, batchId, seriesNo, vendorCode)
    setStickerOrder(null)
  }

  // Handle dispatch
  const handleTriggerDispatch = (order) => {
    setDispatchOrderObj(order)
    setAwbNumber(`AWB${Math.floor(10000000 + Math.random() * 89999999)}`)
  }

  const handleConfirmDispatch = (e) => {
    e.preventDefault()
    if (!awbNumber.trim()) return
    dispatchOrder(dispatchOrderObj.id, courierName, awbNumber)
    setDispatchOrderObj(null)
  }

  const handleMarkDelivered = (orderId) => {
    editRecord('qr_orders', orderId, 'id', { 
      status: 'delivered',
      history: [
        ...db.qr_orders.find(o => o.id === orderId).history,
        { status: 'delivered', ts: new Date().toLocaleString() }
      ]
    })
  }

  // Handle editing region
  const handleStartEditRegion = (region) => {
    setEditingRegionId(region.id)
    setEditingCharge(String(region.charge))
  }

  const handleSaveRegionCharge = (regionId) => {
    updateRegionCharge(regionId, editingCharge)
    setEditingRegionId(null)
  }

  const downloadBulkReport = () => {
    alert("Bulk dispatch report exported successfully as CSV! (Demo mode)")
  }

  const totalGenerated = db.qr_batches.reduce((sum, b) => sum + b.qty, 0) + 12000
  const unassigned = db.qr_batches.filter(b => b.assign === '—' || b.assign === '— Admin stock —').reduce((sum, b) => sum + b.qty, 0)
  const withRetailers = db.qr_batches.filter(b => b.assign !== '—' && b.assign !== '— Admin stock —').reduce((sum, b) => sum + b.qty, 0)

  const tabs = [
    { id: 'batches', label: 'Batches & Inventory', count: db.qr_batches.length },
    { id: 'orders', label: 'Online Orders & Dispatch', count: db.qr_orders.filter(o => o.status !== 'delivered').length },
    { id: 'validation', label: 'Printer Validation', count: db.validated_barcodes?.length || 0 },
    { id: 'regions', label: 'Courier Region Rates', count: db.courier_regions.length }
  ]

  return (
    <div>
      <PageHeader 
        title="QR Management" 
        sub="Control QR lifecycle, fulfill online orders, validate printed batches, and configure delivery rates" 
        action={
          activeTab === 'batches' && (
            <Btn variant="primary" onClick={openQRModal}>＋ New Batch</Btn>
          )
        } 
      />

      {/* Stats Summary Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🔲" label="Total Generated" value={totalGenerated.toLocaleString()} delta="↑ 500 this week" color="green" onClick={() => setActiveTab('batches')} />
        <StatCard icon="📦" label="Unassigned Stock" value={unassigned.toLocaleString()} delta="In admin vault" deltaType="neu" color="amber" onClick={() => setActiveTab('batches')} />
        <StatCard icon="🏪" label="With Retailers" value={withRetailers.toLocaleString()} delta="Assigned to shops" deltaType="neu" color="blue" onClick={() => setActiveTab('batches')} />
        <StatCard icon="⚠️" label="Pending Orders" value={String(db.qr_orders.filter(o => o.status === 'placed').length)} delta="Sticker generation required" deltaType="down" color="red" onClick={() => setActiveTab('orders')} />
      </div>

      {/* Premium Tab Bar */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid var(--surface-3)',
        marginBottom: '20px',
        gap: '24px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 4px 12px',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? '700' : '500',
              color: activeTab === tab.id ? 'var(--brand)' : 'var(--text-3)',
              borderBottom: activeTab === tab.id ? '3px solid var(--brand)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '-2px',
              transition: 'all 0.15s ease-in-out'
            }}
          >
            {tab.label}
            <span style={{
              background: activeTab === tab.id ? 'var(--brand-light)' : 'var(--surface-2)',
              color: activeTab === tab.id ? 'var(--brand)' : 'var(--text-3)',
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '10px',
              fontWeight: '700'
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT: BATCHES */}
      {activeTab === 'batches' && (
        <Card>
          <CardHeader title="Generated Batches" sub="Validity period of 3 months begins upon assignment to a seller" />
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px', width: '50px' }}>#</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Batch ID</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Qty</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Vendor</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Assigned to</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Created</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {db.qr_batches.map((b, idx) => (
                  <tr key={b.id} style={{ borderTop: '1px solid var(--surface-3)' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                    <td style={{ padding: '12px' }}><Mono>{b.id}</Mono></td>
                    <td style={{ padding: '12px' }}>{b.cat}</td>
                    <td style={{ padding: '12px' }}>{b.qty}</td>
                    <td style={{ padding: '12px' }}>{b.vendor}</td>
                    <td style={{ padding: '12px' }}>{b.assign}</td>
                    <td style={{ padding: '12px' }}><Badge type={b.status}>{b.label}</Badge></td>
                    <td style={{ padding: '12px' }}>{b.date}</td>
                    <td style={{ padding: '12px' }}>
                      <Btn size="xs" onClick={() => handleViewDetails(b)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <EyeIcon size={12} /> Specs
                        </div>
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB CONTENT: ONLINE ORDERS */}
      {activeTab === 'orders' && (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--surface-3)' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-1)' }}>Online Purchases Fulfillment</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-3)' }}>Base Price: Rs 199 + Pincode-mapped Delivery Charge</p>
            </div>
            <Btn variant="secondary" size="sm" onClick={downloadBulkReport}>
              📥 Download Dispatch Report (CSV)
            </Btn>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px', width: '50px' }}>#</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Order ID</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Customer</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Region & Pincode</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Charges</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Tracking</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {db.qr_orders.map((o, idx) => (
                  <tr key={o.id} style={{ borderTop: '1px solid var(--surface-3)' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                    <td style={{ padding: '12px' }}><Mono>{o.id}</Mono></td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: '600' }}>{o.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>{o.phone}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div>{o.region}</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-2)', fontFamily: 'monospace' }}>Pin: {o.pincode}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: '600' }}>Rs {o.total}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Rs 199 + Rs {o.courierCharge}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <Badge type={o.status === 'placed' ? 'pending' : o.status === 'sticker_generated' ? 'info' : o.status === 'dispatched' ? 'purple' : 'active'}>
                        {o.status === 'placed' ? 'Order Placed' : o.status === 'sticker_generated' ? 'Sticker Ready' : o.status === 'dispatched' ? 'In Transit' : o.status === 'delivered' ? 'Delivered' : 'Activated'}
                      </Badge>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {o.courier ? (
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>{o.courier}</div>
                          <Mono style={{ fontSize: '10.5px' }}>{o.awb}</Mono>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-3)', fontSize: '12px' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {o.status === 'placed' && (
                        <Btn variant="primary" size="xs" onClick={() => handleTriggerSticker(o)}>
                          🏷️ Generate Sticker
                        </Btn>
                      )}
                      {o.status === 'sticker_generated' && (
                        <Btn variant="amber" size="xs" onClick={() => handleTriggerDispatch(o)}>
                          🚚 Dispatch Courier
                        </Btn>
                      )}
                      {o.status === 'dispatched' && (
                        <Btn variant="active" size="xs" onClick={() => handleMarkDelivered(o.id)}>
                          ✓ Mark Delivered
                        </Btn>
                      )}
                      {o.status === 'delivered' && (
                        <span style={{ fontSize: '12px', color: 'var(--brand-mid)', fontWeight: '600' }}>✓ Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB CONTENT: PRINTER SHIPMENT VALIDATION */}
      {activeTab === 'validation' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
          <Card>
            <CardHeader title="Sticker / Barcode Check-In Scanner" sub="Verify printer shipments before dispatching batches to sellers" />
            <CardBody>
              <form onSubmit={handleValidateBarcode} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                  type="text"
                  value={scanInput}
                  onChange={e => setScanInput(e.target.value)}
                  placeholder="Scan or enter Barcode Series (e.g. SS-20042)"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-md)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <Btn type="submit" variant="primary">Verify & Check In</Btn>
              </form>

              {validationResult && validationResult.success && (
                <div style={{
                  background: 'var(--brand-pale)',
                  color: 'var(--brand)',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  border: '1px solid rgba(30,170,79,0.2)',
                  marginBottom: '20px'
                }}>
                  ✓ <strong>Success:</strong> Barcode <strong>{validationResult.barcode}</strong> is valid and has been checked into the office inventory. Batch status updated.
                </div>
              )}

              {showMismatchAlert && (
                <div style={{
                  background: 'var(--danger-light)',
                  color: 'var(--danger)',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1.5px solid rgba(192,57,43,0.3)',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '24px' }}>🚨</div>
                    <div>
                      <h4 style={{ fontWeight: '700', marginBottom: '4px' }}>ANTI-DUPLICATION WARNING: UNRECOGNIZED BARCODE DETECTED!</h4>
                      <p style={{ fontSize: '13px', lineHeight: '1.4', marginBottom: '10px' }}>
                        The scanned barcode <strong>{mismatchCode}</strong> was not found in the master batch database. This could indicate a print duplicity or vendor file error.
                      </p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Btn variant="danger" size="xs" onClick={() => {
                          alert(`Investigation opened for barcode ${mismatchCode}. Printer vendor notified via email.`)
                          setShowMismatchAlert(false)
                        }}>
                          Notify Vendor & Investigate
                        </Btn>
                        <Btn size="xs" onClick={() => setShowMismatchAlert(false)}>Dismiss</Btn>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Office Scan History (Today)</h4>
              <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                {db.validated_barcodes && db.validated_barcodes.length > 0 ? (
                  db.validated_barcodes.map((code, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: 'var(--surface-2)',
                      borderRadius: '6px',
                      marginBottom: '6px',
                      fontSize: '13px'
                    }}>
                      <span><strong>{idx + 1}.</strong> validated series barcode <Mono>{code}</Mono></span>
                      <span style={{ color: 'var(--brand-mid)', fontWeight: '700' }}>✓ Verified</span>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '12.5px', color: 'var(--text-3)' }}>No barcodes scanned today.</p>
                )}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="How Anti-Duplication Works" />
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: '1.5' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--brand-light)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0 }}>1</div>
                  <div><strong>Vendor Assignment:</strong> Each QR batch generated is locked to a registered printing vendor code.</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--brand-light)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0 }}>2</div>
                  <div><strong>Office Scan:</strong> Staff scans printed sheets upon receipt. System cross-checks barcodes with master entries to prevent duplication.</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--brand-light)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0 }}>3</div>
                  <div><strong>Validation Lock:</strong> Successful scan unlocks the batch and marks it as Validated, allowing dispatch to field sellers.</div>
                </div>
                <div style={{ background: 'var(--surface-2)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--accent)', marginTop: '8px', fontSize: '12px' }}>
                  💡 <strong>Test Warning:</strong> Try entering any unrecognized code (e.g. <code>SS-INVALID</code> or <code>12345</code>) above to test the anti-duplication mismatch alarm!
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: COURIER REGION SETTINGS */}
      {activeTab === 'regions' && (
        <Card>
          <CardHeader title="India Delivery Regions Charge Matrix" sub="Admin can update region-wise charges which take effect at checkout immediately" />
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px', width: '50px' }}>#</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Code</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Region Name</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>States Covered</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Pincode Range</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Delivery SLA</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Courier Charge</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {db.courier_regions.map((r, idx) => (
                  <tr key={r.id} style={{ borderTop: '1px solid var(--surface-3)' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                    <td style={{ padding: '12px' }}><Mono>{r.id}</Mono></td>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{r.name}</td>
                    <td style={{ padding: '12px', fontSize: '12px', maxWidth: '300px', color: 'var(--text-2)' }}>{r.states}</td>
                    <td style={{ padding: '12px', fontSize: '12px', fontFamily: 'monospace' }}>{r.pincodes}</td>
                    <td style={{ padding: '12px' }}>{r.est}</td>
                    <td style={{ padding: '12px' }}>
                      {editingRegionId === r.id ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>Rs </span>
                          <input
                            type="number"
                            value={editingCharge}
                            onChange={e => setEditingCharge(e.target.value)}
                            style={{
                              width: '60px',
                              padding: '4px 6px',
                              borderRadius: '4px',
                              border: '1px solid var(--brand)',
                              outline: 'none'
                            }}
                          />
                        </div>
                      ) : (
                        <span style={{ fontWeight: '700', color: 'var(--brand)' }}>Rs {r.charge}</span>
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {editingRegionId === r.id ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <Btn variant="primary" size="xs" onClick={() => handleSaveRegionCharge(r.id)}>Save</Btn>
                          <Btn size="xs" onClick={() => setEditingRegionId(null)}>Cancel</Btn>
                        </div>
                      ) : (
                        <Btn size="xs" onClick={() => handleStartEditRegion(r)}>
                          Edit Charge
                        </Btn>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* MODAL: BATCH DETAILS */}
      {activeDetails && (
        <DetailsModal 
          open={detailsOpen} 
          onClose={() => setDetailsOpen(false)} 
          title="QR Batch Specifications" 
          content={activeDetails} 
        />
      )}

      {/* MODAL: RADIUM STICKER GENERATOR */}
      {stickerOrder && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(6,19,32,0.6)',
          backdropFilter: 'blur(5px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '480px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-1)', marginBottom: '16px' }}>
              Radium Sticker Generator
            </h3>

            {/* Radium Sticker Design Preview */}
            <div style={{
              background: '#f1f2f6',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              {/* Radium Sticker itself: white background, green QR */}
              <div id="printStickerArea" style={{
                background: 'white',
                border: '3px solid #2ecc71',
                borderRadius: '10px',
                padding: '20px',
                width: '100%',
                maxWidth: '280px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                boxSizing: 'border-box'
              }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#1EAA4F', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  🛡️ SCANFORSAFE
                </div>

                {/* Simulated Green QR Code */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: '#e8f8f5',
                  border: '4px solid #2ecc71',
                  borderRadius: '8px',
                  margin: '0 auto 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {/* Outer QR corners */}
                  <div style={{ position: 'absolute', top: 6, left: 6, width: 22, height: 22, border: '4px solid #1EAA4F', background: 'white' }} />
                  <div style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, border: '4px solid #1EAA4F', background: 'white' }} />
                  <div style={{ position: 'absolute', bottom: 6, left: 6, width: 22, height: 22, border: '4px solid #1EAA4F', background: 'white' }} />
                  {/* Inner QR patterns */}
                  <div style={{ width: '40px', height: '40px', background: '#1EAA4F', opacity: 0.8 }} />
                  <div style={{ position: 'absolute', fontSize: '9px', fontWeight: '800', color: '#fff', background: '#1EAA4F', padding: '2px 4px', borderRadius: '4px' }}>
                    SCAN
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: '#2c3e50', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Emergency Decal
                </div>
                
                {/* QR details in smaller text */}
                <div style={{ marginTop: '10px', fontSize: '9px', color: '#7f8c8d', fontFamily: 'monospace', lineHeight: '1.3' }}>
                  <div>BATCH: BTH-0089</div>
                  <div>SERIES: SS-20042</div>
                  <div>VENDOR: VND-702</div>
                  <div style={{ fontWeight: 'bold', color: '#2c3e50', marginTop: '2px' }}>ORDER ID: {stickerOrder.id}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Btn onClick={() => setStickerOrder(null)}>Cancel</Btn>
              <Btn variant="primary" onClick={() => {
                alert(`Sticker printed successfully for ${stickerOrder.name}! Shipping label added.`)
                handleConfirmSticker(stickerOrder.id)
              }}>
                🖨️ Print & Generate Sticker
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: COURIER DISPATCH */}
      {dispatchOrderObj && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(6,19,32,0.6)',
          backdropFilter: 'blur(5px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '440px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-1)', marginBottom: '16px' }}>
              Enter Dispatch Information
            </h3>
            
            <form onSubmit={handleConfirmDispatch}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                  Courier Partner
                </label>
                <select
                  value={courierName}
                  onChange={e => setCourierName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1.5px solid var(--border-md)',
                    outline: 'none',
                    fontSize: '13.5px'
                  }}
                >
                  <option value="Delhivery">Delhivery</option>
                  <option value="Blue Dart">Blue Dart</option>
                  <option value="DTDC">DTDC</option>
                  <option value="DHL">DHL</option>
                  <option value="FedEx">FedEx</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                  AWB Tracking Number
                </label>
                <input
                  type="text"
                  value={awbNumber}
                  onChange={e => setAwbNumber(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1.5px solid var(--border-md)',
                    outline: 'none',
                    fontSize: '13.5px',
                    fontFamily: 'monospace'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Btn onClick={() => setDispatchOrderObj(null)}>Cancel</Btn>
                <Btn type="submit" variant="primary">Confirm Courier Dispatch</Btn>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// ── CUSTOMERS ──────────────────────────────────────────────────────────────
export function AdminCustomers() {
  const db = useDB()
  const [addOpen, setAddOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [activeDetails, setActiveDetails] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'active', 'pending'

  const handleToggle = (token) => {
    toggleStatus('customers', token, 'token')
  }

  const handleView = (c) => {
    const userAcc = db.users.find(u => u.name === c.name || u.phone === c.phone)
    setActiveDetails({
      'Customer Name': c.name,
      'Contact Phone': c.phone,
      'Tag Type': c.tag,
      'QR Token ID': c.token,
      'Emergency Contacts Reached': c.contacts,
      'Registration Status': c.status === 'active' ? 'Active' : 'Inactive',
      'Joined Date': c.joined,
      'Demo Account Username': userAcc ? userAcc.username : 'No account created',
      'Demo Account Password': userAcc ? userAcc.password : 'No account created'
    })
    setDetailsOpen(true)
  }

  const handleStartEdit = (c) => {
    setEditingId(c.token)
    setEditName(c.name)
    setEditPhone(c.phone)
  }

  const handleSaveEdit = (token) => {
    editRecord('customers', token, 'token', { name: editName, phone: editPhone })
    setEditingId(null)
  }

  const statusLabel = { active: 'Active', pending: 'Pending', inactive: 'Inactive' }

  // Stats calculate
  const totalCust = db.customers.length
  const activeCust = db.customers.filter(c => c.status === 'active').length
  const pendingCust = db.customers.filter(c => c.status === 'pending').length

  const filteredCustomers = db.customers.filter(c => {
    if (filterStatus === 'all') return true
    return c.status === filterStatus
  })

  return (
    <div>
      <PageHeader 
        title="Customers" 
        sub="All registered tag owners" 
        action={<Btn variant="primary" onClick={() => setAddOpen(true)}>＋ Add customer</Btn>} 
      />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="👤" label="Total Customers" value={String(totalCust)} delta={filterStatus === 'all' ? "Showing all customers" : "Click to view all"} color="blue" onClick={() => setFilterStatus('all')} />
        <StatCard icon="✅" label="Active Accounts" value={String(activeCust)} delta={filterStatus === 'active' ? "Showing active accounts" : "Click to view active"} color="green" onClick={() => setFilterStatus('active')} />
        <StatCard icon="⚠️" label="Pending Activations" value={String(pendingCust)} delta={filterStatus === 'pending' ? "Showing pending activations" : "Click to view pending"} color="amber" onClick={() => setFilterStatus('pending')} />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Tag</th>
              <th>Token</th>
              <th>Contacts</th>
              <th>Status</th>
              <th>Joined</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c, idx) => (
              <tr key={c.token}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>
                  {editingId === c.token ? (
                    <FormInput value={editName} onChange={e => setEditName(e.target.value)} style={{ padding: '4px 8px', fontSize: 13 }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar initials={c.ini} bg={c.bg} col={c.col} />
                      {c.name}
                    </div>
                  )}
                </td>
                <td>
                  {editingId === c.token ? (
                    <FormInput value={editPhone} onChange={e => setEditPhone(e.target.value)} style={{ padding: '4px 8px', fontSize: 13 }} />
                  ) : (
                    c.phone
                  )}
                </td>
                <td><CategoryBadge cat={c.tag} /></td>
                <td><Mono>{c.token}</Mono></td>
                <td>{c.contacts}</td>
                <td>
                  <span onClick={() => handleToggle(c.token)} style={{ cursor: 'pointer' }} title="Click to toggle status">
                    <Badge type={c.status}>{statusLabel[c.status]}</Badge>
                  </span>
                </td>
                <td>{c.joined}</td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                    {editingId === c.token ? (
                      <Btn size="xs" variant="primary" onClick={() => handleSaveEdit(c.token)}>Save</Btn>
                    ) : (
                      <Btn size="xs" onClick={() => handleStartEdit(c)}>
                        <EditIcon size={11} />
                      </Btn>
                    )}
                    <Btn size="xs" onClick={() => handleView(c)}>
                      <EyeIcon size={11} />
                    </Btn>
                    <Btn size="xs" variant="danger" onClick={() => handleToggle(c.token)} title="Suspend account">
                      ✕
                    </Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <AddCustomerModal open={addOpen} onClose={() => setAddOpen(false)} />
      {activeDetails && (
        <DetailsModal 
          open={detailsOpen} 
          onClose={() => setDetailsOpen(false)} 
          title="Customer Profile Details" 
          content={activeDetails} 
        />
      )}
    </div>
  )
}

// ── RETAILERS ──────────────────────────────────────────────────────────────
export function AdminRetailers() {
  const db = useDB()
  const [addOpen, setAddOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [activeDetails, setActiveDetails] = useState(null)
  const [editingName, setEditingName] = useState(null)
  const [editCity, setEditCity] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'active', 'low_stock'

  const handleToggle = (name) => {
    toggleStatus('retailers', name, 'name')
  }

  const handleView = (r) => {
    const userAcc = db.users.find(u => u.name === r.name)
    setActiveDetails({
      'Retailer Store': r.name,
      'City / Region': r.city,
      'Allocated QR Tags': r.alloc,
      'Activated Sales': r.sold,
      'Remaining Stock': r.stock,
      'Earned Commissions': r.commission,
      'Store Status': r.status === 'active' ? 'Active' : 'Closed',
      'Demo Login Username': userAcc ? userAcc.username : 'None',
      'Demo Login Password': userAcc ? userAcc.password : 'None'
    })
    setDetailsOpen(true)
  }

  const handleStartEdit = (r) => {
    setEditingName(r.name)
    setEditCity(r.city)
  }

  const handleSaveEdit = (name) => {
    editRecord('retailers', name, 'name', { city: editCity })
    setEditingName(null)
  }

  const totalRet = db.retailers.length
  const activeRet = db.retailers.filter(r => r.status === 'active').length
  const lowStockRet = db.retailers.filter(r => r.stock < 30).length
  const totalAlloc = db.retailers.reduce((sum, r) => sum + r.alloc, 0)

  const filteredRetailers = db.retailers.filter(r => {
    if (filterStatus === 'all') return true
    if (filterStatus === 'active') return r.status === 'active'
    if (filterStatus === 'low_stock') return r.stock < 30
    return true
  })

  return (
    <div>
      <PageHeader 
        title="Retailers & Franchises" 
        sub="Manage partner outlets" 
        action={<Btn variant="primary" onClick={() => setAddOpen(true)}>＋ Add retailer</Btn>} 
      />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🏪" label="Total Retailers" value={String(totalRet)} delta={filterStatus === 'all' ? "Showing all" : "Click to view all"} color="blue" onClick={() => setFilterStatus('all')} />
        <StatCard icon="✅" label="Active Outlets" value={String(activeRet)} delta={filterStatus === 'active' ? "Showing active" : "Click to view active"} color="green" onClick={() => setFilterStatus('active')} />
        <StatCard icon="⚠️" label="Low Stock Warning" value={String(lowStockRet)} delta={filterStatus === 'low_stock' ? "Showing low stock" : "Click to view low stock"} color="amber" onClick={() => setFilterStatus('low_stock')} />
        <StatCard icon="📦" label="Total Allocated" value={totalAlloc.toLocaleString()} delta="Distributed tokens" color="purple" />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Retailer</th>
              <th>City</th>
              <th>Allocated</th>
              <th>Sold</th>
              <th>Stock left</th>
              <th>Commission</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRetailers.map((r, idx) => (
              <tr key={r.name}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar initials={r.ini} bg={r.bg} col={r.col} />
                    {r.name}
                  </div>
                </td>
                <td>
                  {editingName === r.name ? (
                    <FormSelect value={editCity} onChange={e => setEditCity(e.target.value)} options={['Dubai', 'Abu Dhabi', 'Sharjah', 'RAK', 'Al Ain']} style={{ padding: '4px 8px', fontSize: 13 }} />
                  ) : (
                    r.city
                  )}
                </td>
                <td>{r.alloc}</td>
                <td>{r.sold}</td>
                <td>
                  <span style={{ color: r.stock < 30 ? 'var(--danger)' : 'inherit', fontWeight: r.stock < 30 ? 600 : 'normal' }}>
                    {r.stock}
                  </span>
                </td>
                <td>{r.commission}</td>
                <td>
                  <span onClick={() => handleToggle(r.name)} style={{ cursor: 'pointer' }} title="Toggle active/inactive">
                    <Badge type={r.status}>{r.status === 'active' ? 'Active' : 'Inactive'}</Badge>
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                    {editingName === r.name ? (
                      <Btn size="xs" variant="primary" onClick={() => handleSaveEdit(r.name)}>Save</Btn>
                    ) : (
                      <Btn size="xs" onClick={() => handleStartEdit(r)}>
                        <EditIcon size={11} />
                      </Btn>
                    )}
                    <Btn size="xs" onClick={() => handleView(r)}>
                      Manage
                    </Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <AddRetailerModal open={addOpen} onClose={() => setAddOpen(false)} />
      {activeDetails && (
        <DetailsModal 
          open={detailsOpen} 
          onClose={() => setDetailsOpen(false)} 
          title="Retailer Partnership Details" 
          content={activeDetails} 
        />
      )}
    </div>
  )
}

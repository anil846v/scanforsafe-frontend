import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge, { CategoryBadge } from '@/components/ui/Badge'
import Btn from '@/components/ui/Btn'
import StatCard from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody, Avatar, Mono, PageHeader, FormGroup, FormInput, FormSelect, ProgressRow } from '@/components/ui/index'
import { useDB } from '@/hooks/useDB'
import { toggleStatus, editRecord, processPayouts } from '@/data/db'
import { AddExecutiveModal, AddVendorModal, DetailsModal } from '@/components/ui/Modals'
import { EditIcon, EyeIcon } from '@/components/ui/Icons'

// ── EMERGENCY TRACKING MONITOR COMPONENT ────────────────────────────────────
function EmergencyTrackerModal({ open, onClose, emergency }) {
  const [outcomeText, setOutcomeText] = useState(emergency?.outcome || '')
  const db = useDB()

  if (!open || !emergency) return null

  // Find user data for contacts and details
  const matchedUser = db.users.find(u => u.name === emergency.owner)
  
  const handleResolve = () => {
    // Update emergency outcome & status to resolved
    editRecord('emergencies', emergency.token, 'token', { 
      status: 'inactive', 
      label: 'Resolved',
      outcome: outcomeText || 'Resolved by Admin Dispatch' 
    })
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1100,
      background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20
    }}>
      <div style={{
        background: 'white', borderRadius: 16, width: '100%', maxWidth: '640px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ background: 'var(--danger)', color: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>🚨 Emergency Console: {emergency.owner}</h3>
            <span style={{ fontSize: 11, opacity: 0.85 }}>Token ID: {emergency.token} · Active Tracking Node</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: 20, cursor: 'pointer', fontWeight: 600 }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: 20, overflowY: 'auto', maxHeight: '70vh', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Tracking Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: 'var(--surface-2)', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>GPS LOCATION</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', marginTop: 2 }}>📍 {emergency.location}</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 1 }}>Lat: 25.1972° N · Long: 55.2744° E</div>
              </div>

              <div style={{ background: 'var(--surface-2)', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>MEDICAL DISPATCH LOG</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.4 }}>
                  • <strong>Blood Type:</strong> {matchedUser?.bloodType || 'O+'} <br />
                  • <strong>Notes:</strong> {matchedUser?.medicalNotes || 'No known allergies or chronic conditions registered.'}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div style={{
              background: '#0B2E44', borderRadius: 8, height: '100%', minHeight: 140,
              position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center', color: 'white', padding: 10
            }}>
              {/* Radar Grid */}
              <div style={{
                position: 'absolute', width: 100, height: 100, border: '1px solid rgba(29,158,117,0.3)', borderRadius: '50%',
                animation: 'radarPulse 3s infinite linear'
              }} />
              <div style={{ position: 'relative', zIndex: 2, fontSize: 32 }}>🛰️</div>
              <div style={{ position: 'relative', zIndex: 2, fontSize: 11, fontWeight: 600, color: 'var(--brand-mid)', marginTop: 4 }}>LOCKING SIGNAL POINTER</div>
              <div style={{ position: 'relative', zIndex: 2, fontSize: 9, opacity: 0.6 }}>Active triangulation...</div>
            </div>
          </div>

          {/* Contact Dial Status */}
          <div style={{ background: 'var(--danger-light)', border: '1px solid rgba(192,57,43,.15)', borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--danger)', fontWeight: 700, marginBottom: 6 }}>DIAL DISPATCH STATUS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>📞 Priority 1: Sara Al Farsi (Sister)</span>
                <strong style={{ color: 'var(--danger)' }}>Line busy / Rerouting...</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>📞 Priority 2: Khalid Al Farsi (Brother)</span>
                <strong style={{ color: 'var(--brand-mid)' }}>Connected ✓ (Informed)</strong>
              </div>
            </div>
          </div>

          {/* Incident Outcome input */}
          <FormGroup label="Incident Dispatch Notes / Resolution Outcome">
            <FormInput 
              value={outcomeText} 
              onChange={e => setOutcomeText(e.target.value)} 
              placeholder="e.g. Ambulance dispatched. Family notified." 
            />
          </FormGroup>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-2)' }}>
          <Btn onClick={onClose}>Close console</Btn>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="danger" onClick={handleResolve}>Mark Resolved</Btn>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes radarPulse {
          0% { transform: scale(0.2); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ── ADMIN EMERGENCIES ───────────────────────────────────────────────────────
export function AdminEmergencies() {
  const db = useDB()
  const [selectedEmergency, setSelectedEmergency] = useState(null)
  const [trackerOpen, setTrackerOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'alert', 'resolved'

  const handleOpenMonitor = (e) => {
    setSelectedEmergency(e)
    setTrackerOpen(true)
  }

  const activeAlerts = db.emergencies.filter(e => e.status === 'alert').length
  const totalAlerts = db.emergencies.length
  const resolvedRate = totalAlerts > 0 ? Math.round(((totalAlerts - activeAlerts) / totalAlerts) * 100) : 100

  const filteredEmergencies = db.emergencies.filter(e => {
    if (filterStatus === 'all') return true
    if (filterStatus === 'alert') return e.status === 'alert'
    if (filterStatus === 'resolved') return e.status !== 'alert'
    return true
  })

  return (
    <div>
      <PageHeader title="Emergencies & Rescues" sub="Live incident response panel" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🚨" label="Active Alerts" value={String(activeAlerts)} delta={filterStatus === 'alert' ? "Showing active" : "Click to view active"} color="red" onClick={() => setFilterStatus('alert')} />
        <StatCard icon="👤" label="Total Incidents" value={String(totalAlerts)} delta={filterStatus === 'all' ? "Showing all" : "Click to view all"} color="blue" onClick={() => setFilterStatus('all')} />
        <StatCard icon="✅" label="Resolved Cases" value={String(totalAlerts - activeAlerts)} delta={`SLA Rate: ${resolvedRate}%`} color="green" onClick={() => setFilterStatus('resolved')} />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Token</th>
              <th>Owner</th>
              <th>Cat</th>
              <th>Last scanned location</th>
              <th>Status</th>
              <th>Outcome log</th>
              <th>Triggered</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmergencies.map((e, idx) => (
              <tr key={e.token + '-' + idx}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td><Mono>{e.token}</Mono></td>
                <td>{e.owner}</td>
                <td><CategoryBadge cat={e.cat} /></td>
                <td>📍 {e.location}</td>
                <td>
                  <Badge type={e.status === 'alert' ? 'danger' : 'inactive'}>
                    {e.label}
                  </Badge>
                </td>
                <td>{e.outcome}</td>
                <td>{e.time}</td>
                <td style={{ textAlign: 'right' }}>
                  <Btn 
                    size="xs" 
                    variant={e.status === 'alert' ? 'danger' : 'default'} 
                    onClick={() => handleOpenMonitor(e)}
                  >
                    {e.status === 'alert' ? '🚨 Monitor' : 'Inspect'}
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <EmergencyTrackerModal 
        open={trackerOpen} 
        onClose={() => setTrackerOpen(false)} 
        emergency={selectedEmergency} 
      />
    </div>
  )
}

// ── ADMIN MISSING VEHICLES ──────────────────────────────────────────────────
export function AdminMissing() {
  const db = useDB()
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'alert', 'inactive'

  const handleToggleRecovered = (plate) => {
    // Find missing vehicle and toggle
    const vehicle = db.missing_vehicles.find(m => m.plate === plate)
    if (vehicle) {
      const nextStatus = vehicle.status === 'inactive' ? 'alert' : 'inactive';
      const nextLabel = nextStatus === 'inactive' ? 'Recovered' : 'Active';
      editRecord('missing_vehicles', plate, 'plate', { status: nextStatus, label: nextLabel })
    }
  }

  const activeMissing = db.missing_vehicles.filter(m => m.status === 'alert').length
  const totalRecovered = db.missing_vehicles.filter(m => m.status === 'inactive').length
  const totalSightings = db.missing_vehicles.reduce((sum, m) => sum + m.sightings, 0)

  const filteredVehicles = db.missing_vehicles.filter(m => {
    if (filterStatus === 'all') return true
    if (filterStatus === 'alert') return m.status === 'alert'
    if (filterStatus === 'inactive') return m.status === 'inactive'
    return true
  })

  return (
    <div>
      <PageHeader title="Missing Vehicles" sub="Track reports and NFC scanning checkpoints" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="⚠️" label="Reported Missing" value={String(activeMissing)} delta={filterStatus === 'alert' ? "Showing missing" : "Click to view missing"} color="red" onClick={() => setFilterStatus('alert')} />
        <StatCard icon="✅" label="Recovered Vehicles" value={String(totalRecovered)} delta={filterStatus === 'inactive' ? "Showing recovered" : "Click to view recovered"} color="green" onClick={() => setFilterStatus('inactive')} />
        <StatCard icon="📈" label="Total Sightings" value={String(totalSightings)} delta={filterStatus === 'all' ? "Showing all" : "Click to view all"} color="blue" onClick={() => setFilterStatus('all')} />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Vehicle Plate</th>
              <th>Owner</th>
              <th>Reported on</th>
              <th>Last seen area</th>
              <th>Scans / Sightings</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((m, idx) => (
              <tr key={m.plate}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td><Mono>{m.plate}</Mono></td>
                <td>{m.owner}</td>
                <td>{m.reported}</td>
                <td>📍 {m.lastSeen}</td>
                <td>{m.sightings} scans</td>
                <td>
                  <Badge type={m.status === 'alert' ? 'danger' : m.status === 'pending' ? 'warn' : 'active'}>
                    {m.label}
                  </Badge>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Btn size="xs" onClick={() => handleToggleRecovered(m.plate)}>
                    {m.status === 'inactive' ? 'Mark Missing' : '✓ Mark Recovered'}
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── ADMIN VENDORS ──────────────────────────────────────────────────────────
export function AdminVendors() {
  const db = useDB()
  const [addOpen, setAddOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'active', 'inactive'

  const handleToggle = (name) => {
    toggleStatus('vendors', name, 'name')
  }

  const totalVendors = db.vendors.length
  const activeVendors = db.vendors.filter(v => v.status === 'active').length
  const totalPrinted = db.vendors.reduce((sum, v) => sum + parseInt(v.total.replace(/[^\d]/g, '') || 0), 0)

  const filteredVendors = db.vendors.filter(v => {
    if (filterStatus === 'all') return true
    return v.status === filterStatus
  })

  return (
    <div>
      <PageHeader 
        title="Tag Vendors" 
        sub="Sticker and NFC manufacturer logistics" 
        action={<Btn variant="primary" onClick={() => setAddOpen(true)}>＋ Add Vendor</Btn>} 
      />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🏢" label="Total Vendors" value={String(totalVendors)} delta={filterStatus === 'all' ? "Showing all" : "Click to view all"} color="blue" onClick={() => setFilterStatus('all')} />
        <StatCard icon="✅" label="Active Partners" value={String(activeVendors)} delta={filterStatus === 'active' ? "Showing active" : "Click to view active"} color="green" onClick={() => setFilterStatus('active')} />
        <StatCard icon="🖨️" label="Total Printed Tags" value={totalPrinted.toLocaleString()} delta="Production capacity" color="purple" />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Vendor Name</th>
              <th>Location</th>
              <th>Batches Deliveries</th>
              <th>Total tags printed</th>
              <th>Avg Turnaround</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((v, idx) => (
              <tr key={v.name}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>{v.name}</td>
                <td>{v.location}</td>
                <td>{v.batches} batches</td>
                <td>{v.total}</td>
                <td>{v.turnaround}</td>
                <td>
                  <span onClick={() => handleToggle(v.name)} style={{ cursor: 'pointer' }} title="Toggle status">
                    <Badge type={v.status}>{v.status === 'active' ? 'Active' : 'Inactive'}</Badge>
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Btn size="xs" onClick={() => handleToggle(v.name)}>
                    Toggle Status
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <AddVendorModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  )
}

// ── ADMIN COMMISSIONS ───────────────────────────────────────────────────────
export function AdminCommissions() {
  const db = useDB()
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'active', 'pending'

  const handlePayout = () => {
    processPayouts()
  }

  const pendingAmount = db.commissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + parseInt(c.amount.replace(/[^\d]/g, '')), 0)

  const totalPartners = db.commissions.length
  const activeDisbursed = db.commissions.filter(c => c.status === 'active').length

  const filteredCommissions = db.commissions.filter(c => {
    if (filterStatus === 'all') return true
    return c.status === filterStatus
  })

  return (
    <div>
      <PageHeader 
        title="Commissions & Payouts" 
        sub="Retailer and Field executive payout ledger" 
        action={
          pendingAmount > 0 ? (
            <Btn variant="primary" onClick={handlePayout}>💰 Clear all pending payouts (₹{pendingAmount.toLocaleString()})</Btn>
          ) : (
            <Badge type="active">✓ All payouts processed</Badge>
          )
        }
      />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="👥" label="Total Partners" value={String(totalPartners)} delta={filterStatus === 'all' ? "Showing all" : "Click to view all"} color="blue" onClick={() => setFilterStatus('all')} />
        <StatCard icon="⚠️" label="Awaiting Payout" value={`₹${pendingAmount.toLocaleString()}`} delta={filterStatus === 'pending' ? "Showing pending" : "Click to view pending"} color="amber" onClick={() => setFilterStatus('pending')} />
        <StatCard icon="✅" label="Disbursed Accounts" value={String(activeDisbursed)} delta={filterStatus === 'active' ? "Showing disbursed" : "Click to view disbursed"} color="green" onClick={() => setFilterStatus('active')} />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Agent / Partner Name</th>
              <th>Role Type</th>
              <th>Sales logged</th>
              <th>Commissions Rate</th>
              <th>Accumulated Amount</th>
              <th>Payout Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommissions.map((c, idx) => (
              <tr key={c.name}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>{c.name}</td>
                <td><Badge type={c.roleType}>{c.roleLabel}</Badge></td>
                <td>{c.sales} sales</td>
                <td>{c.rate}</td>
                <td>{c.amount}</td>
                <td>
                  <Badge type={c.status === 'active' ? 'success' : 'warn'}>
                    {c.status === 'active' ? 'Disbursed' : 'Awaiting payout'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── ADMIN MARKETING TEAM ───────────────────────────────────────────────────
export function AdminMarketing() {
  const db = useDB()
  const [addOpen, setAddOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [activeDetails, setActiveDetails] = useState(null)
  const [editingName, setEditingName] = useState(null)
  const [editRegion, setEditRegion] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'active', 'inactive'

  const handleToggle = (name) => {
    toggleStatus('marketing_execs', name, 'name')
  }

  const handleViewDetails = (ex) => {
    const userAcc = db.users.find(u => u.name === ex.name)
    setActiveDetails({
      'Field Executive': ex.name,
      'Region Territory': ex.region,
      'Customers Onboarded': ex.customers,
      'QR Tags Active': ex.tags,
      'Conversion Rate': ex.conversion,
      'Total Commission': ex.commission,
      'Active Status': ex.status === 'active' ? 'Active' : 'Suspended',
      'Demo Account Username': userAcc ? userAcc.username : 'None',
      'Demo Account Password': userAcc ? userAcc.password : 'None'
    })
    setDetailsOpen(true)
  }

  const handleStartEdit = (ex) => {
    setEditingName(ex.name)
    setEditRegion(ex.region)
  }

  const handleSaveEdit = (name) => {
    editRecord('marketing_execs', name, 'name', { region: editRegion })
    setEditingName(null)
  }

  const totalExecs = db.marketing_execs.length
  const activeExecs = db.marketing_execs.filter(e => e.status === 'active').length
  const totalTags = db.marketing_execs.reduce((sum, e) => sum + e.tags, 0)

  const filteredExecs = db.marketing_execs.filter(e => {
    if (filterStatus === 'all') return true
    return e.status === filterStatus
  })

  return (
    <div>
      <PageHeader 
        title="Marketing Executives" 
        sub="Field force and conversions tracking" 
        action={<Btn variant="primary" onClick={() => setAddOpen(true)}>＋ Add Executive</Btn>} 
      />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="👥" label="Total Executives" value={String(totalExecs)} delta={filterStatus === 'all' ? "Showing all" : "Click to view all"} color="blue" onClick={() => setFilterStatus('all')} />
        <StatCard icon="✅" label="Active Force" value={String(activeExecs)} delta={filterStatus === 'active' ? "Showing active" : "Click to view active"} color="green" onClick={() => setFilterStatus('active')} />
        <StatCard icon="🏷️" label="Total Tags Sold" value={totalTags.toLocaleString()} delta="Direct activations" color="purple" />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Executive</th>
              <th>Region</th>
              <th>Onboarded</th>
              <th>Tags Sold</th>
              <th>Conversion</th>
              <th>Commissions</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExecs.map((ex, idx) => (
              <tr key={ex.name}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar initials={ex.ini} bg={ex.bg} col={ex.col} />
                    {ex.name}
                  </div>
                </td>
                <td>
                  {editingName === ex.name ? (
                    <FormSelect value={editRegion} onChange={e => setEditRegion(e.target.value)} options={['Dubai', 'Abu Dhabi', 'Sharjah', 'RAK', 'Fujairah']} style={{ padding: '4px 8px', fontSize: 13 }} />
                  ) : (
                    ex.region
                  )}
                </td>
                <td>{ex.customers} customers</td>
                <td>{ex.tags} tags</td>
                <td>{ex.conversion}</td>
                <td>{ex.commission}</td>
                <td>
                  <span onClick={() => handleToggle(ex.name)} style={{ cursor: 'pointer' }} title="Toggle active status">
                    <Badge type={ex.status}>{ex.status === 'active' ? 'Active' : 'Inactive'}</Badge>
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                    {editingName === ex.name ? (
                      <Btn size="xs" variant="primary" onClick={() => handleSaveEdit(ex.name)}>Save</Btn>
                    ) : (
                      <Btn size="xs" onClick={() => handleStartEdit(ex)}>
                        <EditIcon size={11} />
                      </Btn>
                    )}
                    <Btn size="xs" onClick={() => handleViewDetails(ex)}>
                      Details
                    </Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <AddExecutiveModal open={addOpen} onClose={() => setAddOpen(false)} />
      {activeDetails && (
        <DetailsModal 
          open={detailsOpen} 
          onClose={() => setDetailsOpen(false)} 
          title="Executive Operational Profile" 
          content={activeDetails} 
        />
      )}
    </div>
  )
}

// ── ADMIN REPORTS ──────────────────────────────────────────────────────────
export function AdminReports() {
  const db = useDB()
  const navigate = useNavigate()

  // Dynamic values
  const totalSales = db.customers.length + 9200
  const vehicleSales = db.customers.filter(c => c.tag === '🚗').length + 5835
  const seniorSales = db.customers.filter(c => c.tag === '👴').length + 2648

  return (
    <div>
      <PageHeader title="Analytics & Reports" sub="Audit logs and distribution reports" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="📈" label="Total Sales Volume" value={totalSales.toLocaleString()} delta="Lifetime cumulative" color="green" onClick={() => navigate('/admin/dashboard')} />
        <StatCard icon="🚗" label="Vehicle Safety Decals" value={vehicleSales.toLocaleString()} delta="Primary product line" color="blue" onClick={() => navigate('/admin/customers')} />
        <StatCard icon="👴" label="Senior Care Tags" value={seniorSales.toLocaleString()} delta="High-growth category" color="purple" onClick={() => navigate('/admin/customers')} />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <CardHeader title="Distribution Metrics" />
          <CardBody>
            <ProgressRow label="🚗 Vehicle Safety" pct={Math.round((vehicleSales / totalSales) * 100)} color="var(--brand)" />
            <ProgressRow label="👴 Senior Care" pct={Math.round((seniorSales / totalSales) * 100)} color="var(--accent)" />
            <ProgressRow label="👶 Kids Safety" pct={15} color="var(--info)" />
            <ProgressRow label="🐶 Pet Tags" pct={8} color="var(--purple)" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Partners Performance Ratio" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
              <span>Retailer SafeZone LLC</span>
              <strong>{db.retailers.find(r => r.name === 'SafeZone LLC')?.sold || 342} units</strong>
            </div>
            <div style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
              <span>Marketing Priya Nair</span>
              <strong>{db.marketing_execs.find(e => e.name === 'Priya Nair')?.tags || 58} units</strong>
            </div>
            <div style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
              <span>Average response time</span>
              <strong style={{ color: 'var(--brand-mid)' }}>4.2 seconds</strong>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

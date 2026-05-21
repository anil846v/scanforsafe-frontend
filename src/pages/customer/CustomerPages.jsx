import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '@/components/ui/StatCard'
import Badge, { CategoryBadge } from '@/components/ui/Badge'
import Btn from '@/components/ui/Btn'
import { Card, CardHeader, CardBody, FormGroup, FormInput, FormSelect, Mono, PageHeader, AlertBanner, ActivityItem, Avatar } from '@/components/ui/index'
import { useDB } from '@/hooks/useDB'
import { reportVehicleMissing, updateProfile, editRecord, triggerEmergency } from '@/data/db'
import { EmergencyModal } from '@/components/ui/Modals'

// Helper to get customer username
function getCustUsername() {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
  return user.username || 'customer'
}

// ── CUSTOMER DASHBOARD (HOME) ────────────────────────────────────────────────
export function CustomerDashboard() {
  const db = useDB()
  const navigate = useNavigate()
  const username = getCustUsername()
  const matchedUser = db.users.find(u => u.username === username) || { name: 'Ahmed Al Farsi', phone: '+971 50 123 4567' }
  const customerRecords = db.customers.filter(c => c.name === matchedUser.name)
  const tokens = customerRecords.map(c => c.token)

  const [emergencyOpen, setEmergencyOpen] = useState(false)

  // Find tags owned by this customer
  const myTags = db.customer_tags.filter(t => tokens.includes(t.token))
  const activeTagsCount = myTags.filter(t => t.status === 'active').length

  const myContacts = (db.customer_contacts || []).filter(c => c.username === username)
  const myScans = db.customer_scan_activity.filter(s => tokens.includes(s.token))

  return (
    <div>
      <AlertBanner
        type="warn"
        icon="🛡️"
        text="All safety shields active. Keep your medical details and contacts updated."
        action="Edit contacts"
        onAction={() => navigate('/customer/contacts')}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🏷️" label="Active Tags" value={String(activeTagsCount)} delta="Secured items" color="green" onClick={() => navigate('/customer/my_tags')} />
        <StatCard icon="👤" label="Emergency Contacts" value={`${myContacts.length} contacts`} delta="Priority dial sequence" color="blue" onClick={() => navigate('/customer/contacts')} />
        <StatCard icon="🚨" label="Alert Scans Log" value={`${myScans.length} scans`} delta="Incident audit trail" color="purple" onClick={() => navigate('/customer/emergency_history')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, marginBottom: 14 }}>
        <Card style={{ border: '2px solid rgba(192,57,43,.15)' }}>
          <CardHeader title="🚨 Quick Emergency Trigger" sub="Acknowledge response in case of crisis" />
          <CardBody style={{ textAlign: 'center', padding: '24px' }}>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 16 }}>
              In case of a medical crisis, accident, or emergency, press this button. It triggers a 5-second countdown to alert your contacts and direct dispatch response.
            </p>
            <Btn variant="danger" onClick={() => setEmergencyOpen(true)} style={{ padding: '12px 28px', fontSize: 15, fontWeight: 700 }}>
              🚨 Trigger Emergency Broadcast
            </Btn>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent scan activities" />
          {myScans.slice(0, 5).map((s, idx) => (
            <ActivityItem key={idx} dot={s.col} text={s.text} ts={s.ts} />
          ))}
        </Card>
      </div>

      {/* SVG Scan Trend Line Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <Card>
          <CardHeader title="Tag Scan Activity Trend" sub="Scan logs aggregated over the last 6 months" />
          <CardBody>
            <div style={{ padding: '10px 0' }}>
              <svg width="100%" height="150" viewBox="0 0 450 150" preserveAspectRatio="none">
                {/* Y-axis gridlines */}
                <line x1="40" y1="20" x2="430" y2="20" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="55" x2="430" y2="55" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="90" x2="430" y2="90" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="125" x2="430" y2="125" stroke="var(--text-3)" strokeWidth="1.5" />
                
                {/* Y Labels */}
                <text x="30" y="24" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">6 scans</text>
                <text x="30" y="59" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">4 scans</text>
                <text x="30" y="94" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">2 scans</text>
                <text x="30" y="129" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">0 scans</text>

                {/* SVG Spline */}
                {/* Values: Jan: 1, Feb: 3, Mar: 2, Apr: 5, May: 1, Jun: 3 */}
                <path 
                  d="M 60,110 Q 125,75 190,92 T 320,40 T 385,110" 
                  fill="none" 
                  stroke="var(--brand)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                />

                {/* Data Points */}
                {[
                  { month: 'Jan', val: 1, x: 60, y: 110 },
                  { month: 'Feb', val: 3, x: 125, y: 75 },
                  { month: 'Mar', val: 2, x: 190, y: 92 },
                  { month: 'Apr', val: 5, x: 255, y: 40 },
                  { month: 'May', val: 1, x: 320, y: 110 },
                  { month: 'Jun', val: 3, x: 385, y: 75 }
                ].map(p => (
                  <g key={p.month}>
                    <circle cx={p.x} cy={p.y} r="5" fill="#F27A18" stroke="white" strokeWidth="2" />
                    <text x={p.x} y={p.y - 10} fill="var(--text-1)" fontSize="9" fontWeight="800" textAnchor="middle">{p.val}</text>
                    <text x={p.x} y="142" fill="var(--text-3)" fontSize="9.5" fontWeight="700" textAnchor="middle">{p.month}</text>
                  </g>
                ))}
              </svg>
            </div>
          </CardBody>
        </Card>

        {/* Security Checklist card */}
        <Card>
          <CardHeader title="Safety Checklist" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--brand-mid)' }}>✓</span>
              <span>All 3 priority contacts linked</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--brand-mid)' }}>✓</span>
              <span>Medical profile 100% complete</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--brand-mid)' }}>✓</span>
              <span>Decal QR code validated</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--brand-mid)' }}>✓</span>
              <span>GPS permission approved</span>
            </div>
          </CardBody>
        </Card>
      </div>

      <EmergencyModal 
        open={emergencyOpen} 
        onClose={() => setEmergencyOpen(false)} 
        customerUsername={username} 
        activeToken={myTags[0]?.token || 'VH-3K9P-XLAW'}
      />
    </div>
  )
}

// ── CUSTOMER TAGS ───────────────────────────────────────────────────────────
export function CustomerTags() {
  const db = useDB()
  const username = getCustUsername()
  const matchedUser = db.users.find(u => u.username === username) || { name: 'Ahmed Al Farsi' }
  const customerRecords = db.customers.filter(c => c.name === matchedUser.name)
  const tokens = customerRecords.map(c => c.token)
  
  const myTags = db.customer_tags.filter(t => tokens.includes(t.token))
  const myScans = db.customer_scan_activity.filter(s => tokens.includes(s.token))
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [activeQr, setActiveQr] = useState(null)

  const handleToggleMissing = (token, showMissing) => {
    // If turning on missing, add a report
    if (showMissing) {
      reportVehicleMissing(username, {
        plate: 'Dubai X ' + Math.floor(10000 + Math.random() * 90000),
        lastSeen: 'Dubai Silicon Oasis'
      })
    }
    // Toggle state in customer tag
    const idx = myTags.findIndex(t => t.token === token)
    if (idx !== -1) {
      const updatedTags = [...myTags]
      updatedTags[idx].showMissing = !showMissing
      editRecord('customer_tags', token, 'token', { showMissing: !showMissing })
    }
  }

  const handleShowQR = (token) => {
    setActiveQr(token)
    setQrModalOpen(true)
  }

  const navigate = useNavigate()

  return (
    <div>
      <PageHeader title="My Activated Tags" sub="Inspect and manage NFC/QR safety shields" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🏷️" label="My Safety Tags" value={String(myTags.length)} delta="Active decals & bands" color="green" />
        <StatCard icon="🔍" label="Missing Status Flagged" value={String(myTags.filter(t => t.showMissing).length)} delta="Click to report missing vehicle" color="amber" onClick={() => navigate('/customer/missing_report')} />
        <StatCard icon="🚨" label="Alert Scans Log" value={String(myScans.length)} delta="Click to audit scan history" color="blue" onClick={() => navigate('/customer/emergency_history')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {myTags.map(tag => (
          <Card key={tag.token}>
            <CardHeader
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{tag.name}</span>
                  <CategoryBadge cat={tag.emoji} />
                </div>
              }
              sub={<Mono>{tag.token}</Mono>}
              action={
                <Btn size="xs" onClick={() => handleShowQR(tag.token)}>
                  🔍 View QR
                </Btn>
              }
            />
            <CardBody>
              <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
                {tag.stats.map(s => (
                  <div key={s.label} style={{ flex: 1, background: 'var(--surface-2)', padding: 10, borderRadius: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: s.color, marginTop: 2 }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {tag.emoji === '🚗' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Report Vehicle Missing</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Broadcast plate details to police checkpoints</div>
                  </div>
                  <Btn 
                    size="sm" 
                    variant={tag.showMissing ? 'danger' : 'default'} 
                    onClick={() => handleToggleMissing(tag.token, tag.showMissing)}
                  >
                    {tag.showMissing ? '🔴 Reported Missing' : 'Report Missing'}
                  </Btn>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* QR Preview Dialog */}
      {qrModalOpen && activeQr && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1100,
          background: 'rgba(0, 0, 0, 0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: 300, marginBottom: 0, textAlign: 'center' }}>
            <CardHeader title="Secure Scan QR Code" action={<Btn size="xs" onClick={() => setQrModalOpen(false)}>✕</Btn>} />
            <CardBody>
              <div style={{ width: 180, height: 180, background: '#f5f5f5', border: '1px solid #ddd', margin: '0 auto 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>[ScanForSafe QR Code]</span>
                <span style={{ fontSize: 32 }}>🏁</span>
                <span style={{ fontSize: 10, fontFamily: 'monospace', marginTop: 4, background: '#e0e0e0', padding: '2px 6px', borderRadius: 4 }}>{activeQr}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-3)' }}>Sticker URL is linked to your contact and health metrics profile.</p>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  )
}

// ── CUSTOMER CONTACTS ────────────────────────────────────────────────────────
export function CustomerContacts() {
  const db = useDB()
  const username = getCustUsername()
  const myContacts = (db.customer_contacts || []).filter(c => c.username === username)
  const [contacts, setContacts] = useState(myContacts)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [rel, setRel] = useState('Relative')

  const handleAddContact = (e) => {
    e.preventDefault()
    if (!name || !phone) return

    const newContact = {
      username,
      ini: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      name,
      phone,
      rel,
      priority: `Priority ${contacts.length + 1}`,
      badgeType: contacts.length === 0 ? 'active' : contacts.length === 1 ? 'pending' : null,
      badgeLabel: contacts.length === 0 ? 'First called' : contacts.length === 1 ? 'If contact 1 misses' : null,
      bg: '#E1F5EE',
      col: '#0F6E56'
    }

    const updated = [...contacts, newContact]
    setContacts(updated)
    const otherContacts = (db.customer_contacts || []).filter(c => c.username !== username)
    editRecord('customer_contacts', null, null, [...otherContacts, ...updated]) // updates global db state
    setName('')
    setPhone('')
  }

  const handleDeleteContact = (index) => {
    const updated = contacts.filter((_, i) => i !== index).map((c, i) => ({
      ...c,
      priority: `Priority ${i + 1}`,
      badgeType: i === 0 ? 'active' : i === 1 ? 'pending' : null,
      badgeLabel: i === 0 ? 'First called' : i === 1 ? 'If contact 1 misses' : null,
    }))
    setContacts(updated)
    const otherContacts = (db.customer_contacts || []).filter(c => c.username !== username)
    editRecord('customer_contacts', null, null, [...otherContacts, ...updated])
  }

  const navigate = useNavigate()

  return (
    <div>
      <PageHeader title="Emergency Contacts Hierarchy" sub="Establish dial priority order" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="👥" label="Emergency Contacts" value={String(contacts.length)} delta="Contacts dialed in sequence" color="blue" />
        <StatCard icon="🥇" label="Primary Responder" value={contacts.length > 0 ? contacts[0].name : 'None Linked'} delta="Dialed first on alert scan" color="green" />
        <StatCard icon="🛡️" label="Active Safety Tags" value="Configure Tags" delta="Click to view safety shields" color="purple" onClick={() => navigate('/customer/my_tags')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14 }}>
        <Card>
          <CardHeader title="Current Dial Sequence" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contacts.map((c, idx) => (
              <div key={c.phone + '-' + idx} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, background: 'var(--surface-2)', borderRadius: 8 }}>
                <Avatar initials={c.ini} bg={c.bg} col={c.col} size={36} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name} ({c.rel})</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>{c.phone}</div>
                </div>
                {c.badgeLabel && (
                  <Badge type={c.badgeType} style={{ marginLeft: 8 }}>{c.badgeLabel}</Badge>
                )}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>{c.priority}</span>
                  <button 
                    onClick={() => handleDeleteContact(idx)} 
                    style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: 15, cursor: 'pointer' }}
                    title="Remove Contact"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Add Contact" />
          <CardBody>
            <form onSubmit={handleAddContact}>
              <FormGroup label="Full Name">
                <FormInput value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sara Al Farsi" required />
              </FormGroup>
              <FormGroup label="Phone Number">
                <FormInput value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +971 50 123 4567" required />
              </FormGroup>
              <FormGroup label="Relationship">
                <FormSelect value={rel} onChange={e => setRel(e.target.value)} options={['Parent', 'Spouse', 'Sibling', 'Doctor', 'Friend', 'Sister', 'Brother']} />
              </FormGroup>
              <Btn type="submit" variant="primary" style={{ width: '100%', marginTop: 10 }}>Add to sequence</Btn>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

// ── CUSTOMER PROFILE ─────────────────────────────────────────────────────────
export function CustomerProfile() {
  const db = useDB()
  const username = getCustUsername()
  const matchedUser = db.users.find(u => u.username === username) || {}

  const [firstName, setFirstName] = useState(matchedUser.name?.split(' ')[0] || '')
  const [lastName, setLastName] = useState(matchedUser.name?.split(' ').slice(1).join(' ') || '')
  const [phone, setPhone] = useState(matchedUser.phone || '')
  const [bloodType, setBloodType] = useState(matchedUser.bloodType || 'O+')
  const [medicalNotes, setMedicalNotes] = useState(matchedUser.medicalNotes || '')
  const [success, setSuccess] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    updateProfile(username, {
      name: `${firstName} ${lastName}`.trim(),
      phone,
      bloodType,
      medicalNotes
    })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div>
      <PageHeader title="My Profile Settings" sub="Review medical history and phone numbers" />
      {success && (
        <AlertBanner type="success" icon="✓" text="Profile saved successfully!" />
      )}

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🩸" label="Blood Group Type" value={bloodType} delta="Emergency medical tag" color="danger" />
        <StatCard icon="📝" label="Medical Records" value={medicalNotes ? 'Configured' : 'Empty'} delta="First responders visibility" color="blue" />
        <StatCard icon="👥" label="Linked Responders" value={String(db.customer_contacts.length)} delta="Click to configure hierarchy" color="green" onClick={() => navigate('/customer/contacts')} />
      </div>

      <div style={{ maxWidth: 580 }}>
        <Card>
          <CardBody>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <FormGroup label="First Name">
                  <FormInput value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </FormGroup>
                <FormGroup label="Last Name">
                  <FormInput value={lastName} onChange={e => setLastName(e.target.value)} required />
                </FormGroup>
              </div>
              <FormGroup label="Mobile Phone">
                <FormInput value={phone} onChange={e => setPhone(e.target.value)} required />
              </FormGroup>
              <FormGroup label="Blood Group Type">
                <FormSelect value={bloodType} onChange={e => setBloodType(e.target.value)} options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} />
              </FormGroup>
              <FormGroup label="Critical Allergies / Medical Notes">
                <textarea 
                  value={medicalNotes} 
                  onChange={e => setMedicalNotes(e.target.value)}
                  placeholder="e.g. Asthma, Penicillin allergy, wear glasses." 
                  style={{
                    width: '100%', padding: '8px 12px', borderRadius: 8,
                    border: '1px solid var(--border-md)',
                    background: 'var(--surface)', color: 'var(--text-1)',
                    fontSize: 13, outline: 'none', height: 80,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
              </FormGroup>
              <div style={{ marginTop: 20 }}>
                <Btn type="submit" variant="primary" style={{ width: '100%' }}>Save Profile & Synchronize Tags</Btn>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

// ── CUSTOMER ALERT HISTORY ──────────────────────────────────────────────────
export function CustomerAlertHistory() {
  const db = useDB()
  const navigate = useNavigate()
  
  // Filter active/inactive emergencies triggered by this customer
  const username = getCustUsername()
  const matchedUser = db.users.find(u => u.username === username) || {}
  const customerName = matchedUser.name || 'Ahmed Al Farsi'

  const myAlerts = db.emergencies.filter(e => e.owner === customerName)

  return (
    <div>
      <PageHeader title="Emergency Alert Log" sub="Audit records of scans and contact dial outcomes" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🚨" label="Total Alerts Logged" value={String(myAlerts.length)} delta="All-time safety triggers" color="danger" />
        <StatCard icon="⚠️" label="Active Crisis Scans" value={String(myAlerts.filter(a => a.status === 'alert').length)} delta="Currently active responder alerts" color="amber" />
        <StatCard icon="🛡️" label="Protected Safety Tags" value={String(db.customer_tags.filter(t => t.status === 'active').length)} delta="Click to configure devices" color="green" onClick={() => navigate('/customer/my_tags')} />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Tag token</th>
              <th>Incident Location</th>
              <th>Status</th>
              <th>Resolution Outcome Log</th>
              <th>Triggered Time</th>
            </tr>
          </thead>
          <tbody>
            {myAlerts.map((a, idx) => (
              <tr key={a.token + '-' + idx}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td><Mono>{a.token}</Mono></td>
                <td>📍 {a.location}</td>
                <td>
                  <Badge type={a.status === 'alert' ? 'danger' : 'inactive'}>
                    {a.label}
                  </Badge>
                </td>
                <td>{a.outcome}</td>
                <td>{a.time}</td>
              </tr>
            ))}
            {myAlerts.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-3)', padding: 20 }}>
                  No emergency alerts triggered yet. Your tags are fully secure.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── CUSTOMER REPORT MISSING ──────────────────────────────────────────────────
export function CustomerMissingReport() {
  const db = useDB()
  const navigate = useNavigate()
  const [plate, setPlate] = useState('')
  const [lastSeen, setLastSeen] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!plate || !lastSeen) return

    const username = getCustUsername()
    reportVehicleMissing(username, { plate, lastSeen })
    
    setSuccess(true)
    setPlate('')
    setLastSeen('')
    setTimeout(() => setSuccess(false), 3500)
  }

  return (
    <div>
      <PageHeader title="Report Vehicle Missing" sub="File theft report and lock NFC lookup pointers" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🚗" label="My Vehicles / Tags" value={String(db.customer_tags.length)} delta="Click to manage safety tags" color="green" onClick={() => navigate('/customer/my_tags')} />
        <StatCard icon="🔍" label="Missing Vehicles" value={String(db.customer_tags.filter(t => t.showMissing).length)} delta="Active alerts filed" color="danger" />
        <StatCard icon="🚨" label="Alert Scans Log" value={String(db.customer_scan_activity.length)} delta="Click to audit scan history" color="blue" onClick={() => navigate('/customer/emergency_history')} />
      </div>

      <div style={{ maxWidth: 540 }}>
        {success && (
          <AlertBanner type="danger" icon="🚨" text="Vehicle reported missing! Police checkpoints notified and NFC scanned logs linked." />
        )}
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormGroup label="Vehicle Plate Number">
                <FormInput value={plate} onChange={e => setPlate(e.target.value)} placeholder="e.g. Dubai A 12345" required />
              </FormGroup>
              <FormGroup label="Last Seen Location / Area">
                <FormInput value={lastSeen} onChange={e => setLastSeen(e.target.value)} placeholder="e.g. Al Quoz Industrial 3" required />
              </FormGroup>
              <div style={{ marginTop: 20 }}>
                <Btn type="submit" variant="danger" style={{ width: '100%' }}>🚨 File Missing Vehicle Report</Btn>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

// ── CUSTOMER BUY MORE ────────────────────────────────────────────────────────
export function CustomerBuyMore() {
  const products = [
    { title: '🚗 Vehicle Safety Sticker + NFC', price: '₹799', desc: 'Secure weatherproof windshield tag' },
    { title: '👴 Senior Care Medical Badge', price: '₹699', desc: 'NFC bracelet + emergency QR sticker' },
    { title: '👶 Kids Safety Backpack Tag', price: '₹599', desc: 'Silicone loops for school backpacks' },
    { title: '🐶 Pet Smart Collar Tag', price: '₹499', desc: 'Lightweight collar tag with QR' },
    { title: '🧳 Smart Luggage Tag', price: '₹599', desc: 'Durable travel bag leather loops' }
  ]

  return (
    <div>
      <PageHeader title="Order Products" sub="Purchase additional NFC & QR safety shields" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {products.map(p => (
          <Card key={p.title} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader title={p.title} sub={p.price} />
            <CardBody style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 16 }}>{p.desc}</p>
              <Btn variant="primary" style={{ width: '100%' }} onClick={() => alert('Order simulation! In production, this redirects to checkout.')}>
                🛒 Purchase Tag
              </Btn>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

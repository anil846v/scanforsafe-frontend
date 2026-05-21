import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Btn from '@/components/ui/Btn'
import { FormGroup, FormInput, FormSelect, TAG_OPTIONS } from '@/components/ui/index'
import { useEmergencyCountdown } from '@/hooks/useEmergencyCountdown'
import { Avatar, Mono } from '@/components/ui/index'
import { 
  addQRBatch, 
  addCustomer, 
  addRetailer, 
  addMarketingExec, 
  addVendor, 
  triggerEmergency 
} from '@/data/db'

// ── QR BATCH MODAL ─────────────────────────────────────────────────────────
export function QRBatchModal({ open, onClose }) {
  const [cat, setCat] = useState('🚗 Vehicle safety')
  const [qty, setQty] = useState('500')
  const [vendor, setVendor] = useState('PrintPro Dubai')
  const [assign, setAssign] = useState('— Admin stock —')

  const handleGenerate = () => {
    addQRBatch({ cat, qty, vendor, assign })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Generate QR batch"
      footer={
        <>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={handleGenerate}>Generate batch →</Btn>
        </>
      }
    >
      <FormGroup label="Category">
        <FormSelect value={cat} onChange={e => setCat(e.target.value)} options={TAG_OPTIONS} />
      </FormGroup>
      <FormGroup label="Quantity">
        <FormInput type="number" value={qty} onChange={e => setQty(e.target.value)} />
      </FormGroup>
      <FormGroup label="Vendor">
        <FormSelect value={vendor} onChange={e => setVendor(e.target.value)} options={['PrintPro Dubai', 'TagMaster India', 'NFC World']} />
      </FormGroup>
      <FormGroup label="Assign to retailer (optional)">
        <FormSelect value={assign} onChange={e => setAssign(e.target.value)} options={['— Admin stock —', 'SafeZone LLC', 'KidsSafe Franchise', 'TravelSafe Dubai', 'SeniorPlus Care']} />
      </FormGroup>
      <div style={{ background: 'var(--brand-pale)', borderRadius: 8, padding: 10, fontSize: 12, color: 'var(--brand)' }}>
        ✓ Each tag gets a unique secure token · QR + NFC share the same URL · Full audit trail
      </div>
    </Modal>
  )
}

// ── EMERGENCY MODAL ────────────────────────────────────────────────────────
export function EmergencyModal({ open, onClose, customerUsername, activeToken }) {
  const { count, dashOffset } = useEmergencyCountdown(open)

  // Trigger when countdown finishes or manual click
  const handleTrigger = () => {
    triggerEmergency(customerUsername || 'customer', activeToken || 'VH-3K9P-XLAW')
    onClose()
  }

  // React to countdown zero
  if (open && count === 0) {
    handleTrigger()
  }

  const dummyContacts = [
    { ini: 'SF', name: 'Sara Al Farsi', phone: '+971 50 987 6543', bg: '#E1F5EE', col: '#0F6E56' },
    { ini: 'KF', name: 'Khalid Al Farsi', phone: '+971 55 111 2233', bg: '#EBF3FB', col: '#185FA5' },
    { ini: 'FH', name: 'Dr. Fatima Hassan', phone: '+971 4 300 0000', bg: '#FAEEDA', col: '#BA7517' },
  ]

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="🚨 Report emergency"
      titleColor="var(--danger)"
      footer={
        <>
          <Btn onClick={onClose}>✕ Cancel</Btn>
          <Btn variant="danger" onClick={handleTrigger}>Trigger now →</Btn>
        </>
      }
    >
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 12px' }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(192,57,43,.15)" strokeWidth="8" />
            <circle
              cx="36" cy="36" r="28" fill="none"
              stroke="var(--danger)" strokeWidth="8"
              strokeDasharray="176"
              strokeDashoffset={dashOffset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 600, color: 'var(--danger)' }}>
            {count}
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Cancel within 5 seconds</div>
      </div>

      <div style={{ background: 'var(--danger-light)', borderRadius: 8, padding: 12, fontSize: 13, color: 'var(--danger)', marginBottom: 14 }}>
        Your emergency contacts will be reached in order. If none answer, an SMS with your location coordinates is broadcast to all.
      </div>

      {dummyContacts.map((c, i) => (
        <div key={c.ini} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: 'var(--surface-2)', borderRadius: 8, fontSize: 13, marginBottom: i < 2 ? 8 : 0 }}>
          <Avatar initials={c.ini} bg={c.bg} col={c.col} size={32} />
          <div>{c.name} · {c.phone}</div>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>
            {i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : 'rd'} call
          </span>
        </div>
      ))}
    </Modal>
  )
}

// ── ADD CUSTOMER MODAL ─────────────────────────────────────────────────────
export function AddCustomerModal({ open, onClose }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [tagCategory, setTagCategory] = useState('🚗 Vehicle safety')
  const [customToken, setCustomToken] = useState('')
  const [contactsCount, setContactsCount] = useState('2')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name || !phone) {
      setError('Please fill in Name and Phone number.')
      return
    }
    setError('')
    addCustomer({
      name,
      phone,
      tagCategory,
      token: customToken || null,
      contactsCount: Number(contactsCount)
    })
    // Reset form
    setName('')
    setPhone('')
    setCustomToken('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add new customer"
      footer={
        <>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSubmit}>Add customer</Btn>
        </>
      }
    >
      {error && (
        <div style={{ padding: 10, background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 8, fontSize: 13, marginBottom: 12 }}>
          {error}
        </div>
      )}
      <FormGroup label="Customer Full Name">
        <FormInput placeholder="e.g. John Doe" value={name} onChange={e => setName(e.target.value)} />
      </FormGroup>
      <FormGroup label="Mobile Number">
        <FormInput placeholder="e.g. +971 50 000 0000" value={phone} onChange={e => setPhone(e.target.value)} />
      </FormGroup>
      <FormGroup label="Tag Category">
        <FormSelect value={tagCategory} onChange={e => setTagCategory(e.target.value)} options={TAG_OPTIONS} />
      </FormGroup>
      <FormGroup label="Assign Token Serial (Optional - auto-generated if blank)">
        <FormInput placeholder="e.g. VH-XXXX-XXXX" value={customToken} onChange={e => setCustomToken(e.target.value)} />
      </FormGroup>
      <FormGroup label="Emergency Contacts Count">
        <FormSelect value={contactsCount} onChange={e => setContactsCount(e.target.value)} options={['1', '2', '3', '4']} />
      </FormGroup>
      <div style={{ background: 'var(--brand-pale)', borderRadius: 8, padding: 10, fontSize: 12, color: 'var(--brand)' }}>
        ✓ Automatically creates a customer login account. (Username: name without spaces, Password: 123)
      </div>
    </Modal>
  )
}

// ── ADD RETAILER MODAL ─────────────────────────────────────────────────────
export function AddRetailerModal({ open, onClose }) {
  const [name, setName] = useState('')
  const [city, setCity] = useState('Dubai')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name) {
      setError('Please enter a Retailer Name.')
      return
    }
    setError('')
    addRetailer({ name, city })
    setName('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Partner Retailer"
      footer={
        <>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSubmit}>Add retailer</Btn>
        </>
      }
    >
      {error && (
        <div style={{ padding: 10, background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 8, fontSize: 13, marginBottom: 12 }}>
          {error}
        </div>
      )}
      <FormGroup label="Retailer Shop Name">
        <FormInput placeholder="e.g. SuperSafe Retail" value={name} onChange={e => setName(e.target.value)} />
      </FormGroup>
      <FormGroup label="City / Location">
        <FormSelect value={city} onChange={e => setCity(e.target.value)} options={['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain']} />
      </FormGroup>
      <div style={{ background: 'var(--brand-pale)', borderRadius: 8, padding: 10, fontSize: 12, color: 'var(--brand)' }}>
        ✓ Registers a partner store login account. (Username: name without spaces, Password: 123)
      </div>
    </Modal>
  )
}

// ── ADD EXECUTIVE MODAL ────────────────────────────────────────────────────
export function AddExecutiveModal({ open, onClose }) {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('Dubai')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name) {
      setError('Please enter executive name.')
      return
    }
    setError('')
    addMarketingExec({ name, region })
    setName('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Marketing Executive"
      footer={
        <>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSubmit}>Add executive</Btn>
        </>
      }
    >
      {error && (
        <div style={{ padding: 10, background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 8, fontSize: 13, marginBottom: 12 }}>
          {error}
        </div>
      )}
      <FormGroup label="Full Name">
        <FormInput placeholder="e.g. Priya Nair" value={name} onChange={e => setName(e.target.value)} />
      </FormGroup>
      <FormGroup label="Assigned Region">
        <FormSelect value={region} onChange={e => setRegion(e.target.value)} options={['Dubai', 'Abu Dhabi', 'Sharjah', 'RAK', 'Fujairah']} />
      </FormGroup>
      <div style={{ background: 'var(--brand-pale)', borderRadius: 8, padding: 10, fontSize: 12, color: 'var(--brand)' }}>
        ✓ Registers a field executive login account. (Username: name without spaces, Password: 123)
      </div>
    </Modal>
  )
}

// ── ADD VENDOR MODAL ───────────────────────────────────────────────────────
export function AddVendorModal({ open, onClose }) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [turnaround, setTurnaround] = useState('3 days')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name || !location) {
      setError('Please fill in Name and Location.')
      return
    }
    setError('')
    addVendor({ name, location, turnaround })
    setName('')
    setLocation('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Vendor Supplier"
      footer={
        <>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSubmit}>Add vendor</Btn>
        </>
      }
    >
      {error && (
        <div style={{ padding: 10, background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 8, fontSize: 13, marginBottom: 12 }}>
          {error}
        </div>
      )}
      <FormGroup label="Vendor Name">
        <FormInput placeholder="e.g. SmartChips Corp" value={name} onChange={e => setName(e.target.value)} />
      </FormGroup>
      <FormGroup label="Factory Location">
        <FormInput placeholder="e.g. Bangalore, India" value={location} onChange={e => setLocation(e.target.value)} />
      </FormGroup>
      <FormGroup label="Avg Turnaround Time">
        <FormSelect value={turnaround} onChange={e => setTurnaround(e.target.value)} options={['2 days', '3 days', '5 days', '7 days', '14 days']} />
      </FormGroup>
    </Modal>
  )
}

// ── GENERIC DETAILS MODAL ──────────────────────────────────────────────────
export function DetailsModal({ open, onClose, title, content }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title || 'Details'}
      footer={<Btn variant="primary" onClick={onClose}>Close</Btn>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 0' }}>
        {content && Object.entries(content).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', borderBottom: '1px solid var(--border)', paddingBottom: 8, fontSize: 13 }}>
            <span style={{ fontWeight: 600, color: 'var(--text-2)', width: 140, textTransform: 'capitalize' }}>
              {k.replace(/([A-Z])/g, ' $1')}:
            </span>
            <span style={{ color: 'var(--text-1)', flex: 1, wordBreak: 'break-all' }}>
              {typeof v === 'object' ? JSON.stringify(v) : String(v)}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  )
}

import Modal from '@/components/ui/Modal'
import Btn from '@/components/ui/Btn'
import { FormGroup, FormInput, FormSelect, TAG_OPTIONS } from '@/components/ui/index'
import { useEmergencyCountdown } from '@/hooks/useEmergencyCountdown'
import { CUSTOMER_CONTACTS } from '@/data/mockData'
import { Avatar } from '@/components/ui/index'

// ── QR Batch Modal ─────────────────────────────────────────────────────────
export function QRBatchModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Generate QR batch"
      footer={
        <>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={onClose}>Generate batch →</Btn>
        </>
      }
    >
      <FormGroup label="Category">
        <FormSelect options={TAG_OPTIONS} />
      </FormGroup>
      <FormGroup label="Quantity">
        <FormInput type="number" defaultValue="500" />
      </FormGroup>
      <FormGroup label="Vendor">
        <FormSelect options={['PrintPro Dubai', 'TagMaster India', 'NFC World']} />
      </FormGroup>
      <FormGroup label="Assign to retailer (optional)">
        <FormSelect options={['— Admin stock —', 'SafeZone LLC', 'KidsSafe Franchise', 'TravelSafe Dubai']} />
      </FormGroup>
      <div style={{ background: 'var(--brand-pale)', borderRadius: 8, padding: 10, fontSize: 12, color: 'var(--brand)' }}>
        ✓ Each tag gets a unique secure token · QR + NFC share the same URL · Full audit trail
      </div>
    </Modal>
  )
}

// ── Emergency Modal ────────────────────────────────────────────────────────
export function EmergencyModal({ open, onClose }) {
  const { count, dashOffset } = useEmergencyCountdown(open)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="🚨 Report emergency"
      titleColor="var(--danger)"
      footer={
        <>
          <Btn onClick={onClose}>✕ Cancel</Btn>
          <Btn variant="danger" onClick={onClose}>Trigger now →</Btn>
        </>
      }
    >
      {/* Countdown */}
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

      {/* Info */}
      <div style={{ background: 'var(--danger-light)', borderRadius: 8, padding: 12, fontSize: 13, color: 'var(--danger)', marginBottom: 14 }}>
        Your 3 contacts will be called in order. If none answer, an SMS with your GPS location is sent to all.
      </div>

      {/* Contacts */}
      {CUSTOMER_CONTACTS.map((c, i) => (
        <div key={c.ini} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: 'var(--surface-2)', borderRadius: 8, fontSize: 13, marginBottom: i < 2 ? 8 : 0 }}>
          <Avatar initials={c.ini} bg={c.bg} col={c.col} size={32} />
          <div>{c.name} · {c.phone}</div>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-3)' }}>
            {i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : 'rd'}
          </span>
        </div>
      ))}
    </Modal>
  )
}

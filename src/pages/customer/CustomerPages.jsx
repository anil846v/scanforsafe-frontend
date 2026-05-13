import { useNavigate } from 'react-router-dom'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Btn from '@/components/ui/Btn'
import { Card, CardHeader, CardBody, AlertBanner, ActivityItem, Avatar, Mono, PageHeader, FormGroup, FormInput } from '@/components/ui/index'
import { CUSTOMER_TAGS, CUSTOMER_CONTACTS, CUSTOMER_SCAN_ACTIVITY, BUY_MORE_PRODUCTS } from '@/data/mockData'

export function CustomerDashboard({ openEmergency }) {
  const navigate = useNavigate()
  return (
    <div>
      <AlertBanner type="success" icon="✅" text="All your tags are active and ready. You're protected." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🔲" label="Active tags"        value="2" delta="Vehicle + Senior"  color="green" />
        <StatCard icon="📞" label="Emergency contacts" value="3" delta="All confirmed" deltaType="neu" color="blue" />
        <StatCard icon="📍" label="Scans received"     value="4" delta="Last 30 days"  deltaType="neu" color="amber" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <Card>
          <CardHeader title="My tags" action={<Btn size="sm" onClick={() => navigate('/customer/my_tags')}>View all →</Btn>} />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['🚗', 'Vehicle safety', 'VH-3K9P-XLAW', 'var(--brand-pale)', 'rgba(29,158,117,.2)'],
                ['👴', 'Senior care',    'SR-4MNP-QTYZ', 'var(--accent-light)', 'rgba(186,117,23,.2)'],
              ].map(([emoji, name, tok, bg, border]) => (
                <div key={tok} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: bg, border: `1px solid ${border}`, borderRadius: 10 }}>
                  <div style={{ fontSize: 28 }}>{emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{name}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: 'var(--text-3)' }}>{tok}</div>
                  </div>
                  <Badge type="active">Active</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Emergency contacts" action={<Btn size="sm" onClick={() => navigate('/customer/contacts')}>Edit →</Btn>} />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CUSTOMER_CONTACTS.map(c => (
              <div key={c.ini} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar initials={c.ini} bg={c.bg} col={c.col} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{c.phone}</div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-3)', background: 'var(--surface-2)', borderRadius: 5, padding: '2px 7px' }}>{c.priority}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Recent scan activity" />
        {CUSTOMER_SCAN_ACTIVITY.map((f, i) => <ActivityItem key={i} dot={f.col} text={f.text} ts={f.ts} />)}
      </Card>
    </div>
  )
}

export function CustomerTags() {
  const navigate = useNavigate()
  return (
    <div>
      <PageHeader title="My tags" sub="Manage your active safety tags" action={<Btn variant="primary" onClick={() => navigate('/customer/buy_more')}>➕ Buy more tags</Btn>} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {CUSTOMER_TAGS.map(t => (
          <Card key={t.token}>
            <CardBody>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 36 }}>{t.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: 'var(--text-3)' }}>{t.token}</div>
                </div>
                <Badge type="active">Active</Badge>
              </div>
              {t.stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 14 }}>
                  {t.stats.map(s => (
                    <div key={s.label} style={{ background: 'var(--surface-2)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-3)', fontWeight: 600 }}>{s.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 600, color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn size="sm">View QR code</Btn>
                <Btn size="sm">Edit contacts</Btn>
                {t.showMissing && <Btn size="sm" variant="danger">Report missing vehicle</Btn>}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function CustomerContacts() {
  return (
    <div>
      <PageHeader title="Emergency contacts" sub="Who gets called when your tag is triggered" />
      <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CUSTOMER_CONTACTS.map((c, i) => (
          <Card key={c.ini}>
            <CardBody>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Contact {i + 1}{i === 0 ? ' — priority call' : ''}</div>
                {c.badgeType && <Badge type={c.badgeType}>{c.badgeLabel}</Badge>}
              </div>
              <FormGroup label="Name"><FormInput defaultValue={c.name} /></FormGroup>
              <FormGroup label="Phone"><FormInput defaultValue={c.phone} /></FormGroup>
              <FormGroup label="Relationship"><FormInput defaultValue={c.rel} /></FormGroup>
            </CardBody>
          </Card>
        ))}
        <Btn variant="primary">Save contacts</Btn>
      </div>
    </div>
  )
}

export function CustomerProfile() {
  return (
    <div>
      <PageHeader title="My profile" sub="Personal information on your tag's emergency page" />
      <div style={{ maxWidth: 480 }}>
        <Card>
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FormGroup label="First name"><FormInput defaultValue="Ahmed" /></FormGroup>
              <FormGroup label="Last name"><FormInput defaultValue="Al Farsi" /></FormGroup>
            </div>
            <FormGroup label="Mobile"><FormInput defaultValue="+971 50 123 4567" /></FormGroup>
            <FormGroup label="Blood type (optional)"><FormInput defaultValue="O+" /></FormGroup>
            <FormGroup label="Medical notes (shown on emergency page)"><FormInput placeholder="e.g. diabetic, allergic to penicillin" /></FormGroup>
            <FormGroup label="Vehicle plate (shown on emergency page)"><FormInput defaultValue="Dubai A 12345" /></FormGroup>
            <Btn variant="primary">Save profile</Btn>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export function CustomerAlertHistory() {
  return (
    <div>
      <PageHeader title="Alert history" sub="All emergency events on your tags" />
      <Card>
        <table>
          <thead><tr><th>Tag</th><th>Triggered by</th><th>Location</th><th>Contacts reached</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>🚗 VH-3K9P</td><td>Public scan</td><td>Dubai South</td><td>Sara Al Farsi ✓</td><td>6 May</td><td><Badge type="inactive">Resolved</Badge></td></tr>
            <tr><td>👴 SR-4MNP</td><td>Public scan</td><td>Jumeirah</td><td>Sara Al Farsi ✓</td><td>2 Apr</td><td><Badge type="inactive">Resolved</Badge></td></tr>
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function CustomerMissingReport() {
  return (
    <div>
      <PageHeader title="Report missing vehicle" sub="Alert the community instantly" />
      <div style={{ maxWidth: 480 }}>
        <AlertBanner type="warn" icon="⚠️" text="Filing a false report is a violation of our terms and may have legal consequences." />
        <Card>
          <CardBody>
            <FormGroup label="Vehicle plate"><FormInput defaultValue="Dubai A 12345" /></FormGroup>
            <FormGroup label="Make & model"><FormInput placeholder="e.g. Toyota Camry 2023 — White" /></FormGroup>
            <FormGroup label="Last known location"><FormInput placeholder="e.g. Al Quoz Mall parking, Dubai" /></FormGroup>
            <FormGroup label="Time of discovery"><FormInput type="datetime-local" /></FormGroup>
            <FormGroup label="Additional details"><FormInput placeholder="Any special features, damage, etc." /></FormGroup>
            <div style={{ background: 'var(--info-light)', borderRadius: 8, padding: 10, fontSize: 12, color: 'var(--info)', marginBottom: 14 }}>
              ℹ️ Once submitted, anyone who scans your vehicle's QR tag will see the missing vehicle alert and can submit a sighting.
            </div>
            <Btn variant="danger" style={{ width: '100%' }}>🔍 File missing vehicle report</Btn>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export function CustomerBuyMore() {
  return (
    <div>
      <PageHeader title="Buy more tags" sub="Protect more of what matters" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {BUY_MORE_PRODUCTS.map(p => (
          <Card key={p.name} style={{ cursor: 'pointer' }}>
            <CardBody style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{p.emoji}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 12 }}>{p.sub}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--brand)', marginBottom: 12 }}>{p.price}</div>
              <Btn variant="primary" style={{ width: '100%' }}>Add to cart</Btn>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Btn from '@/components/ui/Btn'
import { Card, CardHeader, CardBody, AlertBanner, ActivityItem, Avatar, Mono, ProgressRow, PageHeader } from '@/components/ui/index'
import { useLiveFeed } from '@/hooks/useLiveFeed'
import { QR_BATCHES, ADMIN_CUSTOMERS, ADMIN_RETAILERS } from '@/data/mockData'

// ── Dashboard ──────────────────────────────────────────────────────────────
export function AdminDashboard({ openQRModal }) {
  const navigate = useNavigate()
  const feed = useLiveFeed()

  return (
    <div>
      <AlertBanner type="danger" icon="🚨" text="2 active emergencies — Dubai South & Al Ain" action="View →" onAction={() => navigate('/admin/emergencies')} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🔲" label="QR Issued"          value="12,480" delta="↑ 340 this week" color="green" />
        <StatCard icon="✅" label="Activated"           value="9,214"  delta="73.8% rate"      color="amber" />
        <StatCard icon="🚨" label="Emergencies (30d)"  value="187"    delta="↑ 12 vs last month" deltaType="down" color="red" />
        <StatCard icon="💰" label="Revenue MTD"         value="₹4.2L"  delta="↑ 18%"           color="blue" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 14 }}>
        <Card>
          <CardHeader title="QR Scans — 14 days" sub="All tag types" />
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
                <text x="36" y="40" textAnchor="middle" fontSize="11" fontWeight="600" fill="#111" fontFamily="DM Sans">12.4k</text>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[['#1D9E75', 'Vehicle', '5,840'], ['#BA7517', 'Senior', '2,650'], ['#185FA5', 'Kids', '1,820'], ['#6C4AB7', 'Pet/Bag', '2,170']].map(([c, l, v]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12 }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: c, flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-2)' }}>{l}</span>
                    <span style={{ fontWeight: 600, marginLeft: 6 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <CardHeader title="Live activity" action={<Badge type="active">● Live</Badge>} />
          {feed.map((f, i) => <ActivityItem key={i} dot={f.col} text={f.text} ts={f.ts} />)}
        </Card>
        <Card>
          <CardHeader title="Region breakdown" />
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {[['Dubai', '3,840'], ['Abu Dhabi', '2,210'], ['Sharjah', '1,450'], ['Others', '1,714']].map(([r, v]) => (
                <div key={r} style={{ background: 'var(--surface-2)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{r}</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--brand)' }}>{v}</div>
                </div>
              ))}
            </div>
            <ProgressRow label="Vehicle"    pct={70} color="var(--brand-mid)" />
            <ProgressRow label="Senior care" pct={20} color="var(--accent)" />
            <ProgressRow label="Kids"       pct={8}  color="var(--info)" />
            <ProgressRow label="Pet/Bag"    pct={4}  color="var(--purple)" />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

// ── QR Management ──────────────────────────────────────────────────────────
export function AdminQR({ openQRModal }) {
  return (
    <div>
      <PageHeader title="QR Management" sub="Generate, assign and track batches" action={<Btn variant="primary" onClick={openQRModal}>＋ New Batch</Btn>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🔲" label="Total Generated"  value="12,480" delta="↑ 500 this week"     color="green" />
        <StatCard icon="📦" label="Unassigned Stock"  value="3,266"  delta="In admin inventory"  deltaType="neu" color="amber" />
        <StatCard icon="🏪" label="With Retailers"    value="2,840"  delta="18 outlets"          deltaType="neu" color="blue" />
        <StatCard icon="⚠️" label="Pending Dispatch"  value="4"      delta="Awaiting ship"        deltaType="down" color="red" />
      </div>
      <Card>
        <table>
          <thead><tr><th>Batch ID</th><th>Category</th><th>Qty</th><th>Vendor</th><th>Assigned to</th><th>Status</th><th>Created</th><th></th></tr></thead>
          <tbody>
            {QR_BATCHES.map(b => (
              <tr key={b.id}>
                <td><Mono>{b.id}</Mono></td>
                <td>{b.cat}</td>
                <td>{b.qty}</td>
                <td>{b.vendor}</td>
                <td>{b.assign}</td>
                <td><Badge type={b.status}>{b.label}</Badge></td>
                <td>{b.date}</td>
                <td><Btn size="xs">View</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── Customers ──────────────────────────────────────────────────────────────
export function AdminCustomers() {
  const statusLabel = { active: 'Active', pending: 'Not activated', inactive: 'Inactive' }
  return (
    <div>
      <PageHeader title="Customers" sub="All registered tag owners" action={<Btn variant="primary">＋ Add customer</Btn>} />
      <Card>
        <table>
          <thead><tr><th>Customer</th><th>Phone</th><th>Tag</th><th>Token</th><th>Contacts</th><th>Status</th><th>Joined</th></tr></thead>
          <tbody>
            {ADMIN_CUSTOMERS.map(c => (
              <tr key={c.token}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar initials={c.ini} bg={c.bg} col={c.col} />{c.name}</div></td>
                <td>{c.phone}</td><td>{c.tag}</td>
                <td><Mono>{c.token}</Mono></td>
                <td>{c.contacts}</td>
                <td><Badge type={c.status}>{statusLabel[c.status]}</Badge></td>
                <td>{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── Retailers ──────────────────────────────────────────────────────────────
export function AdminRetailers() {
  return (
    <div>
      <PageHeader title="Retailers & Franchises" sub="Manage partner outlets" action={<Btn variant="primary">＋ Add retailer</Btn>} />
      <Card>
        <table>
          <thead><tr><th>Retailer</th><th>City</th><th>Allocated</th><th>Sold</th><th>Stock left</th><th>Commission</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {ADMIN_RETAILERS.map(r => (
              <tr key={r.name}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar initials={r.ini} bg={r.bg} col={r.col} />{r.name}</div></td>
                <td>{r.city}</td><td>{r.alloc}</td><td>{r.sold}</td><td>{r.stock}</td><td>{r.commission}</td>
                <td><Badge type={r.status}>{r.status === 'active' ? 'Active' : 'Sold out'}</Badge></td>
                <td><Btn size="xs">Manage</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

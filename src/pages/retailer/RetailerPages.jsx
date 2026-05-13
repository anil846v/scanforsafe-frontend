import { useNavigate } from 'react-router-dom'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Btn from '@/components/ui/Btn'
import { Card, CardHeader, CardBody, AlertBanner, ActivityItem, Avatar, Mono, PageHeader, FormGroup, FormInput, FormSelect, TAG_OPTIONS } from '@/components/ui/index'
import { RETAILER_INVENTORY, RETAILER_SALES, RETAILER_CUSTOMERS, RETAILER_EARNINGS } from '@/data/mockData'

export function RetailerDashboard() {
  const navigate = useNavigate()
  return (
    <div>
      <AlertBanner type="warn" icon="⚠️" text="Stock running low — 158 tags remaining. Request restock now." action="Request →" onAction={() => navigate('/retailer/restock')} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="📦" label="Tags in stock"  value="158"    delta="↓ Low stock"     deltaType="down" color="green" />
        <StatCard icon="💳" label="Tags sold"       value="342"    delta="↑ 24 this week"               color="amber" />
        <StatCard icon="👤" label="My customers"    value="318"    delta="↑ 18 this month"              color="blue" />
        <StatCard icon="💰" label="Earnings MTD"    value="₹7,200" delta="↑ 12%"                        color="green" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <CardHeader title="Sales this week" />
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginBottom: 8 }}>
              {[['Mon', 40], ['Tue', 55], ['Wed', 70], ['Thu', 100, true], ['Fri', 10]].map(([d, h, hi]) => (
                <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ flex: 1, width: '100%', background: hi ? 'var(--brand-mid)' : 'var(--brand-light)', borderRadius: '4px 4px 0 0', minHeight: h * 0.6 }} />
                  <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{d}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)' }}>
              Total this week: <strong style={{ color: 'var(--text-1)' }}>24 tags sold</strong>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent sales" />
          {[['var(--brand-mid)', '🚗 Vehicle tag — <strong>Ahmed Al Farsi</strong>', 'Today'],
            ['var(--accent)',    '👴 Senior tag — <strong>Layla Mahmoud</strong>',   'Today'],
            ['var(--info)',      '👶 Kids tag — <strong>Omar Khalil</strong>',        'Yesterday'],
            ['var(--brand-mid)', '🚗 Vehicle tag — <strong>Hana Said</strong>',      'Yesterday'],
          ].map((f, i) => <ActivityItem key={i} dot={f[0]} text={f[1]} ts={f[2]} />)}
        </Card>
      </div>
    </div>
  )
}

export function RetailerInventory() {
  return (
    <div>
      <PageHeader title="Inventory" sub="Your tag stock levels" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🚗" label="Vehicle tags" value="82" delta="In stock" deltaType="neu" color="green" />
        <StatCard icon="👴" label="Senior tags"  value="34" delta="↓ Low"    deltaType="down" color="amber" />
        <StatCard icon="👶" label="Kids tags"    value="12" delta="↓ Critical" deltaType="down" color="red" />
      </div>
      <Card>
        <table>
          <thead><tr><th>Tag type</th><th>In stock</th><th>Allocated</th><th>Sold</th><th>Activation rate</th><th>Action</th></tr></thead>
          <tbody>
            {RETAILER_INVENTORY.map(r => (
              <tr key={r.type}>
                <td>{r.type}</td><td>{r.stock}</td><td>{r.alloc}</td><td>{r.sold}</td>
                <td><Badge type={r.status}>{r.rate}</Badge></td>
                <td><Btn size="xs" variant={r.stock < 15 ? 'danger' : 'default'}>{r.stock < 15 ? 'Urgent restock' : 'Request more'}</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function RetailerActivate() {
  return (
    <div>
      <PageHeader title="Activate a tag" sub="Register a customer's QR tag in-store" />
      <div style={{ maxWidth: 480 }}>
        <Card>
          <CardHeader title="Customer registration" />
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FormGroup label="First name"><FormInput defaultValue="Ahmed" /></FormGroup>
              <FormGroup label="Last name"><FormInput defaultValue="Al Farsi" /></FormGroup>
            </div>
            <FormGroup label="Mobile number"><FormInput defaultValue="+971 50 123 4567" /></FormGroup>
            <FormGroup label="Tag category"><FormSelect options={TAG_OPTIONS} /></FormGroup>
            <FormGroup label="Token / QR serial (scan or enter)"><FormInput placeholder="e.g. VH-XXXX-XXXX" style={{ fontFamily: "'DM Mono',monospace" }} /></FormGroup>
            <FormGroup label="Emergency contact 1"><FormInput placeholder="Name — phone" /></FormGroup>
            <FormGroup label="Emergency contact 2"><FormInput placeholder="Name — phone (optional)" /></FormGroup>
            <Btn variant="primary" style={{ width: '100%' }}>✓ Activate tag & register customer</Btn>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export function RetailerSales() {
  return (
    <div>
      <PageHeader title="Sales log" sub="Your complete transaction history" action={<Btn>📤 Export</Btn>} />
      <Card>
        <table>
          <thead><tr><th>Customer</th><th>Tag type</th><th>Token</th><th>Price</th><th>Commission</th><th>Date</th></tr></thead>
          <tbody>
            {RETAILER_SALES.map(s => (
              <tr key={s.token}>
                <td>{s.customer}</td><td>{s.type}</td>
                <td><Mono>{s.token}</Mono></td>
                <td>{s.price}</td><td>{s.commission}</td><td>{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function RetailerCustomers() {
  return (
    <div>
      <PageHeader title="My customers" sub="Customers registered through your store" />
      <Card>
        <table>
          <thead><tr><th>Customer</th><th>Tag</th><th>Token</th><th>Contacts</th><th>Status</th><th>Joined</th></tr></thead>
          <tbody>
            {RETAILER_CUSTOMERS.map(c => (
              <tr key={c.token}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar initials={c.ini} bg={c.bg} col={c.col} />{c.name}</div></td>
                <td>{c.tag}</td>
                <td><Mono>{c.token}</Mono></td>
                <td>{c.contacts}</td>
                <td><Badge type={c.status}>Active</Badge></td>
                <td>{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function RetailerEarnings() {
  return (
    <div>
      <PageHeader title="My earnings" sub="Commission and payout history" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="💰" label="Pending payout" value="₹7,200"  delta="72 tags this cycle"  color="green" />
        <StatCard icon="✅" label="Total earned"   value="₹34,200" delta="Since joining"        color="blue" />
        <StatCard icon="📅" label="Next payout"    value="15 May"  delta="In 8 days" deltaType="neu" color="amber" />
      </div>
      <Card>
        <table>
          <thead><tr><th>Cycle</th><th>Tags sold</th><th>Rate</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {RETAILER_EARNINGS.map(e => (
              <tr key={e.cycle}>
                <td>{e.cycle}</td><td>{e.tags}</td><td>{e.rate}</td><td>{e.total}</td>
                <td><Badge type={e.status}>{e.status === 'active' ? 'Paid' : 'Pending'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function RetailerRestock() {
  return (
    <div>
      <PageHeader title="Request restock" sub="Order more tags from admin" />
      <div style={{ maxWidth: 480 }}>
        <Card>
          <CardBody>
            <FormGroup label="Tag category"><FormSelect options={['🚗 Vehicle safety', '👶 Kids safety — urgent', '👴 Senior care', '🐶 Pet', '🧳 Luggage']} /></FormGroup>
            <FormGroup label="Quantity requested"><FormInput type="number" defaultValue="100" /></FormGroup>
            <FormGroup label="Priority"><FormSelect options={['Normal (3–5 days)', 'Urgent (1–2 days)']} /></FormGroup>
            <FormGroup label="Notes to admin"><FormInput placeholder="e.g. Kids tags almost out, school season peak" /></FormGroup>
            <Btn variant="primary" style={{ width: '100%' }}>Submit restock request →</Btn>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

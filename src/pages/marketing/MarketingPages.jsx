import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Btn from '@/components/ui/Btn'
import { Card, CardHeader, CardBody, AlertBanner, ActivityItem, Mono, PageHeader, FormGroup, FormInput, FormSelect, TAG_OPTIONS } from '@/components/ui/index'
import { MKT_LEADS, MKT_SALES, MKT_COMMISSIONS } from '@/data/mockData'

export function MktDashboard() {
  return (
    <div>
      <AlertBanner type="success" icon="🏆" text="You're on track! 42/50 customers this month — 8 more to hit your target bonus." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="👤" label="Customers this month" value="42"     delta="84% of target"           color="purple" />
        <StatCard icon="💳" label="Tags sold"            value="58"     delta="↑ 8 this week"           color="green" />
        <StatCard icon="💰" label="Commission due"       value="₹14,500" delta="Payout: 15 May"         color="amber" />
        <StatCard icon="🔄" label="Conversion rate"      value="72%"    delta="↑ 4% vs last month"      color="blue" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <CardHeader title="Target progress — May" />
          <CardBody>
            {[['Customers onboarded', '42 / 50', 84, 'var(--purple)'], ['Tags sold', '58 / 70', 83, 'var(--brand-mid)'], ['Revenue contributed', '₹40,600 / ₹50,000', 81, 'var(--accent)']].map(([label, val, pct, col]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: 'var(--text-2)' }}>{label}</span>
                  <span style={{ fontWeight: 600 }}>{val}</span>
                </div>
                <div style={{ background: 'var(--surface-2)', borderRadius: 4, height: 10, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 4, background: col, width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent onboardings" />
          {[['var(--brand-mid)', '🚗 <strong>Ahmed Al Farsi</strong> — Vehicle tag · Dubai Hills', 'Today'],
            ['var(--accent)',    '👴 <strong>Mona Al Rashidi</strong> — Senior tag · Jumeirah',    'Today'],
            ['var(--info)',      '👶 <strong>Hassan Karimi</strong> — Kids tag · Deira',            'Yesterday'],
            ['var(--brand-mid)', '🚗 <strong>Lina Fawaz</strong> — Vehicle tag · Marina',          'Yesterday'],
          ].map((f, i) => <ActivityItem key={i} dot={f[0]} text={f[1]} ts={f[2]} />)}
        </Card>
      </div>
    </div>
  )
}

export function MktOnboard() {
  return (
    <div>
      <PageHeader title="Onboard new customer" sub="Register a customer and assign a tag" />
      <div style={{ maxWidth: 500 }}>
        <Card>
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FormGroup label="First name"><FormInput placeholder="e.g. Sara" /></FormGroup>
              <FormGroup label="Last name"><FormInput placeholder="e.g. Hamdan" /></FormGroup>
            </div>
            <FormGroup label="Mobile"><FormInput placeholder="+971 50 …" /></FormGroup>
            <FormGroup label="Emirates / city"><FormInput placeholder="e.g. Dubai" /></FormGroup>
            <FormGroup label="Tag category"><FormSelect options={TAG_OPTIONS} /></FormGroup>
            <FormGroup label="Emergency contact 1"><FormInput placeholder="Name — phone" /></FormGroup>
            <FormGroup label="Emergency contact 2 (optional)"><FormInput placeholder="Name — phone" /></FormGroup>
            <FormGroup label="Tag token / serial"><FormInput placeholder="VH-XXXX-XXXX" style={{ fontFamily: "'DM Mono',monospace" }} /></FormGroup>
            <div style={{ background: 'var(--brand-pale)', borderRadius: 8, padding: 10, fontSize: 12, color: 'var(--brand)', marginBottom: 14 }}>
              ✓ Upon submit, a commission of ₹250 is logged to your account automatically.
            </div>
            <Btn variant="primary" style={{ width: '100%' }}>Register customer & log commission →</Btn>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export function MktLeads() {
  return (
    <div>
      <PageHeader title="My leads" sub="Prospects you've contacted" />
      <Card>
        <table>
          <thead><tr><th>Name</th><th>Phone</th><th>Area</th><th>Interest</th><th>Status</th><th>Follow up</th></tr></thead>
          <tbody>
            {MKT_LEADS.map(l => (
              <tr key={l.name}>
                <td>{l.name}</td><td>{l.phone}</td><td>{l.area}</td><td>{l.interest}</td>
                <td><Badge type={l.status}>{l.label}</Badge></td>
                <td>{l.followUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function MktSales() {
  return (
    <div>
      <PageHeader title="My sales" sub="All customers I onboarded" />
      <Card>
        <table>
          <thead><tr><th>Customer</th><th>Tag</th><th>Token</th><th>Commission</th><th>Date</th></tr></thead>
          <tbody>
            {MKT_SALES.map(s => (
              <tr key={s.token}>
                <td>{s.customer}</td><td>{s.tag}</td>
                <td><Mono>{s.token}</Mono></td>
                <td>{s.commission}</td><td>{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function MktCommissions() {
  return (
    <div>
      <PageHeader title="My commissions" sub="Earnings and payout history" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="💰" label="Due this cycle"   value="₹14,500"  delta="58 tags"       color="purple" />
        <StatCard icon="✅" label="All-time earned"  value="₹88,250"  delta="Since joining" color="green" />
        <StatCard icon="📅" label="Next payout"      value="15 May"   delta="In 8 days" deltaType="neu" color="amber" />
      </div>
      <Card>
        <table>
          <thead><tr><th>Cycle</th><th>Tags</th><th>Rate</th><th>Bonus</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {MKT_COMMISSIONS.map(c => (
              <tr key={c.cycle}>
                <td>{c.cycle}</td><td>{c.tags}</td><td>{c.rate}</td><td>{c.bonus}</td><td>{c.total}</td>
                <td><Badge type={c.status}>{c.status === 'active' ? 'Paid' : 'Pending'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function MktTargets() {
  return (
    <div>
      <PageHeader title="My targets" sub="Monthly performance goals" />
      <Card>
        <CardBody>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'var(--purple-light)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--purple)', marginBottom: 8 }}>Customers target</div>
              <div style={{ fontSize: 32, fontWeight: 600 }}>42<span style={{ fontSize: 18, color: 'var(--text-3)' }}>/50</span></div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>8 more to bonus tier</div>
            </div>
            <div style={{ background: 'var(--brand-light)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--brand)', marginBottom: 8 }}>Tags sold target</div>
              <div style={{ fontSize: 32, fontWeight: 600 }}>58<span style={{ fontSize: 18, color: 'var(--text-3)' }}>/70</span></div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>12 more to hit</div>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 14, background: 'var(--accent-light)', borderRadius: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 6 }}>🎯 Bonus unlock: hit 50 customers → earn ₹3,000 extra</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>You need just 8 more customers this month. At your current pace, you'll hit it by 12 May.</div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

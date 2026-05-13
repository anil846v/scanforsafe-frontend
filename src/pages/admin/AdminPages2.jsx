import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Btn from '@/components/ui/Btn'
import { Card, AlertBanner, Avatar, Mono, PageHeader } from '@/components/ui/index'
import { ADMIN_EMERGENCIES, ADMIN_MISSING, ADMIN_VENDORS, ADMIN_COMMISSIONS, ADMIN_MARKETING_EXECS } from '@/data/mockData'

export function AdminEmergencies() {
  return (
    <div>
      <PageHeader title="Emergency log" sub="All triggered emergency events" action={<Badge type="alert" style={{ padding: '6px 14px' }}>● 2 active</Badge>} />
      <AlertBanner type="danger" icon="🚨" text="VH-3K9P-XLAW — Dubai South · 2 min ago · Contact 1 answered" action="Monitor →" />
      <AlertBanner type="warn"   icon="⚠️" text="SR-8XKL-MNPQ — Al Ain · 14 min ago · SMS sent (no answer)" action="Monitor →" />
      <Card>
        <table>
          <thead><tr><th>Token</th><th>Owner</th><th>Category</th><th>Location</th><th>Outcome</th><th>Status</th><th>Time</th></tr></thead>
          <tbody>
            {ADMIN_EMERGENCIES.map(e => (
              <tr key={e.token}>
                <td><Mono>{e.token}</Mono></td>
                <td>{e.owner}</td><td>{e.cat}</td><td>{e.location}</td><td>{e.outcome}</td>
                <td><Badge type={e.status}>{e.label}</Badge></td>
                <td>{e.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function AdminMissing() {
  return (
    <div>
      <PageHeader title="Missing vehicle alerts" sub="Community recovery tracking" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🚗" label="Active alerts"       value="7"   delta="↑ 2 today"     deltaType="down" color="red" />
        <StatCard icon="✅" label="Recovered (30d)"     value="23"  delta="82% rate"                        color="green" />
        <StatCard icon="👁️" label="Community sightings" value="145" delta="Last 30 days"                   color="amber" />
      </div>
      <Card>
        <table>
          <thead><tr><th>Plate</th><th>Owner</th><th>Reported</th><th>Last seen</th><th>Sightings</th><th>Status</th></tr></thead>
          <tbody>
            {ADMIN_MISSING.map(m => (
              <tr key={m.plate}>
                <td><strong>{m.plate}</strong></td>
                <td>{m.owner}</td><td>{m.reported}</td><td>{m.lastSeen}</td><td>{m.sightings}</td>
                <td><Badge type={m.status}>{m.label}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function AdminVendors() {
  return (
    <div>
      <PageHeader title="Vendors" sub="QR sticker and NFC chip suppliers" action={<Btn variant="primary">＋ Add vendor</Btn>} />
      <Card>
        <table>
          <thead><tr><th>Vendor</th><th>Location</th><th>Batches</th><th>Total tags</th><th>Avg turnaround</th><th>Status</th></tr></thead>
          <tbody>
            {ADMIN_VENDORS.map(v => (
              <tr key={v.name}>
                <td><strong>{v.name}</strong></td>
                <td>{v.location}</td><td>{v.batches}</td><td>{v.total}</td><td>{v.turnaround}</td>
                <td><Badge type={v.status}>{v.status === 'active' ? 'Active' : 'Pending order'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function AdminCommissions() {
  return (
    <div>
      <PageHeader title="Commissions & payouts" sub="All sales channels" action={<Btn variant="primary">Process payouts</Btn>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="💰" label="Pending payout" value="₹32,750" delta="6 execs"      color="green" />
        <StatCard icon="✅" label="Paid this month" value="₹1.1L"  delta="↑ 22%"        color="blue" />
        <StatCard icon="🏪" label="Retailer margin" value="₹84,600" delta="18 retailers" deltaType="neu" color="amber" />
      </div>
      <Card>
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Sales</th><th>Rate</th><th>Amount due</th><th>Status</th></tr></thead>
          <tbody>
            {ADMIN_COMMISSIONS.map(c => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td><Badge type={c.roleType}>{c.roleLabel}</Badge></td>
                <td>{c.sales}</td><td>{c.rate}</td><td>{c.amount}</td>
                <td><Badge type={c.status}>{c.status === 'active' ? 'Paid' : 'Pending'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function AdminMarketing() {
  return (
    <div>
      <PageHeader title="Marketing Team" sub="Field executives performance" action={<Btn variant="primary">＋ Add executive</Btn>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="📣" label="Executives"          value="12"     delta="4 regions"      color="purple" />
        <StatCard icon="👤" label="Customers onboarded" value="340"    delta="↑ 28 this week" color="green" />
        <StatCard icon="💰" label="Commission pending"  value="₹32,750" delta="6 execs" deltaType="neu" color="amber" />
      </div>
      <Card>
        <table>
          <thead><tr><th>Executive</th><th>Region</th><th>Customers</th><th>Tags sold</th><th>Conversion</th><th>Commission due</th><th>Status</th></tr></thead>
          <tbody>
            {ADMIN_MARKETING_EXECS.map(e => (
              <tr key={e.name}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar initials={e.ini} bg={e.bg} col={e.col} />{e.name}</div></td>
                <td>{e.region}</td><td>{e.customers}</td><td>{e.tags}</td><td>{e.conversion}</td><td>{e.commission}</td>
                <td><Badge type={e.status}>{e.status === 'active' ? 'Active' : 'On leave'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function AdminReports() {
  return (
    <div>
      <PageHeader title="Reports" sub="Platform analytics and exports" action={<Btn>📤 Export all</Btn>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="📊" label="Activation rate"    value="73.8%" delta="↑ 2.1% MoM"           color="green" />
        <StatCard icon="📞" label="Contact success"    value="91.2%" delta="Emergencies reached"    color="blue" />
        <StatCard icon="⏱️" label="Avg response time"  value="38s"   delta="↓ 4s vs last month"    color="amber" />
        <StatCard icon="🔁" label="Renewal rate"       value="64%"   delta="Annual subs" deltaType="neu" color="purple" />
      </div>
      <AlertBanner type="info" icon="ℹ️" text="Last full export: 1 May 2026 · 14,320 records · CSV + PDF available" action="Download →" />
    </div>
  )
}

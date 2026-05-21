import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '@/components/ui/StatCard'
import Badge, { CategoryBadge } from '@/components/ui/Badge'
import Btn from '@/components/ui/Btn'
import { Card, CardHeader, CardBody, FormGroup, FormInput, FormSelect, Mono, PageHeader, ProgressRow } from '@/components/ui/index'
import { useDB } from '@/hooks/useDB'
import { activateMarketingOnboard, editRecord } from '@/data/db'

// Helper to get marketing executive name
function getExecName(db) {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
  return user.name || 'Priya Nair'
}

// Helper to get marketing username
function getExecUsername() {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
  return user.username || 'marketing'
}

// ── MARKETING DASHBOARD ─────────────────────────────────────────────────────
export function MktDashboard() {
  const db = useDB()
  const navigate = useNavigate()
  const exName = getExecName(db)
  const exec = db.marketing_execs.find(e => e.name === exName) || { customers: 42, tags: 58, conversion: '72%', commission: '₹14,500' }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="👤" label="My Customers" value={String(exec.customers)} delta="Onboarded directly" color="blue" onClick={() => navigate('/marketing/my_sales')} />
        <StatCard icon="🏷️" label="Tags Sold" value={String(exec.tags)} delta="Active activations" color="green" onClick={() => navigate('/marketing/my_sales')} />
        <StatCard icon="📈" label="Conversion rate" value={exec.conversion} delta="Leads to customers" color="amber" onClick={() => navigate('/marketing/my_leads')} />
        <StatCard icon="💰" label="Cycle Commission" value={exec.commission} delta="Accumulated (₹250/tag)" color="purple" onClick={() => navigate('/marketing/commissions_mkt')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, marginBottom: 14 }}>
        <Card>
          <CardHeader title="My recent onboardings" />
          <table>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>Customer</th>
                <th>Category</th>
                <th>Token Serial</th>
                <th>Commission</th>
                <th>Onboard Date</th>
              </tr>
            </thead>
            <tbody>
              {db.mkt_sales.slice(0, 5).map((s, idx) => (
                <tr key={s.token + '-' + idx}>
                  <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                  <td>{s.customer}</td>
                  <td>{s.tag} tag</td>
                  <td><Mono>{s.token}</Mono></td>
                  <td>{s.commission}</td>
                  <td>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <CardHeader title="Current targets progress" />
          <CardBody>
            <ProgressRow label="Tags Target" pct={Math.round((exec.tags / 80) * 100)} color="var(--brand)" />
            <ProgressRow label="Lead Calls" pct={68} color="var(--info)" />
            <ProgressRow label="Conversions" pct={72} color="var(--accent)" />
            <div style={{ background: 'var(--brand-pale)', borderRadius: 8, padding: '10px 12px', fontSize: 12, color: 'var(--brand)', marginTop: 12, fontWeight: 500 }}>
              💡 Hit 80 tags to unlock the monthly bonus pool of ₹2,000!
            </div>
          </CardBody>
        </Card>
      </div>

      {/* SVG Line Chart for Conversions */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <Card>
          <CardHeader title="Daily Lead Conversions" sub="Number of prospects converted to active subscribers (Last 7 Days)" />
          <CardBody>
            <div style={{ padding: '10px 0' }}>
              <svg width="100%" height="150" viewBox="0 0 450 150" preserveAspectRatio="none">
                {/* Horizontal gridlines */}
                <line x1="40" y1="15" x2="430" y2="15" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="45" x2="430" y2="45" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="75" x2="430" y2="75" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="105" x2="430" y2="105" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="130" x2="430" y2="130" stroke="var(--text-3)" strokeWidth="1.5" />

                {/* Y Labels */}
                <text x="30" y="18" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">20</text>
                <text x="30" y="48" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">15</text>
                <text x="30" y="78" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">10</text>
                <text x="30" y="108" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">5</text>
                <text x="30" y="133" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">0</text>

                {/* SVG Curve Path */}
                <path 
                  d="M 65,114 Q 120,96 175,108 T 230,72 T 285,87 T 340,62 T 395,77" 
                  fill="none" 
                  stroke="var(--brand)" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
                
                {/* Dots with values */}
                {[
                  { day: '14 May', val: 4, y: 114, x: 65 },
                  { day: '15 May', val: 8, y: 96, x: 120 },
                  { day: '16 May', val: 5, y: 108, x: 175 },
                  { day: '17 May', val: 12, y: 72, x: 230 },
                  { day: '18 May', val: 9, y: 87, x: 285 },
                  { day: '19 May', val: 14, y: 62, x: 340 },
                  { day: '20 May', val: 11, y: 77, x: 395 }
                ].map(pt => (
                  <g key={pt.day}>
                    <circle cx={pt.x} cy={pt.y} r="5.5" fill="#1EAA4F" stroke="white" strokeWidth="2.5" />
                    <text x={pt.x} y={pt.y - 12} fill="var(--text-1)" fontSize="9.5" fontWeight="800" textAnchor="middle">{pt.val}</text>
                    <text x={pt.x} y="146" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="middle">{pt.day}</text>
                  </g>
                ))}
              </svg>
            </div>
          </CardBody>
        </Card>

        {/* Funnel conversion insights card */}
        <Card>
          <CardHeader title="Conversion Funnel" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'var(--surface-2)', padding: '10px 12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: '700' }}>TOTAL LEADS CALLED</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-1)' }}>148 leads</div>
            </div>
            <div style={{ background: 'var(--surface-2)', padding: '10px 12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: '700' }}>SUCCESSFUL INTEREST</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--brand)' }}>106 (72%)</div>
            </div>
            <div style={{ background: 'var(--surface-2)', padding: '10px 12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: '700' }}>ONBOARDED / ACTIVATED</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#1EAA4F' }}>58 tags</div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

// ── MARKETING ONBOARD CUSTOMER ──────────────────────────────────────────────
export function MktOnboard() {
  const db = useDB()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [tagCategory, setTagCategory] = useState('🚗 Vehicle safety')
  const [token, setToken] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const exName = getExecName(db)
  const exec = db.marketing_execs.find(e => e.name === exName) || { customers: 42, tags: 58, conversion: '72%', commission: '₹14,500' }

  const handleOnboard = (e) => {
    e.preventDefault()
    setSuccess('')
    setError('')

    if (!name || !phone || !token) {
      setError('Please fill in all fields (Name, Phone, and Tag Serial).')
      return
    }

    const marketingUsername = getExecUsername()
    try {
      activateMarketingOnboard(marketingUsername, { name, phone, tagCategory, token })
      setSuccess(`✓ Customer "${name}" successfully onboarded! Linked tag serial "${token}".`)
      setName('')
      setPhone('')
      setToken('')
    } catch (e) {
      setError('Onboarding failed. Please try again.')
    }
  }

  return (
    <div>
      <PageHeader title="Onboard Customer" sub="Register tag and link owner contact profile" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="👥" label="Onboarded Customers" value={String(exec.customers)} delta="Active contacts" color="green" onClick={() => navigate('/marketing/my_sales')} />
        <StatCard icon="🏷️" label="Total Tags Sold" value={String(exec.tags)} delta="Assigned devices" color="blue" onClick={() => navigate('/marketing/my_sales')} />
        <StatCard icon="💰" label="Cycle Commission" value={exec.commission} delta="Accumulated (₹250/tag)" color="purple" onClick={() => navigate('/marketing/commissions_mkt')} />
      </div>

      <div style={{ maxWidth: 540 }}>
        <Card>
          <CardBody>
            <form onSubmit={handleOnboard}>
              <FormGroup label="Customer Full Name">
                <FormInput value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ramesh Kumar" required />
              </FormGroup>
              <FormGroup label="Mobile Number">
                <FormInput value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +971 52 987 6543" required />
              </FormGroup>
              <FormGroup label="Tag Category">
                <FormSelect value={tagCategory} onChange={e => setTagCategory(e.target.value)} options={['🚗 Vehicle safety', '👴 Senior care', '👶 Kids safety', '🐶 Pet', '🧳 Luggage']} />
              </FormGroup>
              <FormGroup label="Tag Serial Token">
                <FormInput value={token} onChange={e => setToken(e.target.value)} placeholder="e.g. VH-889A-XYZK" required />
              </FormGroup>
              <div style={{ marginTop: 20 }}>
                <Btn variant="primary" type="submit" style={{ width: '100%' }}>Complete Customer Onboarding →</Btn>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

// ── MARKETING LEADS ─────────────────────────────────────────────────────────
export function MktLeads() {
  const db = useDB()
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'active', 'pending'

  const handleConvertLead = (lead) => {
    // 1. Mark converted in lead status
    editRecord('mkt_leads', lead.name, 'name', { status: 'active', label: 'Converted', followUp: '—' })
    
    // 2. Onboard as customer
    const marketingUsername = getExecUsername()
    const randomToken = 'VH-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    activateMarketingOnboard(marketingUsername, {
      name: lead.name,
      phone: lead.phone,
      tagCategory: lead.interest || '🚗 Vehicle safety',
      token: randomToken
    })
  }

  const totalLeads = db.mkt_leads.length
  const activeConverted = db.mkt_leads.filter(l => l.status === 'active').length
  const pendingLeads = db.mkt_leads.filter(l => l.status !== 'active').length

  const filteredLeads = db.mkt_leads.filter(l => {
    if (filterStatus === 'all') return true
    if (filterStatus === 'active') return l.status === 'active'
    if (filterStatus === 'pending') return l.status !== 'active'
    return true
  })

  return (
    <div>
      <PageHeader title="Lead Operations" sub="Follow up with prospects and convert them" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="👥" label="Total Leads" value={String(totalLeads)} delta={filterStatus === 'all' ? "Showing all" : "Click to view all"} color="blue" onClick={() => setFilterStatus('all')} />
        <StatCard icon="✅" label="Converted Leads" value={String(activeConverted)} delta={filterStatus === 'active' ? "Showing converted" : "Click to view converted"} color="green" onClick={() => setFilterStatus('active')} />
        <StatCard icon="⏳" label="Follow-up Queue" value={String(pendingLeads)} delta={filterStatus === 'pending' ? "Showing follow-ups" : "Click to view follow-ups"} color="amber" onClick={() => setFilterStatus('pending')} />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Prospect Name</th>
              <th>Phone</th>
              <th>Area</th>
              <th>Category</th>
              <th>Status</th>
              <th>Follow-up Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((l, idx) => (
              <tr key={l.name}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>{l.name}</td>
                <td>{l.phone}</td>
                <td>{l.area}</td>
                <td><CategoryBadge cat={l.interest} /></td>
                <td>
                  <Badge type={l.status === 'active' ? 'success' : l.status === 'info' ? 'info' : 'warn'}>
                    {l.label}
                  </Badge>
                </td>
                <td>{l.followUp}</td>
                <td style={{ textAlign: 'right' }}>
                  {l.status !== 'active' && (
                    <Btn size="xs" onClick={() => handleConvertLead(l)}>
                      🤝 Convert Lead
                    </Btn>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── MARKETING SALES ─────────────────────────────────────────────────────────
export function MktSales() {
  const db = useDB()
  const navigate = useNavigate()
  const exName = getExecName(db)
  const exec = db.marketing_execs.find(e => e.name === exName) || { conversion: '72%', commission: '₹14,500' }

  const totalSales = db.mkt_sales.length
  const totalCommission = db.mkt_sales.reduce((sum, s) => sum + parseInt(s.commission.replace(/[^\d]/g, '') || 0), 0)

  return (
    <div>
      <PageHeader title="Direct Sales Ledger" sub="Sales record credited to you" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="🏷️" label="Direct Sales" value={String(totalSales)} delta="Onboarded registrations" color="green" />
        <StatCard icon="💰" label="Accumulated Commission" value={`₹${totalCommission.toLocaleString()}`} delta="Unlocking targets bonus" color="purple" onClick={() => navigate('/marketing/commissions_mkt')} />
        <StatCard icon="📈" label="Direct Conversion" value={exec.conversion} delta="Prospect conversion rate" color="blue" onClick={() => navigate('/marketing/targets')} />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Customer</th>
              <th>Tag Category</th>
              <th>Token Serial</th>
              <th>Commission</th>
              <th>Onboard Date</th>
            </tr>
          </thead>
          <tbody>
            {db.mkt_sales.map((s, idx) => (
              <tr key={s.token + '-' + idx}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>{s.customer}</td>
                <td><CategoryBadge cat={s.tag} /></td>
                <td><Mono>{s.token}</Mono></td>
                <td>{s.commission}</td>
                <td>{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── MARKETING COMMISSIONS ──────────────────────────────────────────────────
export function MktCommissions() {
  const db = useDB()
  const navigate = useNavigate()
  const exName = getExecName(db)
  
  // Find current payout balance
  const comm = db.commissions.find(c => c.name === exName) || { amount: '₹0', status: 'pending' }

  return (
    <div>
      <PageHeader title="My Commissions" sub="Field executive compensation metrics" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="💰" label="Current Balance" value={comm.amount} delta="Current billing cycle" color="green" />
        <StatCard icon="⏳" label="Payout Status" value={comm.status === 'active' ? 'Cleared' : 'Pending'} delta="Clearance close processing" color="amber" />
        <StatCard icon="🏷️" label="Direct Sales volume" value={String(db.mkt_sales.length)} delta="Click to audit sales" color="blue" onClick={() => navigate('/marketing/my_sales')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <Card>
          <CardHeader title="Current Cycle Earning" />
          <CardBody>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--brand)' }}>{comm.amount}</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>
              Status: <Badge type={comm.status === 'active' ? 'success' : 'warn'}>{comm.status === 'active' ? 'Paid' : 'Pending payout close'}</Badge>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader title="Field Force Policy" />
          <CardBody style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-2)' }}>
            Each successful customer activation credits ₹250. Payouts are dispatched at the end of each fortnightly cycle.
            <div style={{ marginTop: 8 }}>
              • <strong>Bonus hurdle:</strong> ₹2,000 extra on 80 registrations.
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Historical commission payouts" />
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Fortnightly Cycle</th>
              <th>Total Registrations</th>
              <th>Base Rate</th>
              <th>Milestone Bonus</th>
              <th>Total Payout</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {db.mkt_commissions.map((e, idx) => (
              <tr key={e.cycle}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>{e.cycle}</td>
                <td>{e.tags} tags</td>
                <td>₹{e.rate}</td>
                <td>{e.bonus}</td>
                <td>{e.total}</td>
                <td>
                  <Badge type={e.status}>
                    {e.status === 'active' ? 'Cleared' : 'Pending'}
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

// ── MARKETING TARGETS ──────────────────────────────────────────────────────
export function MktTargets() {
  const db = useDB()
  const exName = getExecName(db)
  const exec = db.marketing_execs.find(e => e.name === exName) || { tags: 58 }

  return (
    <div>
      <PageHeader title="My Performance Targets" sub="Monitor quotas and unlock bonuses" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <CardHeader title="Current month goals" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ProgressRow label="Tags Activation" pct={Math.min(100, Math.round((exec.tags / 80) * 100))} color="var(--brand)" />
            <div style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'right', marginTop: -8 }}>
              <strong>{exec.tags} / 80 tags</strong> activated. Needs {Math.max(0, 80 - exec.tags)} more.
            </div>
            
            <ProgressRow label="Territory coverage" pct={85} color="var(--info)" />
            <ProgressRow label="Lead Conversion" pct={72} color="var(--accent)" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Bonus Levels Matrix" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
              <span>Level 1: 50 tags onboarded</span>
              <strong>✓ Unlocked (₹12,500 base)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
              <span>Level 2: 80 tags onboarded</span>
              <strong style={{ color: 'var(--accent)' }}>₹2,000 bonus pool pending</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Level 3: 120 tags onboarded</span>
              <strong style={{ color: 'var(--text-3)' }}>₹5,000 super bonus</strong>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

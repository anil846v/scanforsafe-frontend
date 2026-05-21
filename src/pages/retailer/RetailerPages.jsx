import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '@/components/ui/StatCard'
import Badge, { CategoryBadge } from '@/components/ui/Badge'
import Btn from '@/components/ui/Btn'
import { Card, CardHeader, CardBody, FormGroup, FormInput, FormSelect, Mono, PageHeader } from '@/components/ui/index'
import { useDB } from '@/hooks/useDB'
import { activateRetailerTag, addQRBatch } from '@/data/db'

// Helper to get current retailer name
function getRetailerName(db) {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
  return user.name || 'SafeZone LLC'
}

// Helper to get current retailer username
function getRetailerUsername() {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
  return user.username || 'retailer'
}

// ── RETAILER DASHBOARD ──────────────────────────────────────────────────────
export function RetailerDashboard() {
  const db = useDB()
  const navigate = useNavigate()
  const rName = getRetailerName(db)
  const retailer = db.retailers.find(r => r.name === rName) || { alloc: 500, sold: 342, stock: 158, commission: '₹34,200' }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="📦" label="Allocated Stock" value={String(retailer.alloc)} delta="Assigned by Admin" color="blue" onClick={() => navigate('/retailer/inventory')} />
        <StatCard icon="✅" label="Activated / Sold" value={String(retailer.sold)} delta="Customer registrations" color="green" onClick={() => navigate('/retailer/sales')} />
        <StatCard icon="📥" label="Stock left" value={String(retailer.stock)} delta="Available for sale" color="amber" onClick={() => navigate('/retailer/inventory')} />
        <StatCard icon="💰" label="Accumulated Commission" value={retailer.commission} delta="Earned (₹100/tag)" color="purple" onClick={() => navigate('/retailer/earnings')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, marginBottom: 14 }}>
        <Card>
          <CardHeader title="Recent activations log" />
          <table>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>Customer</th>
                <th>Category</th>
                <th>Token Serial</th>
                <th>Sale Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {db.retailer_sales.slice(0, 5).map((s, idx) => (
                <tr key={s.token + '-' + idx}>
                  <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                  <td>{s.customer}</td>
                  <td>{s.type}</td>
                  <td><Mono>{s.token}</Mono></td>
                  <td>{s.price}</td>
                  <td>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <CardHeader title="Stock levels by category" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {db.retailer_inventory.map(i => (
              <div key={i.type} style={{ fontSize: 13, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>{i.type}</span>
                  <strong>{i.stock} / {i.alloc} left</strong>
                </div>
                <div style={{ background: 'var(--surface-2)', borderRadius: 4, height: 6, width: '100%', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: i.stock < 15 ? 'var(--danger)' : 'var(--brand)', width: `${(i.stock/i.alloc)*100}%` }} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* SVG Sales Trend Bar Graph */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <Card>
          <CardHeader title="Weekly Activations Trend" sub="Number of tags registered and activated per day (Current week)" />
          <CardBody>
            <div style={{ padding: '10px 0' }}>
              <svg width="100%" height="160" viewBox="0 0 450 160" preserveAspectRatio="none">
                {/* Y-axis gridlines */}
                <line x1="40" y1="20" x2="430" y2="20" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="50" x2="430" y2="50" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="80" x2="430" y2="80" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="110" x2="430" y2="110" stroke="var(--surface-3)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="140" x2="430" y2="140" stroke="var(--text-3)" strokeWidth="1.5" />
                
                {/* Y-axis labels */}
                <text x="30" y="24" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">80</text>
                <text x="30" y="54" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">60</text>
                <text x="30" y="84" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">40</text>
                <text x="30" y="114" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">20</text>
                <text x="30" y="144" fill="var(--text-3)" fontSize="9" fontWeight="700" textAnchor="end">0</text>

                {/* Bars */}
                {[
                  { day: 'Mon', val: 42, x: 55, color: '#0D5CA5' },
                  { day: 'Tue', val: 58, x: 110, color: '#0D5CA5' },
                  { day: 'Wed', val: 31, x: 165, color: '#0D5CA5' },
                  { day: 'Thu', val: 78, x: 220, color: '#F27A18' }, // Peak highlights in accent color
                  { day: 'Fri', val: 65, x: 275, color: '#0D5CA5' },
                  { day: 'Sat', val: 49, x: 330, color: '#0D5CA5' },
                  { day: 'Sun', val: 24, x: 385, color: '#1EAA4F' }  // Green highlight
                ].map(b => {
                  const barHeight = (b.val / 80) * 120;
                  const barY = 140 - barHeight;
                  return (
                    <g key={b.day}>
                      {/* Interactive hoverable bar rect */}
                      <rect 
                        x={b.x} 
                        y={barY} 
                        width="26" 
                        height={barHeight} 
                        fill={b.color} 
                        rx="4"
                        style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                      />
                      <text x={b.x + 13} y={barY - 5} fill="var(--text-1)" fontSize="9" fontWeight="800" textAnchor="middle">{b.val}</text>
                      <text x={b.x + 13} y="154" fill="var(--text-3)" fontSize="9.5" fontWeight="700" textAnchor="middle">{b.day}</text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </CardBody>
        </Card>

        {/* Sales Performance Summary */}
        <Card>
          <CardHeader title="Sales Insights" />
          <CardBody style={{ fontSize: '13px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <div style={{ color: 'var(--text-3)', fontWeight: '600' }}>BEST SALES DAY</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#F27A18' }}>Thursday (78 activations)</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-3)', fontWeight: '600' }}>WEEKLY CONVERSION RATE</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--brand-mid)' }}>92.4%</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-3)', fontWeight: '600' }}>AVG STICKERS SOLD/DAY</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--brand)' }}>49.5 tags</div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

// ── RETAILER INVENTORY ──────────────────────────────────────────────────────
export function RetailerInventory() {
  const db = useDB()
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'low_stock', 'stocked'

  const totalStock = db.retailer_inventory.reduce((sum, i) => sum + i.stock, 0)
  const totalAlloc = db.retailer_inventory.reduce((sum, i) => sum + i.alloc, 0)
  const lowStockCount = db.retailer_inventory.filter(i => i.stock < 15).length

  const filteredInventory = db.retailer_inventory.filter(i => {
    if (filterStatus === 'all') return true
    if (filterStatus === 'low_stock') return i.stock < 15
    if (filterStatus === 'stocked') return i.stock >= 15
    return true
  })

  return (
    <div>
      <PageHeader title="Stock Inventory" sub="Track allocated product categories" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="📦" label="Total Stock Available" value={String(totalStock)} delta={filterStatus === 'all' ? "Showing all" : "Click to view all"} color="green" onClick={() => setFilterStatus('all')} />
        <StatCard icon="⚠️" label="Low Stock Warning" value={String(lowStockCount)} delta={filterStatus === 'low_stock' ? "Showing low stock" : "Click to view low stock"} color="amber" onClick={() => setFilterStatus('low_stock')} />
        <StatCard icon="📥" label="Fully Stocked Items" value={String(db.retailer_inventory.length - lowStockCount)} delta={filterStatus === 'stocked' ? "Showing stocked" : "Click to view stocked"} color="purple" onClick={() => setFilterStatus('stocked')} />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Category</th>
              <th>Available Stock</th>
              <th>Total Allocated</th>
              <th>Sold / Activated</th>
              <th>Sell-through Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((i, idx) => (
              <tr key={i.type}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td><CategoryBadge cat={i.type} /></td>
                <td style={{ fontWeight: 600, color: i.stock < 15 ? 'var(--danger)' : 'inherit' }}>{i.stock}</td>
                <td>{i.alloc}</td>
                <td>{i.sold}</td>
                <td>{i.rate}</td>
                <td><Badge type={i.stock < 15 ? 'warn' : 'active'}>{i.stock < 15 ? 'Low stock' : 'Stocked'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── RETAILER ACTIVATE TAG ───────────────────────────────────────────────────
export function RetailerActivate() {
  const db = useDB()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [tagCategory, setTagCategory] = useState('🚗 Vehicle safety')
  const [token, setToken] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const rName = getRetailerName(db)
  const retailer = db.retailers.find(r => r.name === rName) || { alloc: 500, sold: 342, stock: 158, commission: '₹34,200' }

  const handleActivate = (e) => {
    e.preventDefault()
    setSuccessMsg('')
    setErrorMsg('')

    if (!name || !phone || !token) {
      setErrorMsg('Please fill in all fields (Name, Phone, and Token Serial).')
      return
    }

    const retailerUsername = getRetailerUsername()
    
    try {
      const generatedToken = activateRetailerTag(retailerUsername, { name, phone, tagCategory, token })
      setSuccessMsg(`✓ Tag "${token}" successfully activated and linked to ${name}!`)
      setName('')
      setPhone('')
      setToken('')
    } catch (e) {
      setErrorMsg('Activation failed. Check inventory levels.')
    }
  }

  return (
    <div>
      <PageHeader title="Activate Tag" sub="Link QR/NFC tag to customer profile" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="✅" label="Activated tags" value={String(retailer.sold)} delta="Registered customers" color="green" onClick={() => navigate('/retailer/sales')} />
        <StatCard icon="📦" label="Stock Available" value={String(retailer.stock)} delta="Ready for sync" color="blue" onClick={() => navigate('/retailer/inventory')} />
        <StatCard icon="💰" label="My Commission" value={retailer.commission} delta="Accumulated earnings" color="purple" onClick={() => navigate('/retailer/earnings')} />
      </div>
      {successMsg && (
        <div style={{ padding: 12, background: 'var(--brand-light)', color: 'var(--brand)', borderRadius: 8, fontSize: 13, marginBottom: 14 }}>
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ padding: 12, background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 8, fontSize: 13, marginBottom: 14 }}>
          {errorMsg}
        </div>
      )}
      <div style={{ maxWidth: 540 }}>
        <Card>
          <CardBody>
            <form onSubmit={handleActivate}>
              <FormGroup label="Customer Name">
                <FormInput value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Salim Al Jabri" required />
              </FormGroup>
              <FormGroup label="Customer Mobile Phone">
                <FormInput value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +971 50 111 2233" required />
              </FormGroup>
              <FormGroup label="Tag Category">
                <FormSelect value={tagCategory} onChange={e => setTagCategory(e.target.value)} options={['🚗 Vehicle safety', '👴 Senior care', '👶 Kids safety', '🐶 Pet guard', '🧳 Luggage tag']} />
              </FormGroup>
              <FormGroup label="NFC/QR Token Serial ID">
                <FormInput value={token} onChange={e => setToken(e.target.value)} placeholder="e.g. SS-90901" required />
              </FormGroup>
              <div style={{ marginTop: 20 }}>
                <Btn variant="primary" type="submit" style={{ width: '100%' }}>Activate & Link Profile →</Btn>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

// ── RETAILER SALES ──────────────────────────────────────────────────────────
export function RetailerSales() {
  const db = useDB()
  const navigate = useNavigate()
  const [filterCat, setFilterCat] = useState('all') // 'all', 'vehicle', 'senior'

  const totalSales = db.retailer_sales.length
  const totalCommission = db.retailer_sales.reduce((sum, s) => sum + parseInt(s.commission.replace(/[^\d]/g, '') || 0), 0)

  const filteredSales = db.retailer_sales.filter(s => {
    if (filterCat === 'all') return true
    if (filterCat === 'vehicle') return s.type.includes('🚗') || s.type.toLowerCase().includes('vehicle')
    if (filterCat === 'senior') return s.type.includes('👴') || s.type.toLowerCase().includes('senior')
    return true
  })

  return (
    <div>
      <PageHeader title="Sales Ledger" sub="Audit trail of tag sales" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="📈" label="Total Sales" value={String(totalSales)} delta={filterCat === 'all' ? "Showing all sales" : "Click to view all"} color="blue" onClick={() => setFilterCat('all')} />
        <StatCard icon="🚗" label="Vehicle Sales" value={String(db.retailer_sales.filter(s => s.type.includes('🚗')).length)} delta={filterCat === 'vehicle' ? "Showing vehicles" : "Click to filter vehicles"} color="green" onClick={() => setFilterCat('vehicle')} />
        <StatCard icon="💰" label="Total Commission" value={`₹${totalCommission.toLocaleString()}`} delta="Accumulated payouts" color="purple" onClick={() => navigate('/retailer/earnings')} />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Customer</th>
              <th>Category</th>
              <th>Token Serial</th>
              <th>Price</th>
              <th>Commission</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((s, idx) => (
              <tr key={s.token + '-' + idx}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>{s.customer}</td>
                <td><CategoryBadge cat={s.type} /></td>
                <td><Mono>{s.token}</Mono></td>
                <td>{s.price}</td>
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

// ── RETAILER CUSTOMERS ──────────────────────────────────────────────────────
export function RetailerCustomers() {
  const db = useDB()
  const navigate = useNavigate()
  const rName = getRetailerName(db)
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'active', 'pending'

  // Retailer customers are the ones present in their sales ledger
  const retailerCustNames = db.retailer_sales.map(s => s.customer)
  const registeredCustomers = db.customers.filter(c => retailerCustNames.includes(c.name))

  const totalCust = registeredCustomers.length
  const activeCust = registeredCustomers.filter(c => c.status === 'active').length
  const pendingCust = registeredCustomers.filter(c => c.status === 'pending').length

  const filteredCustomers = registeredCustomers.filter(c => {
    if (filterStatus === 'all') return true
    return c.status === filterStatus
  })

  return (
    <div>
      <PageHeader title="Retailer Customers" sub="Customers activated at your store" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="👥" label="Total Customers" value={String(totalCust)} delta={filterStatus === 'all' ? "Showing all" : "Click to view all"} color="blue" onClick={() => setFilterStatus('all')} />
        <StatCard icon="✅" label="Active Accounts" value={String(activeCust)} delta={filterStatus === 'active' ? "Showing active" : "Click to view active"} color="green" onClick={() => setFilterStatus('active')} />
        <StatCard icon="⚠️" label="Pending Activation" value={String(pendingCust)} delta={filterStatus === 'pending' ? "Showing pending" : "Click to view pending"} color="amber" onClick={() => setFilterStatus('pending')} />
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Assigned Tag</th>
              <th>Token</th>
              <th>Contacts Linked</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c, idx) => (
              <tr key={c.token}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td><CategoryBadge cat={c.tag} /></td>
                <td><Mono>{c.token}</Mono></td>
                <td>{c.contacts}</td>
                <td>{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── RETAILER EARNINGS ───────────────────────────────────────────────────────
export function RetailerEarnings() {
  const db = useDB()
  const navigate = useNavigate()
  const rName = getRetailerName(db)
  
  // Find current payout commission status from db commissions
  const comm = db.commissions.find(c => c.name === rName) || { amount: '₹0', status: 'pending' }

  return (
    <div>
      <PageHeader title="My Earnings" sub="Track payouts and commission disbursements" />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon="💰" label="Accumulated Balance" value={comm.amount} delta="Current billing cycle" color="green" />
        <StatCard icon="⏳" label="Payout Status" value={comm.status === 'active' ? 'Cleared' : 'Pending'} delta="Bank transfer pending" color="amber" />
        <StatCard icon="🏷️" label="Total Sales Volume" value={String(db.retailer_sales.length)} delta="Click to audit sales ledger" color="blue" onClick={() => navigate('/retailer/sales')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <Card>
          <CardHeader title="Current Cycle Balance" />
          <CardBody>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--brand)' }}>{comm.amount}</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>
              Status: <Badge type={comm.status === 'active' ? 'success' : 'warn'}>{comm.status === 'active' ? 'Paid / Cleared' : 'Pending clearance'}</Badge>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader title="Payout Schedule" />
          <CardBody style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-2)' }}>
            Payouts are processed automatically every 15 days. Commissions are credited directly to your registered bank account.
            <div style={{ marginTop: 8 }}>
              • <strong>Next cycle close:</strong> 15 May <br />
              • <strong>Processing bank:</strong> Emirates NBD
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Payout history logs" />
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Cycle</th>
              <th>Tags sold</th>
              <th>Rate</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {db.retailer_earnings.map((e, idx) => (
              <tr key={e.cycle}>
                <td style={{ fontWeight: 'bold', color: 'var(--text-3)' }}>{idx + 1}</td>
                <td>{e.cycle}</td>
                <td>{e.tags} tags</td>
                <td>{e.rate}</td>
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

// ── RETAILER RESTOCK ────────────────────────────────────────────────────────
export function RetailerRestock() {
  const [cat, setCat] = useState('🚗 Vehicle safety')
  const [qty, setQty] = useState('100')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const retailerName = getRetailerName()
    
    // Add QR batch with pending status assigned to retailer
    addQRBatch({
      cat,
      qty,
      vendor: 'PrintPro Dubai',
      assign: retailerName
    })
    
    setSuccess(true)
    setQty('100')
  }

  return (
    <div style={{ maxWidth: 540 }}>
      <PageHeader title="Request Restock" sub="Order additional QR/NFC sticker supplies" />
      {success && (
        <div style={{ padding: 12, background: 'var(--brand-light)', color: 'var(--brand)', borderRadius: 8, fontSize: 13, marginBottom: 14 }}>
          ✓ Restock request submitted to Admin! Dispatched batches will be automatically added to inventory stock.
        </div>
      )}
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormGroup label="Tag Category">
              <FormSelect value={cat} onChange={e => setCat(e.target.value)} options={['🚗 Vehicle safety', '👴 Senior care', '👶 Kids safety', '🐶 Pet', '🧳 Luggage']} />
            </FormGroup>
            <FormGroup label="Requested Quantity">
              <FormSelect value={qty} onChange={e => setQty(e.target.value)} options={['50', '100', '200', '500']} />
            </FormGroup>
            <div style={{ marginTop: 20 }}>
              <Btn variant="primary" type="submit" style={{ width: '100%' }}>Submit Order Request →</Btn>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

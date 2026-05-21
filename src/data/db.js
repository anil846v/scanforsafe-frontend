// ── MOCK DATABASE FOR SCANFORSAFE ──────────────────────────────────────────

const DB_KEY = 'scanforsafe_db_v1';

// Initial default data seed
const defaultDB = {
  users: [
    { username: 'admin', password: 'admin123', role: 'admin', name: 'Rajesh K.', initials: 'RK', details: 'Super Admin' },
    { username: 'retailer', password: 'retailer123', role: 'retailer', name: 'SafeZone LLC', initials: 'SZ', details: 'Franchise Partner', city: 'Dubai' },
    { username: 'marketing', password: 'marketing123', role: 'marketing', name: 'Priya Nair', initials: 'PN', details: 'Field Executive', region: 'Dubai' },
    { username: 'customer', password: 'customer123', role: 'customer', name: 'Ahmed Al Farsi', initials: 'AH', details: 'Tag Owner', phone: '+971 50 123 4567', bloodType: 'O+', medicalNotes: 'No known allergies', vehiclePlate: 'Dubai A 12345' },
  ],
  qr_batches: [
    { id: 'BTH-0088', cat: '🚗 Vehicle', qty: 500, vendor: 'PrintPro Dubai', assign: 'SafeZone LLC', status: 'active', label: 'Dispatched', date: '2 May' },
    { id: 'BTH-0089', cat: '👴 Senior', qty: 200, vendor: 'TagMaster India', assign: '—', status: 'pending', label: 'Pending dispatch', date: '4 May' },
    { id: 'BTH-0090', cat: '👶 Kids', qty: 150, vendor: 'PrintPro Dubai', assign: 'KidsSafe Franchise', status: 'active', label: '120/150 active', date: '1 May' },
    { id: 'BTH-0091', cat: '🐶 Pet', qty: 100, vendor: 'NFC World', assign: 'Online', status: 'pending', label: 'Pending dispatch', date: '5 May' },
    { id: 'BTH-0087', cat: '🧳 Luggage', qty: 300, vendor: 'TagMaster India', assign: 'TravelSafe Dubai', status: 'inactive', label: 'Fully activated', date: '20 Apr' },
  ],
  customers: [
    { ini: 'AH', name: 'Ahmed Al Farsi', bg: '#E1F5EE', col: '#0F6E56', phone: '+971 50 123 4567', tag: '🚗', token: 'VH-3K9P-XLAW', contacts: 3, status: 'active', joined: '1 May' },
    { ini: 'FA', name: 'Fatima Al Nouri', bg: '#FAEEDA', col: '#BA7517', phone: '+971 55 987 1234', tag: '👴', token: 'SR-8XKL-MNPQ', contacts: 2, status: 'active', joined: '28 Apr' },
    { ini: 'KM', name: 'Khalid Mansoor', bg: '#EBF3FB', col: '#185FA5', phone: '+971 52 445 8821', tag: '👶', token: 'KD-2PLQ-WXYZ', contacts: 3, status: 'pending', joined: '5 May' },
    { ini: 'SB', name: 'Sara Baig', bg: '#F0ECFB', col: '#6C4AB7', phone: '+971 50 772 3390', tag: '🐶', token: 'PT-9QRS-ABCD', contacts: 1, status: 'active', joined: '3 May' },
    { ini: 'MJ', name: 'Mohammed Jaber', bg: '#E1F5EE', col: '#0F6E56', phone: '+971 54 330 6677', tag: '🧳', token: 'LG-5TUV-EFGH', contacts: 2, status: 'inactive', joined: '15 Apr' },
  ],
  retailers: [
    { ini: 'SZ', name: 'SafeZone LLC', bg: '#E1F5EE', col: '#0F6E56', city: 'Dubai', alloc: 500, sold: 342, stock: 158, commission: '₹34,200', status: 'active' },
    { ini: 'KS', name: 'KidsSafe Franchise', bg: '#EBF3FB', col: '#185FA5', city: 'Abu Dhabi', alloc: 150, sold: 120, stock: 30, commission: '₹12,000', status: 'active' },
    { ini: 'TS', name: 'TravelSafe Dubai', bg: '#FAEEDA', col: '#BA7517', city: 'Dubai', alloc: 300, sold: 300, stock: 0, commission: '₹30,000', status: 'inactive' },
    { ini: 'SP', name: 'SeniorPlus Care', bg: '#F0ECFB', col: '#6C4AB7', city: 'Sharjah', alloc: 200, sold: 88, stock: 112, commission: '₹8,800', status: 'active' },
  ],
  marketing_execs: [
    { ini: 'PN', name: 'Priya Nair', bg: '#E1F5EE', col: '#0F6E56', region: 'Dubai', customers: 42, tags: 58, conversion: '72%', commission: '₹14,500', status: 'active' },
    { ini: 'AK', name: 'Arun Kumar', bg: '#FAEEDA', col: '#BA7517', region: 'Abu Dhabi', customers: 31, tags: 40, conversion: '68%', commission: '₹10,000', status: 'active' },
    { ini: 'LS', name: 'Lara Said', bg: '#EBF3FB', col: '#185FA5', region: 'Sharjah', customers: 18, tags: 22, conversion: '61%', commission: '₹5,500', status: 'active' },
    { ini: 'MF', name: 'Mohamed Fahad', bg: '#F0ECFB', col: '#6C4AB7', region: 'RAK', customers: 9, tags: 11, conversion: '55%', commission: '₹2,750', status: 'inactive' },
  ],
  emergencies: [
    { token: 'VH-3K9P-XLAW', owner: 'Ahmed Al Farsi', cat: '🚗', location: 'Dubai South', outcome: 'Contact 1 answered', status: 'alert', label: '● Active', time: '2m ago' },
    { token: 'SR-8XKL-MNPQ', owner: 'Fatima Al Nouri', cat: '👴', location: 'Al Ain', outcome: 'SMS sent (no answer)', status: 'alert', label: '● Active', time: '14m ago' },
    { token: 'VH-7BNK-JKLM', owner: 'Rashid Omar', cat: '🚗', location: 'Sharjah', outcome: 'Contact 2 ✓', status: 'inactive', label: 'Resolved', time: '2h ago' },
    { token: 'KD-2PLQ-WXYZ', owner: 'Hana Mansoor', cat: '👶', location: 'Abu Dhabi', outcome: 'Contact 1 ✓', status: 'inactive', label: 'Resolved', time: 'Yesterday' },
  ],
  missing_vehicles: [
    { plate: 'Dubai A 12345', owner: 'Ahmed Al Farsi', reported: '6 May', lastSeen: 'Al Quoz', sightings: 3, status: 'alert', label: 'Active' },
    { plate: 'Sharjah B 98765', owner: 'Rania Kamal', reported: '5 May', lastSeen: 'Industrial Area', sightings: 1, status: 'alert', label: 'Active' },
    { plate: 'AUH C 54321', owner: 'Tariq Yousuf', reported: '1 May', lastSeen: 'Mussafah', sightings: 7, status: 'pending', label: 'Under review' },
    { plate: 'Dubai D 11223', owner: 'Hind Al Ameri', reported: '28 Apr', lastSeen: 'DIP', sightings: 12, status: 'inactive', label: 'Recovered' },
  ],
  vendors: [
    { name: 'PrintPro Dubai', location: 'Dubai Industrial City', batches: 22, total: '8,400', turnaround: '3 days', status: 'active' },
    { name: 'TagMaster India', location: 'Bangalore', batches: 14, total: '4,200', turnaround: '7 days', status: 'active' },
    { name: 'NFC World', location: 'Shenzhen', batches: 6, total: '1,800', turnaround: '14 days', status: 'pending' },
  ],
  commissions: [
    { name: 'Priya Nair', roleType: 'purple', roleLabel: 'Executive', sales: 58, rate: '₹250/tag', amount: '₹14,500', status: 'pending' },
    { name: 'SafeZone LLC', roleType: 'info', roleLabel: 'Retailer', sales: 342, rate: '₹100/tag', amount: '₹34,200', status: 'active' },
    { name: 'Arun Kumar', roleType: 'purple', roleLabel: 'Executive', sales: 40, rate: '₹250/tag', amount: '₹10,000', status: 'pending' },
    { name: 'KidsSafe Franchise', roleType: 'info', roleLabel: 'Retailer', sales: 120, rate: '₹100/tag', amount: '₹12,000', status: 'active' },
  ],
  retailer_inventory: [
    { type: '🚗 Vehicle safety', stock: 82, alloc: 250, sold: 168, rate: '67%', status: 'active' },
    { type: '👴 Senior care', stock: 34, alloc: 100, sold: 66, rate: '66%', status: 'active' },
    { type: '👶 Kids safety', stock: 12, alloc: 50, sold: 38, rate: '76%', status: 'pending' },
    { type: '🐶 Pet', stock: 18, alloc: 60, sold: 42, rate: '70%', status: 'active' },
    { type: '🧳 Luggage', stock: 12, alloc: 40, sold: 28, rate: '70%', status: 'active' },
  ],
  retailer_sales: [
    { customer: 'Ahmed Al Farsi', type: '🚗 Vehicle safety', token: 'VH-3K9P-XLAW', price: '₹799', commission: '₹100', date: '1 May' },
    { customer: 'Layla Mahmoud', type: '👴 Senior care', token: 'SR-8XKL-MNPQ', price: '₹699', commission: '₹100', date: '1 May' },
    { customer: 'Omar Khalil', type: '👶 Kids safety', token: 'KD-2PLQ-WXYZ', price: '₹599', commission: '₹100', date: '29 Apr' },
    { customer: 'Hana Said', type: '🚗 Vehicle safety', token: 'VH-5TUV-ABCD', price: '₹799', commission: '₹100', date: '28 Apr' },
    { customer: 'Nour Hassan', type: '🐶 Pet', token: 'PT-9QRS-ABCD', price: '₹499', commission: '₹100', date: '27 Apr' },
  ],
  retailer_earnings: [
    { cycle: 'May 1–15', tags: 72, rate: '₹100/tag', total: '₹7,200', status: 'pending' },
    { cycle: 'Apr 16–30', tags: 90, rate: '₹100/tag', total: '₹9,000', status: 'active' },
    { cycle: 'Apr 1–15', tags: 80, rate: '₹100/tag', total: '₹8,000', status: 'active' },
  ],
  mkt_leads: [
    { name: 'Tariq Yousuf', phone: '+971 52 441 8899', area: 'Mirdif', interest: '🚗 Vehicle safety', status: 'pending', label: 'Called — interested', followUp: '9 May' },
    { name: 'Huda Salman', phone: '+971 55 673 2210', area: 'Al Barsha', interest: '👴 Senior care', status: 'info', label: 'Meeting set', followUp: '8 May' },
    { name: 'Reem Al Kaabi', phone: '+971 50 119 3388', area: 'JLT', interest: '🐶 Pet', status: 'inactive', label: 'Not answered', followUp: '10 May' },
    { name: 'Faisal Nasser', phone: '+971 54 220 7744', area: 'Deira', interest: '🚗 Vehicle safety', status: 'active', label: 'Converted', followUp: '—' },
  ],
  mkt_sales: [
    { customer: 'Ahmed Al Farsi', tag: '🚗', token: 'VH-3K9P-XLAW', commission: '₹250', date: '1 May' },
    { customer: 'Mona Al Rashidi', tag: '👴', token: 'SR-8XKL-MNPQ', commission: '₹250', date: '1 May' },
    { customer: 'Hassan Karimi', tag: '👶', token: 'KD-2PLQ-WXYZ', commission: '₹250', date: '30 Apr' },
    { customer: 'Lina Fawaz', tag: '🚗', token: 'VH-5TUV-ABCD', commission: '₹250', date: '29 Apr' },
    { customer: 'Nour Hassan', tag: '🐶', token: 'PT-9QRS-ABCD', commission: '₹250', date: '28 Apr' },
  ],
  mkt_commissions: [
    { cycle: 'May 1–15', tags: 58, rate: '₹250', bonus: '—', total: '₹14,500', status: 'pending' },
    { cycle: 'Apr 16–30', tags: 62, rate: '₹250', bonus: '₹2,000', total: '₹17,500', status: 'active' },
    { cycle: 'Apr 1–15', tags: 50, rate: '₹250', bonus: '—', total: '₹12,500', status: 'active' },
  ],
  customer_tags: [
    {
      emoji: '🚗', name: 'Vehicle safety tag', token: 'VH-3K9P-XLAW',
      stats: [
        { label: 'Scans', value: '3', color: 'var(--text-1)' },
        { label: 'Emergencies', value: '1', color: 'var(--danger)' },
        { label: 'Activated', value: '1 May', color: 'var(--text-1)' },
      ],
      showMissing: true,
      status: 'active'
    },
    {
      emoji: '👴', name: 'Senior care tag', token: 'SR-4MNP-QTYZ',
      stats: [
        { label: 'Scans', value: '1', color: 'var(--text-1)' },
        { label: 'Emergencies', value: '0', color: 'var(--danger)' },
        { label: 'Activated', value: '3 May', color: 'var(--text-1)' },
      ],
      showMissing: false,
      status: 'active'
    },
  ],
  customer_contacts: [
    { username: 'customer', ini: 'SF', name: 'Sara Al Farsi', phone: '+971 50 987 6543', rel: 'Sister', priority: 'Priority 1', badgeType: 'active', badgeLabel: 'First called', bg: '#E1F5EE', col: '#0F6E56' },
    { username: 'customer', ini: 'KF', name: 'Khalid Al Farsi', phone: '+971 55 111 2233', rel: 'Brother', priority: 'Priority 2', badgeType: 'pending', badgeLabel: 'If contact 1 misses', bg: '#EBF3FB', col: '#185FA5' },
    { username: 'customer', ini: 'FH', name: 'Dr. Fatima Hassan', phone: '+971 4 300 0000', rel: 'Family doctor', priority: 'Priority 3', badgeType: null, badgeLabel: null, bg: '#FAEEDA', col: '#BA7517' },
  ],
  customer_scan_activity: [
    { col: 'var(--info)', text: 'Your tag <code>VH-3K9P-XLAW</code> was scanned — public viewer · Dubai South', ts: '2h ago' },
    { col: 'var(--brand-mid)', text: 'Your tag <code>SR-4MNP-QTYZ</code> was scanned — public viewer · Jumeirah', ts: '3 days ago' },
    { col: 'var(--info)', text: 'Your tag <code>VH-3K9P-XLAW</code> was scanned — public viewer · Marina', ts: '5 days ago' },
  ],
  live_feed: [
    { col: 'var(--danger)', text: '<strong>Emergency</strong> — VH-3K9P-XLAW · Dubai South · Contact 1 answered', ts: '2m' },
    { col: 'var(--brand-mid)', text: '<strong>Activation</strong> — Ahmed Al Rashid registered Vehicle tag', ts: '8m' },
    { col: 'var(--info)', text: '<strong>Batch printed</strong> — PrintPro Dubai · 500 QR stickers', ts: '22m' },
    { col: 'var(--accent)', text: '<strong>Missing vehicle</strong> — Dubai A 12345 reported · Sharjah', ts: '1h' },
    { col: 'var(--purple)', text: '<strong>Commission paid</strong> — Priya Nair · ₹14,500', ts: '2h' },
  ],
  qr_orders: [
    { id: 'ORD-2026-001', name: 'Rohan Sharma', phone: '+91 98765 43210', pincode: '560001', region: 'South India', address: '12th Cross, Indiranagar, Bangalore, Karnataka', price: 199, courierCharge: 40, total: 239, status: 'placed', date: '19 May 2026', estDays: '5-7 days', history: [{ status: 'placed', ts: '19 May 2026 10:30 AM' }] },
    { id: 'ORD-2026-002', name: 'Amit Verma', phone: '+91 99887 76655', pincode: '110001', region: 'North India', address: 'Connaught Place, New Delhi', price: 199, courierCharge: 60, total: 259, status: 'sticker_generated', batchId: 'BTH-0089', seriesNo: 'SS-20042', vendorCode: 'VND-702', date: '18 May 2026', estDays: '7-10 days', history: [{ status: 'placed', ts: '18 May 2026 09:15 AM' }, { status: 'sticker_generated', ts: '18 May 2026 02:45 PM' }] },
    { id: 'ORD-2026-003', name: 'Vikram Sen', phone: '+91 91234 56789', pincode: '700012', region: 'East India', address: 'Park Street, Kolkata, West Bengal', price: 199, courierCharge: 65, total: 264, status: 'delivered', batchId: 'BTH-0087', seriesNo: 'SS-10892', vendorCode: 'VND-702', courier: 'Delhivery', awb: 'DLV99281726', date: '12 May 2026', estDays: '7-10 days', history: [{ status: 'placed', ts: '12 May 2026 08:00 AM' }, { status: 'sticker_generated', ts: '12 May 2026 11:30 AM' }, { status: 'dispatched', ts: '12 May 2026 04:00 PM' }, { status: 'delivered', ts: '15 May 2026 02:30 PM' }] }
  ],
  courier_regions: [
    { id: 'R1', name: 'South India', states: 'Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala, Puducherry, Lakshadweep', pincodes: '500001–695999', charge: 40, est: '5-7 days' },
    { id: 'R2', name: 'West India', states: 'Maharashtra, Goa, Gujarat, Dadra & Nagar Haveli, Daman & Diu', pincodes: '360001–444999', charge: 50, est: '5-7 days' },
    { id: 'R3', name: 'North India', states: 'Delhi, Haryana, Punjab, Himachal Pradesh, Jammu & Kashmir, Ladakh, Chandigarh, Uttarakhand, Uttar Pradesh, Rajasthan', pincodes: '110001–284999', charge: 60, est: '7-10 days' },
    { id: 'R4', name: 'East India', states: 'West Bengal, Bihar, Jharkhand, Odisha, Andaman & Nicobar Islands', pincodes: '700001–768999', charge: 65, est: '7-10 days' },
    { id: 'R5', name: 'Central India', states: 'Madhya Pradesh, Chhattisgarh', pincodes: '450001–497999', charge: 55, est: '7-10 days' },
    { id: 'R6', name: 'North-East India', states: 'Assam, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Arunachal Pradesh, Sikkim', pincodes: '781001–799999', charge: 80, est: '10-14 days' }
  ],
  validated_barcodes: []
};

// Retrieve DB state
export function getDB() {
  const val = localStorage.getItem(DB_KEY);
  if (!val) {
    localStorage.setItem(DB_KEY, JSON.stringify(defaultDB));
    return defaultDB;
  }
  try {
    const parsed = JSON.parse(val);
    let migrated = false;
    // Auto-migrate new collections to prevent crashes on older stored states
    for (const key of Object.keys(defaultDB)) {
      if (parsed[key] === undefined) {
        parsed[key] = defaultDB[key];
        migrated = true;
      }
    }
    if (migrated) {
      localStorage.setItem(DB_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    localStorage.setItem(DB_KEY, JSON.stringify(defaultDB));
    return defaultDB;
  }
}

// Save DB state
export function saveDB(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
  notifyListeners();
}

// Pub-sub listeners
const listeners = new Set();
export function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function notifyListeners() {
  listeners.forEach(cb => cb());
}

// Cross-tab sync
window.addEventListener('storage', (e) => {
  if (e.key === DB_KEY) {
    notifyListeners();
  }
});

// Helper: generate unique credentials or user info
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const colors = [
  { bg: '#E1F5EE', col: '#0F6E56' },
  { bg: '#FAEEDA', col: '#BA7517' },
  { bg: '#EBF3FB', col: '#185FA5' },
  { bg: '#F0ECFB', col: '#6C4AB7' },
];

function getRandomColorPair() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// ── EXPORTED DATABASE ACTIONS ──────────────────────────────────────────────

// Add a QR batch
export function addQRBatch(batch) {
  const db = getDB();
  const id = 'BTH-' + String(db.qr_batches.length + 92).padStart(4, '0');
  const newBatch = {
    id,
    cat: batch.cat,
    qty: Number(batch.qty),
    vendor: batch.vendor,
    assign: batch.assign || '—',
    status: batch.assign && batch.assign !== '— Admin stock —' ? 'active' : 'pending',
    label: batch.assign && batch.assign !== '— Admin stock —' ? 'Dispatched' : 'Pending dispatch',
    date: 'Today',
  };
  db.qr_batches.unshift(newBatch);

  // If assigned to a retailer, update retailer allocated stock
  if (batch.assign && batch.assign !== '— Admin stock —') {
    const rIdx = db.retailers.findIndex(r => r.name === batch.assign);
    if (rIdx !== -1) {
      db.retailers[rIdx].alloc += newBatch.qty;
      db.retailers[rIdx].stock += newBatch.qty;
    }
  }

  // Log in live feed
  db.live_feed.unshift({
    col: 'var(--info)',
    text: `<strong>Batch printed</strong> — ${newBatch.vendor} · ${newBatch.qty} tags`,
    ts: 'Just now'
  });

  saveDB(db);
  return newBatch;
}

// Add a customer
export function addCustomer(cust) {
  const db = getDB();
  const initials = getInitials(cust.name);
  const color = getRandomColorPair();
  const token = 'VH-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();

  const newCust = {
    ini: initials,
    name: cust.name,
    bg: color.bg,
    col: color.col,
    phone: cust.phone,
    tag: cust.tagCategory ? cust.tagCategory.split(' ')[0] : '🚗',
    token: cust.token || token,
    contacts: cust.contactsCount || 2,
    status: 'active',
    joined: 'Today'
  };

  db.customers.unshift(newCust);

  // Create login user account
  const username = cust.name.toLowerCase().replace(/\s+/g, '');
  if (!db.users.some(u => u.username === username)) {
    db.users.push({
      username,
      password: '123',
      role: 'customer',
      name: cust.name,
      initials: initials,
      details: 'Tag Owner',
      phone: cust.phone,
      bloodType: 'O+',
      medicalNotes: '',
      vehiclePlate: cust.tagCategory?.includes('Vehicle') ? 'Dubai X ' + Math.floor(10000 + Math.random() * 90000) : ''
    });
  }

  // Create tag for customer dashboard view
  db.customer_tags.push({
    emoji: newCust.tag,
    name: (cust.tagCategory || 'Vehicle safety') + ' tag',
    token: newCust.token,
    stats: [
      { label: 'Scans', value: '0', color: 'var(--text-1)' },
      { label: 'Emergencies', value: '0', color: 'var(--danger)' },
      { label: 'Activated', value: 'Today', color: 'var(--text-1)' },
    ],
    showMissing: cust.tagCategory?.includes('Vehicle') || newCust.tag === '🚗',
    status: 'active'
  });

  // Log feed
  db.live_feed.unshift({
    col: 'var(--brand-mid)',
    text: `<strong>Activation</strong> — ${cust.name} registered tag ${newCust.token}`,
    ts: 'Just now'
  });

  saveDB(db);
  return newCust;
}

// Add a retailer
export function addRetailer(ret) {
  const db = getDB();
  const initials = getInitials(ret.name);
  const color = getRandomColorPair();

  const newRet = {
    ini: initials,
    name: ret.name,
    bg: color.bg,
    col: color.col,
    city: ret.city || 'Dubai',
    alloc: 0,
    sold: 0,
    stock: 0,
    commission: '₹0',
    status: 'active'
  };

  db.retailers.unshift(newRet);

  // Create login account
  const username = ret.name.toLowerCase().replace(/\s+/g, '');
  if (!db.users.some(u => u.username === username)) {
    db.users.push({
      username,
      password: '123',
      role: 'retailer',
      name: ret.name,
      initials: initials,
      details: 'Franchise Partner',
      city: ret.city || 'Dubai'
    });
  }

  // Seed default commission row
  db.commissions.push({
    name: ret.name,
    roleType: 'info',
    roleLabel: 'Retailer',
    sales: 0,
    rate: '₹100/tag',
    amount: '₹0',
    status: 'pending'
  });

  saveDB(db);
  return newRet;
}

// Add a marketing executive
export function addMarketingExec(exec) {
  const db = getDB();
  const initials = getInitials(exec.name);
  const color = getRandomColorPair();

  const newExec = {
    ini: initials,
    name: exec.name,
    bg: color.bg,
    col: color.col,
    region: exec.region || 'Dubai',
    customers: 0,
    tags: 0,
    conversion: '0%',
    commission: '₹0',
    status: 'active'
  };

  db.marketing_execs.unshift(newExec);

  // Add user account
  const username = exec.name.toLowerCase().replace(/\s+/g, '');
  if (!db.users.some(u => u.username === username)) {
    db.users.push({
      username,
      password: '123',
      role: 'marketing',
      name: exec.name,
      initials: initials,
      details: 'Field Executive',
      region: exec.region || 'Dubai'
    });
  }

  // Seed default commission row
  db.commissions.push({
    name: exec.name,
    roleType: 'purple',
    roleLabel: 'Executive',
    sales: 0,
    rate: '₹250/tag',
    amount: '₹0',
    status: 'pending'
  });

  saveDB(db);
  return newExec;
}

// Add a vendor
export function addVendor(vend) {
  const db = getDB();
  const newVend = {
    name: vend.name,
    location: vend.location,
    batches: 0,
    total: '0',
    turnaround: vend.turnaround || '5 days',
    status: 'active'
  };
  db.vendors.unshift(newVend);
  saveDB(db);
  return newVend;
}

// Toggle status of record
export function toggleStatus(type, key, keyName = 'name') {
  const db = getDB();
  const list = db[type];
  if (!list) return;

  const idx = list.findIndex(item => item[keyName] === key);
  if (idx !== -1) {
    const current = list[idx].status;
    list[idx].status = current === 'active' ? 'inactive' : 'active';
    saveDB(db);
  }
}

// Edit a record generic
export function editRecord(type, key, keyName, updatedFields) {
  const db = getDB();
  const list = db[type];
  if (!list) return;

  const idx = list.findIndex(item => item[keyName] === key);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updatedFields };
    saveDB(db);
  }
}

// Process payouts
export function processPayouts() {
  const db = getDB();
  db.commissions.forEach(c => {
    c.status = 'active'; // paid
  });

  // Log in live feed
  db.live_feed.unshift({
    col: 'var(--purple)',
    text: `<strong>Payout processed</strong> — All outstanding commissions disbursed`,
    ts: 'Just now'
  });

  saveDB(db);
}

// Retailer tag activation
export function activateRetailerTag(retailerUsername, customerData) {
  const db = getDB();

  // Find retailer name
  const retailerUser = db.users.find(u => u.username === retailerUsername);
  const retailerName = retailerUser ? retailerUser.name : 'SafeZone LLC';

  // Reduce inventory stock
  const cleanCat = customerData.tagCategory.replace(/[^\x00-\x7F]/g, "").trim(); // strip emojis
  const invIdx = db.retailer_inventory.findIndex(inv => inv.type.toLowerCase().includes(cleanCat.toLowerCase()));
  if (invIdx !== -1) {
    if (db.retailer_inventory[invIdx].stock > 0) {
      db.retailer_inventory[invIdx].stock -= 1;
      db.retailer_inventory[invIdx].sold += 1;
    }
  }

  // Update retailer sold count and commission
  const rIdx = db.retailers.findIndex(r => r.name === retailerName);
  if (rIdx !== -1) {
    db.retailers[rIdx].sold += 1;
    db.retailers[rIdx].stock = Math.max(0, db.retailers[rIdx].stock - 1);
    const numericComm = parseInt(db.retailers[rIdx].commission.replace(/[^\d]/g, '')) || 0;
    db.retailers[rIdx].commission = '₹' + (numericComm + 100).toLocaleString();
  }

  // Create new customer and user account
  const token = customerData.token || 'VH-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  const initials = getInitials(customerData.name);
  const color = getRandomColorPair();

  const newCust = {
    ini: initials,
    name: customerData.name,
    bg: color.bg,
    col: color.col,
    phone: customerData.phone,
    tag: customerData.tagCategory.split(' ')[0],
    token: token,
    contacts: 2,
    status: 'active',
    joined: 'Today'
  };

  db.customers.unshift(newCust);

  // Add retailer customer list
  db.retailer_sales.unshift({
    customer: customerData.name,
    type: customerData.tagCategory,
    token: token,
    price: '₹799',
    commission: '₹100',
    date: 'Today'
  });

  // Create login user account
  const customerUsername = customerData.name.toLowerCase().replace(/\s+/g, '');
  if (!db.users.some(u => u.username === customerUsername)) {
    db.users.push({
      username: customerUsername,
      password: '123',
      role: 'customer',
      name: customerData.name,
      initials: initials,
      details: 'Tag Owner',
      phone: customerData.phone,
      bloodType: 'O+',
      medicalNotes: '',
      vehiclePlate: customerData.tagCategory?.includes('Vehicle') ? 'Dubai X ' + Math.floor(10000 + Math.random() * 90000) : ''
    });
  }

  // Create tag for customer view
  db.customer_tags.push({
    emoji: newCust.tag,
    name: customerData.tagCategory + ' tag',
    token: token,
    stats: [
      { label: 'Scans', value: '0', color: 'var(--text-1)' },
      { label: 'Emergencies', value: '0', color: 'var(--danger)' },
      { label: 'Activated', value: 'Today', color: 'var(--text-1)' },
    ],
    showMissing: customerData.tagCategory?.includes('Vehicle') || newCust.tag === '🚗',
    status: 'active'
  });

  // Create / Update Admin Commissions
  const cIdx = db.commissions.findIndex(c => c.name === retailerName);
  if (cIdx !== -1) {
    db.commissions[cIdx].sales += 1;
    const cleanAmt = parseInt(db.commissions[cIdx].amount.replace(/[^\d]/g, '')) || 0;
    db.commissions[cIdx].amount = '₹' + (cleanAmt + 100).toLocaleString();
  }

  // Log in live feed
  db.live_feed.unshift({
    col: 'var(--brand-mid)',
    text: `<strong>Retailer Sale</strong> — ${retailerName} activated tag for ${customerData.name}`,
    ts: 'Just now'
  });

  saveDB(db);
  return token;
}

// Marketing onboarding
export function activateMarketingOnboard(marketingUsername, customerData) {
  const db = getDB();

  // Find executive name
  const execUser = db.users.find(u => u.username === marketingUsername);
  const execName = execUser ? execUser.name : 'Priya Nair';

  // Create customer
  const token = customerData.token || 'VH-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  const initials = getInitials(customerData.name);
  const color = getRandomColorPair();

  const newCust = {
    ini: initials,
    name: customerData.name,
    bg: color.bg,
    col: color.col,
    phone: customerData.phone,
    tag: customerData.tagCategory.split(' ')[0],
    token: token,
    contacts: 2,
    status: 'active',
    joined: 'Today'
  };

  db.customers.unshift(newCust);

  // Sales log
  db.mkt_sales.unshift({
    customer: customerData.name,
    tag: newCust.tag,
    token: token,
    commission: '₹250',
    date: 'Today'
  });

  // Create login user account
  const customerUsername = customerData.name.toLowerCase().replace(/\s+/g, '');
  if (!db.users.some(u => u.username === customerUsername)) {
    db.users.push({
      username: customerUsername,
      password: '123',
      role: 'customer',
      name: customerData.name,
      initials: initials,
      details: 'Tag Owner',
      phone: customerData.phone,
      bloodType: 'O+',
      medicalNotes: '',
      vehiclePlate: customerData.tagCategory?.includes('Vehicle') ? 'Dubai X ' + Math.floor(10000 + Math.random() * 90000) : ''
    });
  }

  // Create tag
  db.customer_tags.push({
    emoji: newCust.tag,
    name: customerData.tagCategory + ' tag',
    token: token,
    stats: [
      { label: 'Scans', value: '0', color: 'var(--text-1)' },
      { label: 'Emergencies', value: '0', color: 'var(--danger)' },
      { label: 'Activated', value: 'Today', color: 'var(--text-1)' },
    ],
    showMissing: customerData.tagCategory?.includes('Vehicle') || newCust.tag === '🚗',
    status: 'active'
  });

  // Update executive stats
  const exIdx = db.marketing_execs.findIndex(ex => ex.name === execName);
  if (exIdx !== -1) {
    db.marketing_execs[exIdx].customers += 1;
    db.marketing_execs[exIdx].tags += 1;
    const numericComm = parseInt(db.marketing_execs[exIdx].commission.replace(/[^\d]/g, '')) || 0;
    db.marketing_execs[exIdx].commission = '₹' + (numericComm + 250).toLocaleString();
  }

  // Update Commissions log
  const cIdx = db.commissions.findIndex(c => c.name === execName);
  if (cIdx !== -1) {
    db.commissions[cIdx].sales += 1;
    const cleanAmt = parseInt(db.commissions[cIdx].amount.replace(/[^\d]/g, '')) || 0;
    db.commissions[cIdx].amount = '₹' + (cleanAmt + 250).toLocaleString();
  }

  // Update marketing commissions cycle
  if (db.mkt_commissions.length > 0) {
    db.mkt_commissions[0].tags += 1;
    const val = parseInt(db.mkt_commissions[0].total.replace(/[^\d]/g, '')) || 0;
    db.mkt_commissions[0].total = '₹' + (val + 250).toLocaleString();
  }

  // Log in live feed
  db.live_feed.unshift({
    col: 'var(--purple)',
    text: `<strong>Onboarding</strong> — ${execName} registered tag for ${customerData.name}`,
    ts: 'Just now'
  });

  saveDB(db);
  return token;
}

// Trigger emergency
export function triggerEmergency(customerUsername, token) {
  const db = getDB();
  const user = db.users.find(u => u.username === customerUsername);
  const ownerName = user ? user.name : 'Ahmed Al Farsi';

  const newEmergency = {
    token: token || 'VH-3K9P-XLAW',
    owner: ownerName,
    cat: token?.startsWith('SR') ? '👴' : '🚗',
    location: 'Dubai South',
    outcome: 'Contact 1 called',
    status: 'alert',
    label: '● Active',
    time: 'Just now'
  };

  db.emergencies.unshift(newEmergency);

  // Update customer scan stats for emergencies count
  const tagIdx = db.customer_tags.findIndex(t => t.token === token);
  if (tagIdx !== -1) {
    const scanStat = db.customer_tags[tagIdx].stats.find(s => s.label === 'Emergencies');
    if (scanStat) {
      scanStat.value = String(Number(scanStat.value) + 1);
    }
  }

  // Log in live feed
  db.live_feed.unshift({
    col: 'var(--danger)',
    text: `<strong>Emergency Alert</strong> — Tag ${newEmergency.token} triggered near ${newEmergency.location}`,
    ts: 'Just now'
  });

  saveDB(db);
}

// File missing vehicle
export function reportVehicleMissing(customerUsername, reportData) {
  const db = getDB();
  const user = db.users.find(u => u.username === customerUsername);
  const ownerName = user ? user.name : 'Ahmed Al Farsi';

  const newMissing = {
    plate: reportData.plate || 'Dubai A 12345',
    owner: ownerName,
    reported: 'Today',
    lastSeen: reportData.lastSeen || 'Unknown',
    sightings: 0,
    status: 'alert',
    label: 'Active'
  };

  db.missing_vehicles.unshift(newMissing);

  // Log in live feed
  db.live_feed.unshift({
    col: 'var(--accent)',
    text: `<strong>Missing Vehicle</strong> — Plate ${newMissing.plate} reported missing`,
    ts: 'Just now'
  });

  saveDB(db);
}

// Update profile details
export function updateProfile(username, profileData) {
  const db = getDB();
  const userIdx = db.users.findIndex(u => u.username === username);
  if (userIdx !== -1) {
    db.users[userIdx] = { ...db.users[userIdx], ...profileData };

    // Update corresponding customer or role table if applicable
    if (db.users[userIdx].role === 'customer') {
      const custIdx = db.customers.findIndex(c => c.name === db.users[userIdx].name || c.phone === db.users[userIdx].phone);
      if (custIdx !== -1) {
        db.customers[custIdx].name = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim() || db.customers[custIdx].name;
        db.customers[custIdx].phone = profileData.phone || db.customers[custIdx].phone;
      }
    }
    saveDB(db);
  }
}

// Generate sticker for an online order
export function generateStickerForOrder(orderId, batchId, seriesNo, vendorCode) {
  const db = getDB();
  const idx = db.qr_orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    db.qr_orders[idx].status = 'sticker_generated';
    db.qr_orders[idx].batchId = batchId;
    db.qr_orders[idx].seriesNo = seriesNo;
    db.qr_orders[idx].vendorCode = vendorCode;
    db.qr_orders[idx].history.push({
      status: 'sticker_generated',
      ts: new Date().toLocaleString()
    });
    db.live_feed.unshift({
      col: 'var(--brand-mid)',
      text: `<strong>Sticker Generated</strong> — Order ${orderId} assigned to series ${seriesNo}`,
      ts: 'Just now'
    });
    saveDB(db);
  }
}

// Courier dispatch for order
export function dispatchOrder(orderId, courier, awb) {
  const db = getDB();
  const idx = db.qr_orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    db.qr_orders[idx].status = 'dispatched';
    db.qr_orders[idx].courier = courier;
    db.qr_orders[idx].awb = awb;
    db.qr_orders[idx].history.push({
      status: 'dispatched',
      ts: new Date().toLocaleString()
    });
    db.live_feed.unshift({
      col: 'var(--accent)',
      text: `<strong>Dispatched Order</strong> — ${orderId} via ${courier} (AWB: ${awb})`,
      ts: 'Just now'
    });
    saveDB(db);
  }
}

// Update courier region charge
export function updateRegionCharge(regionId, newCharge) {
  const db = getDB();
  const idx = db.courier_regions.findIndex(r => r.id === regionId);
  if (idx !== -1) {
    db.courier_regions[idx].charge = Number(newCharge);
    saveDB(db);
  }
}

// Validate scanned barcode/series number by office staff
export function validateBarcodeSeries(barcode) {
  const db = getDB();
  if (!db.validated_barcodes) {
    db.validated_barcodes = [];
  }

  // Find if barcode belongs to any generated batch
  // Let's assume a valid barcode must match a batch's series structure (e.g. starts with SS-)
  // Or match any batch's series range. For demo, we check if it is formatted like 'SS-' followed by digits.
  const isValidFormat = /^SS-\d+$/.test(barcode);
  
  if (!isValidFormat) {
    return { success: false, reason: 'Invalid format. Must match barcode series format (e.g. SS-10001)' };
  }

  // Check if already validated
  if (db.validated_barcodes.includes(barcode)) {
    return { success: false, reason: 'Duplicate! Barcode has already been scanned/validated.' };
  }

  // If valid format and not duplicate, mark it as validated
  db.validated_barcodes.push(barcode);
  db.live_feed.unshift({
    col: 'var(--brand-mid)',
    text: `<strong>Validated Receipt</strong> — Barcode ${barcode} checked in office`,
    ts: 'Just now'
  });
  saveDB(db);
  return { success: true };
}

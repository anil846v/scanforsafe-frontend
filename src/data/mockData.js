// ── ROLES ──────────────────────────────────────────────────────────────────
export const ROLES = [
  { key: 'admin',     label: 'Admin',               dot: '#1D9E75' },
  { key: 'retailer',  label: 'Retailer / Franchise', dot: '#BA7517' },
  { key: 'marketing', label: 'Marketing Executive',  dot: '#6C4AB7' },
  { key: 'customer',  label: 'Customer',             dot: '#185FA5' },
]

// ── PAGE TITLES ────────────────────────────────────────────────────────────
export const PAGE_TITLES = {
  dashboard:         'Dashboard',
  qr:                'QR Management',
  customers:         'Customers',
  retailers:         'Retailers & Franchises',
  marketing_admin:   'Marketing Team',
  emergencies:       'Emergency log',
  missing:           'Missing Vehicles',
  vendors:           'Vendors',
  commissions:       'Commissions & payouts',
  reports:           'Reports',
  inventory:         'Inventory',
  sales:             'Sales log',
  activate:          'Activate tag',
  my_customers:      'My customers',
  earnings:          'My earnings',
  restock:           'Request restock',
  onboard:           'Onboard customer',
  my_leads:          'My leads',
  my_sales:          'My sales',
  commissions_mkt:   'My commissions',
  targets:           'My targets',
  home:              'Home',
  my_tags:           'My tags',
  contacts:          'Emergency contacts',
  profile:           'My profile',
  emergency_history: 'Alert history',
  missing_report:    'Report missing vehicle',
  buy_more:          'Buy tags',
}

// ── LIVE FEED EVENTS ───────────────────────────────────────────────────────
export const FEED_EVENTS = [
  { col: 'var(--danger)',    text: '<strong>Emergency</strong> — VH-3K9P · Dubai South · answered' },
  { col: 'var(--brand-mid)', text: '<strong>Activation</strong> — new Vehicle tag · Sharjah' },
  { col: 'var(--info)',      text: '<strong>Batch printed</strong> — PrintPro · 200 stickers' },
  { col: 'var(--accent)',    text: '<strong>Missing vehicle</strong> — AUH D 44321 reported' },
  { col: 'var(--purple)',    text: '<strong>Commission</strong> — Priya Nair · ₹2,500 logged' },
  { col: 'var(--brand-mid)', text: '<strong>Online purchase</strong> — Senior tag · Abu Dhabi' },
]

// ── ADMIN DATA ─────────────────────────────────────────────────────────────
export const ADMIN_INITIAL_FEED = [
  { col: 'var(--danger)',    text: '<strong>Emergency</strong> — VH-3K9P-XLAW · Dubai South · Contact 1 answered', ts: '2m' },
  { col: 'var(--brand-mid)', text: '<strong>Activation</strong> — Ahmed Al Rashid registered Vehicle tag', ts: '8m' },
  { col: 'var(--info)',      text: '<strong>Batch printed</strong> — PrintPro Dubai · 500 QR stickers', ts: '22m' },
  { col: 'var(--accent)',    text: '<strong>Missing vehicle</strong> — Dubai A 12345 reported · Sharjah', ts: '1h' },
  { col: 'var(--purple)',    text: '<strong>Commission paid</strong> — Priya Nair · ₹14,500', ts: '2h' },
]

export const QR_BATCHES = [
  { id: 'BTH-0088', cat: '🚗 Vehicle',  qty: 500, vendor: 'PrintPro Dubai',  assign: 'SafeZone LLC',  status: 'active',   label: 'Dispatched',       date: '2 May' },
  { id: 'BTH-0089', cat: '👴 Senior',   qty: 200, vendor: 'TagMaster India', assign: '—',             status: 'pending',  label: 'Pending dispatch', date: '4 May' },
  { id: 'BTH-0090', cat: '👶 Kids',     qty: 150, vendor: 'PrintPro Dubai',  assign: 'KidsSafe',      status: 'active',   label: '120/150 active',   date: '1 May' },
  { id: 'BTH-0091', cat: '🐶 Pet',      qty: 100, vendor: 'NFC World',       assign: 'Online',        status: 'pending',  label: 'Pending dispatch', date: '5 May' },
  { id: 'BTH-0087', cat: '🧳 Luggage',  qty: 300, vendor: 'TagMaster India', assign: 'TravelSafe',    status: 'inactive', label: 'Fully activated',  date: '20 Apr' },
]

export const ADMIN_CUSTOMERS = [
  { ini: 'AH', name: 'Ahmed Al Farsi',   bg: '#E1F5EE', col: '#0F6E56', phone: '+971 50 123 4567', tag: '🚗', token: 'VH-3K9P', contacts: 3, status: 'active',   joined: '1 May' },
  { ini: 'FA', name: 'Fatima Al Nouri',  bg: '#FAEEDA', col: '#BA7517', phone: '+971 55 987 1234', tag: '👴', token: 'SR-8XKL', contacts: 2, status: 'active',   joined: '28 Apr' },
  { ini: 'KM', name: 'Khalid Mansoor',   bg: '#EBF3FB', col: '#185FA5', phone: '+971 52 445 8821', tag: '👶', token: 'KD-2PLQ', contacts: 3, status: 'pending',  joined: '5 May' },
  { ini: 'SB', name: 'Sara Baig',        bg: '#F0ECFB', col: '#6C4AB7', phone: '+971 50 772 3390', tag: '🐶', token: 'PT-9QRS', contacts: 1, status: 'active',   joined: '3 May' },
  { ini: 'MJ', name: 'Mohammed Jaber',   bg: '#E1F5EE', col: '#0F6E56', phone: '+971 54 330 6677', tag: '🧳', token: 'LG-5TUV', contacts: 2, status: 'inactive', joined: '15 Apr' },
]

export const ADMIN_RETAILERS = [
  { ini: 'SZ', name: 'SafeZone LLC',       bg: '#E1F5EE', col: '#0F6E56', city: 'Dubai',    alloc: 500, sold: 342, stock: 158, commission: '₹34,200', status: 'active' },
  { ini: 'KS', name: 'KidsSafe Franchise', bg: '#EBF3FB', col: '#185FA5', city: 'Abu Dhabi',alloc: 150, sold: 120, stock: 30,  commission: '₹12,000', status: 'active' },
  { ini: 'TS', name: 'TravelSafe Dubai',   bg: '#FAEEDA', col: '#BA7517', city: 'Dubai',    alloc: 300, sold: 300, stock: 0,   commission: '₹30,000', status: 'inactive' },
  { ini: 'SP', name: 'SeniorPlus Care',    bg: '#F0ECFB', col: '#6C4AB7', city: 'Sharjah',  alloc: 200, sold: 88,  stock: 112, commission: '₹8,800',  status: 'active' },
]

export const ADMIN_EMERGENCIES = [
  { token: 'VH-3K9P', owner: 'Ahmed Al Farsi',  cat: '🚗', location: 'Dubai South', outcome: 'Contact 1 ✓', status: 'alert',    label: '● Active',  time: '2m ago' },
  { token: 'SR-8XKL', owner: 'Fatima Al Nouri', cat: '👴', location: 'Al Ain',      outcome: 'SMS all',     status: 'alert',    label: '● Active',  time: '14m ago' },
  { token: 'VH-7BNK', owner: 'Rashid Omar',     cat: '🚗', location: 'Sharjah',     outcome: 'Contact 2 ✓', status: 'inactive', label: 'Resolved',  time: '2h ago' },
  { token: 'KD-2PLQ', owner: 'Hana Mansoor',    cat: '👶', location: 'Abu Dhabi',   outcome: 'Contact 1 ✓', status: 'inactive', label: 'Resolved',  time: 'Yesterday' },
]

export const ADMIN_MISSING = [
  { plate: 'Dubai A 12345',    owner: 'Ahmed Al Farsi', reported: '6 May',  lastSeen: 'Al Quoz',         sightings: 3,  status: 'alert',    label: 'Active' },
  { plate: 'Sharjah B 98765',  owner: 'Rania Kamal',    reported: '5 May',  lastSeen: 'Industrial Area', sightings: 1,  status: 'alert',    label: 'Active' },
  { plate: 'AUH C 54321',      owner: 'Tariq Yousuf',   reported: '1 May',  lastSeen: 'Mussafah',        sightings: 7,  status: 'pending',  label: 'Under review' },
  { plate: 'Dubai D 11223',    owner: 'Hind Al Ameri',  reported: '28 Apr', lastSeen: 'DIP',             sightings: 12, status: 'inactive', label: 'Recovered' },
]

export const ADMIN_VENDORS = [
  { name: 'PrintPro Dubai',  location: 'Dubai Industrial City', batches: 22, total: '8,400', turnaround: '3 days',  status: 'active' },
  { name: 'TagMaster India', location: 'Bangalore',             batches: 14, total: '4,200', turnaround: '7 days',  status: 'active' },
  { name: 'NFC World',       location: 'Shenzhen',              batches: 6,  total: '1,800', turnaround: '14 days', status: 'pending' },
]

export const ADMIN_COMMISSIONS = [
  { name: 'Priya Nair',        roleType: 'purple', roleLabel: 'Executive', sales: 58,  rate: '₹250/tag', amount: '₹14,500', status: 'pending' },
  { name: 'SafeZone LLC',      roleType: 'info',   roleLabel: 'Retailer',  sales: 342, rate: '₹100/tag', amount: '₹34,200', status: 'active' },
  { name: 'Arun Kumar',        roleType: 'purple', roleLabel: 'Executive', sales: 40,  rate: '₹250/tag', amount: '₹10,000', status: 'pending' },
  { name: 'KidsSafe Franchise',roleType: 'info',   roleLabel: 'Retailer',  sales: 120, rate: '₹100/tag', amount: '₹12,000', status: 'active' },
]

export const ADMIN_MARKETING_EXECS = [
  { ini: 'PN', name: 'Priya Nair',    bg: '#E1F5EE', col: '#0F6E56', region: 'Dubai',    customers: 42, tags: 58, conversion: '72%', commission: '₹14,500', status: 'active' },
  { ini: 'AK', name: 'Arun Kumar',    bg: '#FAEEDA', col: '#BA7517', region: 'Abu Dhabi',customers: 31, tags: 40, conversion: '68%', commission: '₹10,000', status: 'active' },
  { ini: 'LS', name: 'Lara Said',     bg: '#EBF3FB', col: '#185FA5', region: 'Sharjah',  customers: 18, tags: 22, conversion: '61%', commission: '₹5,500',  status: 'active' },
  { ini: 'MF', name: 'Mohamed Fahad', bg: '#F0ECFB', col: '#6C4AB7', region: 'RAK',      customers: 9,  tags: 11, conversion: '55%', commission: '₹2,750',  status: 'inactive' },
]

// ── RETAILER DATA ──────────────────────────────────────────────────────────
export const RETAILER_INVENTORY = [
  { type: '🚗 Vehicle',     stock: 82, alloc: 250, sold: 168, rate: '67%', status: 'active' },
  { type: '👴 Senior care', stock: 34, alloc: 100, sold: 66,  rate: '66%', status: 'active' },
  { type: '👶 Kids safety', stock: 12, alloc: 50,  sold: 38,  rate: '76%', status: 'pending' },
  { type: '🐶 Pet',         stock: 18, alloc: 60,  sold: 42,  rate: '70%', status: 'active' },
  { type: '🧳 Luggage',     stock: 12, alloc: 40,  sold: 28,  rate: '70%', status: 'active' },
]

export const RETAILER_SALES = [
  { customer: 'Ahmed Al Farsi', type: '🚗 Vehicle', token: 'VH-3K9P', price: '₹799', commission: '₹100', date: '1 May' },
  { customer: 'Layla Mahmoud',  type: '👴 Senior',  token: 'SR-8XKL', price: '₹699', commission: '₹100', date: '1 May' },
  { customer: 'Omar Khalil',    type: '👶 Kids',     token: 'KD-2PLQ', price: '₹599', commission: '₹100', date: '29 Apr' },
  { customer: 'Hana Said',      type: '🚗 Vehicle', token: 'VH-5TUV', price: '₹799', commission: '₹100', date: '28 Apr' },
  { customer: 'Nour Hassan',    type: '🐶 Pet',      token: 'PT-9QRS', price: '₹499', commission: '₹100', date: '27 Apr' },
]

export const RETAILER_CUSTOMERS = [
  { ini: 'AH', name: 'Ahmed Al Farsi', bg: '#E1F5EE', col: '#0F6E56', tag: '🚗', token: 'VH-3K9P', contacts: 3, status: 'active', joined: '1 May' },
  { ini: 'LM', name: 'Layla Mahmoud',  bg: '#FAEEDA', col: '#BA7517', tag: '👴', token: 'SR-8XKL', contacts: 2, status: 'active', joined: '1 May' },
  { ini: 'OK', name: 'Omar Khalil',    bg: '#EBF3FB', col: '#185FA5', tag: '👶', token: 'KD-2PLQ', contacts: 3, status: 'active', joined: '29 Apr' },
]

export const RETAILER_EARNINGS = [
  { cycle: 'May 1–15',   tags: 72, rate: '₹100/tag', total: '₹7,200', status: 'pending' },
  { cycle: 'Apr 16–30',  tags: 90, rate: '₹100/tag', total: '₹9,000', status: 'active' },
  { cycle: 'Apr 1–15',   tags: 80, rate: '₹100/tag', total: '₹8,000', status: 'active' },
]

// ── MARKETING DATA ─────────────────────────────────────────────────────────
export const MKT_LEADS = [
  { name: 'Tariq Yousuf',   phone: '+971 52 441 8899', area: 'Mirdif',   interest: '🚗 Vehicle', status: 'pending',  label: 'Called — interested', followUp: '9 May' },
  { name: 'Huda Salman',    phone: '+971 55 673 2210', area: 'Al Barsha', interest: '👴 Senior',  status: 'info',     label: 'Meeting set',         followUp: '8 May' },
  { name: 'Reem Al Kaabi',  phone: '+971 50 119 3388', area: 'JLT',       interest: '🐶 Pet',     status: 'inactive', label: 'Not answered',        followUp: '10 May' },
  { name: 'Faisal Nasser',  phone: '+971 54 220 7744', area: 'Deira',     interest: '🚗 Vehicle', status: 'active',   label: 'Converted',           followUp: '—' },
]

export const MKT_SALES = [
  { customer: 'Ahmed Al Farsi',  tag: '🚗', token: 'VH-3K9P', commission: '₹250', date: '1 May' },
  { customer: 'Mona Al Rashidi', tag: '👴', token: 'SR-8XKL', commission: '₹250', date: '1 May' },
  { customer: 'Hassan Karimi',   tag: '👶', token: 'KD-2PLQ', commission: '₹250', date: '30 Apr' },
  { customer: 'Lina Fawaz',      tag: '🚗', token: 'VH-5TUV', commission: '₹250', date: '29 Apr' },
  { customer: 'Nour Hassan',     tag: '🐶', token: 'PT-9QRS', commission: '₹250', date: '28 Apr' },
]

export const MKT_COMMISSIONS = [
  { cycle: 'May 1–15',  tags: 58, rate: '₹250', bonus: '—',          total: '₹14,500', status: 'pending' },
  { cycle: 'Apr 16–30', tags: 62, rate: '₹250', bonus: '₹2,000',     total: '₹17,500', status: 'active' },
  { cycle: 'Apr 1–15',  tags: 50, rate: '₹250', bonus: '—',          total: '₹12,500', status: 'active' },
]

// ── CUSTOMER DATA ──────────────────────────────────────────────────────────
export const CUSTOMER_TAGS = [
  {
    emoji: '🚗', name: 'Vehicle safety tag', token: 'VH-3K9P-XLAW',
    stats: [
      { label: 'Scans',       value: '3',     color: 'var(--text-1)' },
      { label: 'Emergencies', value: '1',     color: 'var(--danger)' },
      { label: 'Activated',   value: '1 May', color: 'var(--text-1)' },
    ],
    showMissing: true,
  },
  {
    emoji: '👴', name: 'Senior care tag', token: 'SR-4MNP-QTYZ',
    stats: null,
    showMissing: false,
  },
]

export const CUSTOMER_CONTACTS = [
  { ini: 'SF', name: 'Sara Al Farsi',   phone: '+971 50 987 6543', rel: 'Sister',        priority: 'Priority 1', badgeType: 'active',  badgeLabel: 'First called',      bg: '#E1F5EE', col: '#0F6E56' },
  { ini: 'KF', name: 'Khalid Al Farsi', phone: '+971 55 111 2233', rel: 'Brother',       priority: 'Priority 2', badgeType: 'pending', badgeLabel: 'If contact 1 misses', bg: '#EBF3FB', col: '#185FA5' },
  { ini: 'FH', name: 'Dr. Fatima Hassan',phone: '+971 4 300 0000', rel: 'Family doctor', priority: 'Priority 3', badgeType: null,      badgeLabel: null,                bg: '#FAEEDA', col: '#BA7517' },
]

export const CUSTOMER_SCAN_ACTIVITY = [
  { col: 'var(--info)',      text: 'Your tag <code>VH-3K9P</code> was scanned — public viewer · Dubai South', ts: '2h ago' },
  { col: 'var(--brand-mid)', text: 'Your tag <code>SR-4MNP</code> was scanned — public viewer · Jumeirah',   ts: '3 days ago' },
  { col: 'var(--info)',      text: 'Your tag <code>VH-3K9P</code> was scanned — public viewer · Marina',     ts: '5 days ago' },
]

export const BUY_MORE_PRODUCTS = [
  { emoji: '🚗', name: 'Vehicle safety', sub: 'Emergency + missing vehicle',   price: '₹799' },
  { emoji: '👴', name: 'Senior care',    sub: 'For elderly family members',     price: '₹699' },
  { emoji: '👶', name: 'Kids safety',    sub: 'School children protection',     price: '₹599' },
  { emoji: '🐶', name: 'Pet safety',     sub: 'QR tag for your pet',            price: '₹499' },
]

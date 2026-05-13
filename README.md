# Scan for Safe — React + Vite Project

A production-structured React + Vite application converted from the original HTML prototype, with full React Router routing, component separation, and a clean data layer.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## Project structure

```
scanforsafe/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                  ← Entry point (ReactDOM, BrowserRouter)
    ├── App.jsx                   ← Root router (role switcher + route tree)
    │
    ├── styles/
    │   └── globals.css           ← CSS variables, reset, table base
    │
    ├── data/
    │   └── mockData.js           ← All static data (roles, nav labels, table rows)
    │
    ├── hooks/
    │   ├── useLiveFeed.js        ← Auto-rotating live activity feed
    │   └── useEmergencyCountdown.js  ← 5-second SVG ring countdown
    │
    ├── components/
    │   ├── ui/
    │   │   ├── Badge.jsx         ← Status badge (active / pending / alert …)
    │   │   ├── Btn.jsx           ← Button (default / primary / danger, 3 sizes)
    │   │   ├── StatCard.jsx      ← KPI card with colour accent bar
    │   │   ├── Modal.jsx         ← Generic modal wrapper
    │   │   ├── Modals.jsx        ← QRBatchModal + EmergencyModal
    │   │   └── index.jsx         ← Card, PageHeader, AlertBanner, ActivityItem,
    │   │                             Avatar, Mono, ProgressRow, FormGroup,
    │   │                             FormInput, FormSelect, TAG_OPTIONS
    │   └── layout/
    │       ├── AppShell.jsx      ← Sidebar + Topbar + <main> wrapper
    │       ├── Sidebar.jsx       ← Role-coloured nav (React Router Link)
    │       ├── Topbar.jsx        ← Sticky header with title + action slot
    │       └── RoleSwitcher.jsx  ← Dark top bar for switching between roles
    │
    └── pages/
        ├── admin/
        │   ├── AdminPages1.jsx   ← Dashboard, QR, Customers, Retailers
        │   ├── AdminPages2.jsx   ← Emergencies, Missing, Vendors, Commissions,
        │   │                         Marketing, Reports
        │   └── AdminRole.jsx     ← Sidebar config + nested Routes + QR modal
        ├── retailer/
        │   ├── RetailerPages.jsx ← All 7 retailer pages
        │   └── RetailerRole.jsx  ← Sidebar config + nested Routes
        ├── marketing/
        │   ├── MarketingPages.jsx← All 6 marketing pages
        │   └── MarketingRole.jsx ← Sidebar config + nested Routes
        └── customer/
            ├── CustomerPages.jsx ← All 7 customer pages
            └── CustomerRole.jsx  ← Sidebar config + nested Routes + emergency modal
```

---

## Routing

| URL                         | Role       | Page                   |
|-----------------------------|------------|------------------------|
| `/admin/dashboard`          | Admin      | Dashboard              |
| `/admin/qr`                 | Admin      | QR Management          |
| `/admin/customers`          | Admin      | Customers              |
| `/admin/retailers`          | Admin      | Retailers              |
| `/admin/marketing_admin`    | Admin      | Marketing Team         |
| `/admin/emergencies`        | Admin      | Emergency log          |
| `/admin/missing`            | Admin      | Missing Vehicles       |
| `/admin/vendors`            | Admin      | Vendors                |
| `/admin/commissions`        | Admin      | Commissions & payouts  |
| `/admin/reports`            | Admin      | Reports                |
| `/retailer/dashboard`       | Retailer   | Dashboard              |
| `/retailer/inventory`       | Retailer   | Inventory              |
| `/retailer/activate`        | Retailer   | Activate tag           |
| `/retailer/sales`           | Retailer   | Sales log              |
| `/retailer/my_customers`    | Retailer   | My customers           |
| `/retailer/earnings`        | Retailer   | My earnings            |
| `/retailer/restock`         | Retailer   | Request restock        |
| `/marketing/dashboard`      | Marketing  | My dashboard           |
| `/marketing/onboard`        | Marketing  | Onboard customer       |
| `/marketing/my_leads`       | Marketing  | My leads               |
| `/marketing/my_sales`       | Marketing  | My sales               |
| `/marketing/commissions_mkt`| Marketing  | My commissions         |
| `/marketing/targets`        | Marketing  | My targets             |
| `/customer/home`            | Customer   | Home                   |
| `/customer/my_tags`         | Customer   | My tags                |
| `/customer/contacts`        | Customer   | Emergency contacts     |
| `/customer/profile`         | Customer   | My profile             |
| `/customer/emergency_history`| Customer  | Alert history          |
| `/customer/missing_report`  | Customer   | Report missing vehicle |
| `/customer/buy_more`        | Customer   | Buy tags               |

---

## Customisation

- **Brand colours** → edit `:root` in `src/styles/globals.css`
- **Mock data** → edit `src/data/mockData.js` (swap for API calls later)
- **Add a page** → create component, add a `<Route>` in the relevant `*Role.jsx`, add nav item to that role's `NAV_GROUPS`
- **Real API** → replace arrays in `mockData.js` with `fetch` / `axios` / React Query calls inside each page component

---

## Tech stack

| Package           | Version  | Purpose               |
|-------------------|----------|-----------------------|
| react             | 18.x     | UI framework          |
| react-dom         | 18.x     | DOM renderer          |
| react-router-dom  | 6.x      | Client-side routing   |
| vite              | 5.x      | Dev server & bundler  |
| @vitejs/plugin-react | 4.x   | JSX transform         |

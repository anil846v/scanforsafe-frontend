import React from 'react';

const baseSvg = (path, size = 18, color = 'currentColor', style = {}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
  >
    {path}
  </svg>
);

export const DashboardIcon = ({ size, color, style }) => baseSvg(
  <>
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </>,
  size, color, style
);

export const QRIcon = ({ size, color, style }) => baseSvg(
  <>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2v2-2zM18 14h2v2-2zM16 16h2v2h-2z" />
  </>,
  size, color, style
);

export const UsersIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>,
  size, color, style
);

export const RetailerIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </>,
  size, color, style
);

export const MarketingIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.5 7.5" />
    <path d="M14 11a3 3 0 1 1-3-3" />
  </>,
  size, color, style
);

export const EmergencyIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </>,
  size, color, style
);

export const MissingIcon = ({ size, color, style }) => baseSvg(
  <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <path d="M11 8v6h4" />
  </>,
  size, color, style
);

export const VendorIcon = ({ size, color, style }) => baseSvg(
  <>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </>,
  size, color, style
);

export const CommissionIcon = ({ size, color, style }) => baseSvg(
  <>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </>,
  size, color, style
);

export const ReportIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </>,
  size, color, style
);

export const InventoryIcon = ({ size, color, style }) => baseSvg(
  <>
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </>,
  size, color, style
);

export const SalesIcon = ({ size, color, style }) => baseSvg(
  <>
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </>,
  size, color, style
);

export const ActivateIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </>,
  size, color, style
);

export const RestockIcon = ({ size, color, style }) => baseSvg(
  <>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </>,
  size, color, style
);

export const HomeIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </>,
  size, color, style
);

export const ContactsIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </>,
  size, color, style
);

export const ProfileIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>,
  size, color, style
);

export const BuyIcon = ({ size, color, style }) => baseSvg(
  <>
    <circle cx="10" cy="20.5" r="1" />
    <circle cx="18" cy="20.5" r="1" />
    <path d="M2.5 2.5h3l2.5 12.5H20l2-8H7.5" />
    <line x1="14" y1="8" x2="14" y2="14" />
    <line x1="11" y1="11" x2="17" y2="11" />
  </>,
  size, color, style
);

export const SearchIcon = ({ size, color, style }) => baseSvg(
  <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </>,
  size, color, style
);

export const BellIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9z" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </>,
  size, color, style
);

export const EditIcon = ({ size = 14, color, style }) => baseSvg(
  <>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
  </>,
  size, color, style
);

export const EyeIcon = ({ size = 14, color, style }) => baseSvg(
  <>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </>,
  size, color, style
);

export const CloseIcon = ({ size = 16, color, style }) => baseSvg(
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>,
  size, color, style
);

export const MenuIcon = ({ size = 20, color, style }) => baseSvg(
  <>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </>,
  size, color, style
);

export const ChevronIcon = ({ direction = 'left', size = 16, color, style }) => {
  const points = direction === 'left' 
    ? '15 18 9 12 15 6' 
    : direction === 'right' 
    ? '9 18 15 12 9 6' 
    : direction === 'down' 
    ? '6 9 12 15 18 9' 
    : '6 15 12 9 18 15';
  return baseSvg(<polyline points={points} />, size, color, style);
};

export const ShieldCheckIcon = ({ size, color, style }) => baseSvg(
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 11 11 13 15 9" />
  </>,
  size, color, style
);

export const TrashIcon = ({ size = 14, color, style }) => baseSvg(
  <>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </>,
  size, color, style
);

// Map standard text categories to icons
export function getSidebarIcon(text, color) {
  switch (text) {
    case 'Dashboard':
    case 'My dashboard':
      return <DashboardIcon color={color} />;
    case 'QR Management':
      return <QRIcon color={color} />;
    case 'Customers':
    case 'My customers':
      return <UsersIcon color={color} />;
    case 'Retailers':
      return <RetailerIcon color={color} />;
    case 'Marketing Team':
      return <MarketingIcon color={color} />;
    case 'Emergencies':
      return <EmergencyIcon color={color} />;
    case 'Missing Vehicles':
    case 'Report missing vehicle':
      return <MissingIcon color={color} />;
    case 'Vendors':
      return <VendorIcon color={color} />;
    case 'Commissions':
    case 'My commissions':
    case 'Commissions & payouts':
      return <CommissionIcon color={color} />;
    case 'Reports':
      return <ReportIcon color={color} />;
    case 'Inventory':
      return <InventoryIcon color={color} />;
    case 'Sales log':
    case 'My sales':
      return <SalesIcon color={color} />;
    case 'Activate tag':
      return <ActivateIcon color={color} />;
    case 'My earnings':
      return <CommissionIcon color={color} />;
    case 'Request restock':
      return <RestockIcon color={color} />;
    case 'Onboard customer':
      return <UsersIcon color={color} />;
    case 'My leads':
      return <MarketingIcon color={color} />;
    case 'My targets':
      return <DashboardIcon color={color} />;
    case 'Home':
      return <HomeIcon color={color} />;
    case 'My tags':
      return <ActivateIcon color={color} />;
    case 'Emergency contacts':
      return <ContactsIcon color={color} />;
    case 'My profile':
      return <ProfileIcon color={color} />;
    case 'Alert history':
      return <EmergencyIcon color={color} />;
    case 'Buy tags':
      return <BuyIcon color={color} />;
    default:
      return null;
  }
}

import React from 'react';
import { PageHeader, Card, CardHeader, CardBody } from '@/components/ui/index';

export default function SystemGuide() {
  return (
    <div style={{ maxWidth: 840, margin: '0 auto', paddingBottom: 60 }}>
      <PageHeader 
        title="ScanForSafe System Guide" 
        sub="Comprehensive manual on workflows, roles, and interlinked operations." 
      />

      <div style={{ display: 'grid', gap: 20 }}>
        
        <Card>
          <CardHeader title="1. Executive Summary" />
          <CardBody>
            <p style={{ lineHeight: 1.6, color: 'var(--text-2)', fontSize: 14 }}>
              ScanForSafe is a comprehensive NFC & QR-based emergency response system. It provides safety shields for vehicles, pets, luggage, and individuals (such as senior citizens or kids). When a tag is scanned by any smartphone, the system instantly triggers an alert sequence to the owner's emergency contacts while sharing the precise GPS location of the incident.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="2. User Roles & Workflows" />
          <CardBody style={{ display: 'grid', gap: 16 }}>
            
            {/* Super Admin */}
            <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 12 }}>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: 8 }}>
                🛡️ Super Admin
              </h4>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>
                The core administrator. They can generate and dispatch QR/NFC batches to Retailers and Vendors. They manage all users in the system, track global scan activity, oversee missing vehicle reports, and handle commission payouts for Retailers and Marketing Executives.
              </p>
            </div>

            {/* Retailer (Franchise Partner) */}
            <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 12 }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#0F6E56', display: 'flex', alignItems: 'center', gap: 8 }}>
                🏪 Retailer (Franchise Partner)
              </h4>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>
                Retailers purchase bulk tags from the Admin. When a customer buys a tag from their shop, the retailer helps them activate it by scanning the tag. The system logs this sale, and the Retailer earns a commission for every activated tag. They have their own dashboard to track inventory and earnings.
              </p>
            </div>

            {/* Marketing Executive */}
            <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 12 }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#6C4AB7', display: 'flex', alignItems: 'center', gap: 8 }}>
                📣 Marketing Executive
              </h4>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>
                Field executives who pitch the product to potential customers. They log their leads in the system. When they successfully onboard a customer and activate a tag for them, they earn a commission. Their dashboard tracks their leads, conversion rates, and targets.
              </p>
            </div>

            {/* End Customer */}
            <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 12 }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#185FA5', display: 'flex', alignItems: 'center', gap: 8 }}>
                👤 End Customer
              </h4>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>
                Customers own the tags. They set up their medical profile and define a sequence of Emergency Contacts. If their tag is scanned, their contacts are dialed in order of priority. Customers can also report their vehicles missing, which broadcasts alerts to security checkpoints.
              </p>
            </div>

          </CardBody>
        </Card>

        <Card>
          <CardHeader title="3. Data Interlinking & Commissions" />
          <CardBody>
            <ul style={{ paddingLeft: 20, margin: 0, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <li style={{ marginBottom: 8 }}><strong>Cross-Dashboard Sync:</strong> When a Customer reports an emergency, the Admin sees the alert in real-time on the global live feed.</li>
              <li style={{ marginBottom: 8 }}><strong>Commission Engine:</strong> Every tag activation is tracked via a unique Token ID. If the activation was facilitated by a Retailer or Marketing Exec, a commission row is instantly added to their respective earnings table and to the Admin's payout queue.</li>
              <li><strong>Inventory Depletion:</strong> When a Retailer sells a tag, their stock automatically decreases, and the tag moves from the 'Admin' stock pool to the 'Customer' active pool.</li>
            </ul>
          </CardBody>
        </Card>

      </div>
    </div>
  );
}

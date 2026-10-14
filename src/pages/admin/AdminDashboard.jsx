import React from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { OrdersManager } from './OrdersManager';
import { MenuManager } from './MenuManager';
import { DemandAnalytics } from './DemandAnalytics';
import { 
  ClipboardList, 
  Settings2, 
  BarChart3, 
  Clock, 
  ChefHat, 
  BellRing, 
  CheckCircle2, 
  IndianRupee, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const AdminDashboard = () => {
  const { orders, adminTab, setAdminTab } = useCanteen();

  // Compute stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const preparingOrders = orders.filter((o) => o.status === 'Preparing').length;
  const readyOrders = orders.filter((o) => o.status === 'Ready').length;
  const completedOrders = orders.filter((o) => o.status === 'Completed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="animate-fade-in">
      {/* Admin Title & Demo Disclaimer */}
      <div className="admin-header-row">
        <div className="admin-title-wrap">
          <h2>Canteen Staff Administration Dashboard</h2>
          <p>
            Real-time kitchen order dispatch, live menu availability, and waste monitoring.
          </p>
        </div>

        <div
          style={{
            background: '#1e293b',
            color: '#38bdf8',
            padding: '0.45rem 0.95rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            border: '1px solid #334155'
          }}
        >
          <ShieldCheck size={16} />
          <span>Demo Staff Mode • LocalStorage Active</span>
        </div>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="stats-grid">
        {/* Total Orders */}
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: '#ffedd5', color: '#c2410c' }}>
            <ClipboardList size={24} />
          </div>
          <div className="stat-meta">
            <h3>{totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        {/* Pending Queue */}
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: '#fef3c7', color: '#b45309' }}>
            <Clock size={24} />
          </div>
          <div className="stat-meta">
            <h3>{pendingOrders}</h3>
            <p>Pending / Queued</p>
          </div>
        </div>

        {/* Currently Cooking */}
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: '#e0f2fe', color: '#0369a1' }}>
            <ChefHat size={24} />
          </div>
          <div className="stat-meta">
            <h3>{preparingOrders}</h3>
            <p>In Preparation</p>
          </div>
        </div>

        {/* Ready for Pickup */}
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: '#d1fae5', color: '#047857' }}>
            <BellRing size={24} />
          </div>
          <div className="stat-meta">
            <h3>{readyOrders}</h3>
            <p>Ready at Counter</p>
          </div>
        </div>

        {/* Completed */}
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: '#f1f5f9', color: '#475569' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-meta">
            <h3>{completedOrders}</h3>
            <p>Fulfilled</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: '#ecfdf5', color: '#059669' }}>
            <IndianRupee size={24} />
          </div>
          <div className="stat-meta">
            <h3>₹{totalRevenue}</h3>
            <p>Revenue Recorded</p>
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="admin-tab-nav" role="tablist">
        <button
          role="tab"
          aria-selected={adminTab === 'orders'}
          className={`admin-tab-btn ${adminTab === 'orders' ? 'active' : ''}`}
          onClick={() => setAdminTab('orders')}
        >
          <ClipboardList size={18} />
          <span>Live Kitchen Queue ({pendingOrders + preparingOrders} active)</span>
        </button>

        <button
          role="tab"
          aria-selected={adminTab === 'menu-mgmt'}
          className={`admin-tab-btn ${adminTab === 'menu-mgmt' ? 'active' : ''}`}
          onClick={() => setAdminTab('menu-mgmt')}
        >
          <Settings2 size={18} />
          <span>Menu & Stock Control</span>
        </button>

        <button
          role="tab"
          aria-selected={adminTab === 'analytics'}
          className={`admin-tab-btn ${adminTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setAdminTab('analytics')}
        >
          <BarChart3 size={18} />
          <span>Waste & Demand Analytics</span>
        </button>
      </div>

      {/* Render Active Tab Component */}
      <div>
        {adminTab === 'orders' && <OrdersManager />}
        {adminTab === 'menu-mgmt' && <MenuManager />}
        {adminTab === 'analytics' && <DemandAnalytics />}
      </div>
    </div>
  );
};

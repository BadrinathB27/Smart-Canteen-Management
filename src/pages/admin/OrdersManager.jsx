import React, { useState, useMemo } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { 
  ClipboardList, 
  Search, 
  Clock, 
  User, 
  ChefHat, 
  BellRing, 
  CheckCircle2, 
  XCircle, 
  Phone,
  FileText
} from 'lucide-react';

export const OrdersManager = () => {
  const { orders, updateOrderStatus, cancelOrder } = useCanteen();
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === 'All' || order.status.toLowerCase() === statusFilter.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        order.token.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        (order.studentId && order.studentId.toLowerCase().includes(query));

      return matchesStatus && matchesQuery;
    });
  }, [orders, statusFilter, searchQuery]);

  return (
    <div className="animate-fade-in">
      {/* Header & Filter Controls */}
      <div className="orders-table-wrapper">
        <div className="orders-filter-bar">
          {/* Status Tabs */}
          <div className="order-status-tabs">
            {['All', 'Pending', 'Preparing', 'Ready', 'Completed'].map((st) => {
              const count =
                st === 'All'
                  ? orders.length
                  : orders.filter((o) => o.status.toLowerCase() === st.toLowerCase()).length;

              return (
                <button
                  key={st}
                  className={`order-filter-pill ${statusFilter === st ? 'active' : ''}`}
                  onClick={() => setStatusFilter(st)}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search token / student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '0.85rem', width: '100%', borderRadius: '9999px' }}
            />
          </div>
        </div>

        {/* Order Cards Grid */}
        {filteredOrders.length > 0 ? (
          <div className="orders-grid-admin">
            {filteredOrders.map((order) => {
              const orderTime = new Date(order.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={order.id}
                  className={`order-admin-card ${order.status.toLowerCase()}`}
                >
                  {/* Card Header: Token & Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          background: '#0f172a',
                          color: 'white',
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px'
                        }}
                      >
                        {order.token}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{orderTime}</span>
                    </div>

                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Student Details */}
                  <div style={{ fontSize: '0.82rem', color: '#334155', background: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>
                      {order.customerName} ({order.studentId || 'N/A'})
                    </div>
                    <div style={{ color: '#64748b', display: 'flex', gap: '0.75rem', marginTop: '2px' }}>
                      <span>📱 {order.phone}</span>
                      <span>🕒 {order.pickupSlot}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: '0.25rem 0' }}>
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.85rem'
                        }}
                      >
                        <span>
                          <strong style={{ color: '#f97316' }}>{item.quantity}x</strong> {item.name}
                        </span>
                        <span style={{ fontWeight: 600, color: '#475569' }}>
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Notes if any */}
                  {order.notes && (
                    <div
                      style={{
                        fontSize: '0.75rem',
                        background: '#fffbeb',
                        border: '1px solid #fde68a',
                        color: '#92400e',
                        padding: '0.35rem 0.6rem',
                        borderRadius: '6px'
                      }}
                    >
                      <strong>Note:</strong> {order.notes}
                    </div>
                  )}

                  {/* Total & Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #f1f5f9',
                      marginTop: 'auto'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Total ({order.paymentMode})</span>
                      <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>₹{order.totalAmount}</strong>
                    </div>

                    {/* Status Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Preparing')}
                          style={{
                            background: '#0284c7',
                            color: 'white',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                          title="Start cooking"
                        >
                          <ChefHat size={14} /> Start Prep
                        </button>
                      )}

                      {order.status === 'Preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Ready')}
                          style={{
                            background: '#059669',
                            color: 'white',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                          title="Ready for pickup"
                        >
                          <BellRing size={14} /> Mark Ready
                        </button>
                      )}

                      {order.status === 'Ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Completed')}
                          style={{
                            background: '#475569',
                            color: 'white',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                          title="Food collected by student"
                        >
                          <CheckCircle2 size={14} /> Collected
                        </button>
                      )}

                      {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Cancel order ${order.token}?`)) {
                              cancelOrder(order.id);
                            }
                          }}
                          style={{
                            background: '#fee2e2',
                            color: '#b91c1c',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 600
                          }}
                          title="Cancel order"
                        >
                          <XCircle size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3.5rem', color: '#64748b' }}>
            <ClipboardList size={36} style={{ margin: '0 auto 0.75rem', color: '#cbd5e1' }} />
            <h4>No orders found matching "{statusFilter}"</h4>
          </div>
        )}
      </div>
    </div>
  );
};

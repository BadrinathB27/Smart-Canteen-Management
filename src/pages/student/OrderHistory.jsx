import React from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { History, Ticket, ArrowRight, Clock, ShoppingBag, CheckCircle } from 'lucide-react';

export const OrderHistory = () => {
  const { orders, setActiveToken, setStudentTab, addToCart, setIsCartOpen, menu } = useCanteen();

  const handleTrackOrder = (token) => {
    setActiveToken(token);
    setStudentTab('track');
  };

  const handleReorder = (orderItems) => {
    orderItems.forEach((orderItem) => {
      const menuItem = menu.find((m) => m.id === orderItem.id);
      if (menuItem && menuItem.isAvailable) {
        addToCart(menuItem);
      }
    });
    setIsCartOpen(true);
  };

  return (
    <section className="animate-fade-in" style={{ maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#ffedd5', padding: '8px', borderRadius: '10px', color: '#ea580c' }}>
          <History size={22} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>My Order History</h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            All past and current canteen orders associated with your student session.
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '3rem',
            textAlign: 'center'
          }}
        >
          <ShoppingBag size={40} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
          <h3>No Orders Yet</h3>
          <p style={{ color: '#64748b', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
            You haven't placed any canteen orders in this demonstration session yet.
          </p>
          <button
            onClick={() => setStudentTab('menu')}
            style={{
              background: '#f97316',
              color: 'white',
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontWeight: 700
            }}
          >
            Explore Menu & Order
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order) => {
            const dateStr = new Date(order.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={order.id}
                style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                {/* Top Row: Token & Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span
                      style={{
                        background: '#0f172a',
                        color: 'white',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 800,
                        fontSize: '1rem',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {order.token}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={12} /> {dateStr} • {order.pickupSlot}
                    </span>
                  </div>

                  <span className={`status-badge status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                {/* Items Summary */}
                <div style={{ fontSize: '0.88rem', color: '#334155' }}>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.quantity}x {item.name}
                      {idx < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>

                {/* Bottom Row: Amount & Actions */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #f1f5f9',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                    Total Paid: <span style={{ color: '#f97316' }}>₹{order.totalAmount}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button
                      onClick={() => handleReorder(order.items)}
                      style={{
                        background: '#f1f5f9',
                        color: '#334155',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 600
                      }}
                    >
                      Re-Order
                    </button>
                    <button
                      onClick={() => handleTrackOrder(order.token)}
                      style={{
                        background: '#f97316',
                        color: 'white',
                        padding: '0.45rem 0.95rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Ticket size={14} /> View Token & Track
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

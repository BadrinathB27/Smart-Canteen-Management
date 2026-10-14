import React, { useState } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { 
  Ticket, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  BellRing, 
  Search, 
  MapPin, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const OrderTracking = () => {
  const { orders, activeToken, setActiveToken, updateOrderStatus } = useCanteen();
  const [searchTokenInput, setSearchTokenInput] = useState('');

  // Find the selected order or default to the most recent one
  const currentOrder =
    orders.find((o) => o.token.toUpperCase() === (activeToken || '').toUpperCase()) ||
    orders[0];

  const handleSearchToken = (e) => {
    e.preventDefault();
    if (!searchTokenInput.trim()) return;
    const cleanToken = searchTokenInput.trim().toUpperCase();
    setActiveToken(cleanToken);
  };

  // Stepper status definitions
  const steps = [
    { key: 'Pending', label: 'Order Received', desc: 'Sent to canteen kitchen', icon: Clock },
    { key: 'Preparing', label: 'Kitchen Preparing', desc: 'Chef is cooking your dish', icon: ChefHat },
    { key: 'Ready', label: 'Ready for Pickup', desc: 'Hot & packed at Counter 2', icon: BellRing },
    { key: 'Completed', label: 'Completed', desc: 'Order collected', icon: CheckCircle2 }
  ];

  const getStepStatus = (stepKey, currentStatus) => {
    const order = ['Pending', 'Preparing', 'Ready', 'Completed'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  // Helper for quick demonstration advancement
  const handleSimulateNextStep = () => {
    if (!currentOrder) return;
    const orderMap = {
      Pending: 'Preparing',
      Preparing: 'Ready',
      Ready: 'Completed'
    };
    const nextStatus = orderMap[currentOrder.status];
    if (nextStatus) {
      updateOrderStatus(currentOrder.id, nextStatus);
    }
  };

  return (
    <div className="tracking-wrapper animate-fade-in">
      {/* Search Bar to Track Any Token */}
      <div
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Ticket size={20} color="#f97316" />
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Track Token:</span>
          {/* Quick chip selector for recent demo tokens */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {orders.slice(0, 4).map((ord) => (
              <button
                key={ord.id}
                onClick={() => setActiveToken(ord.token)}
                style={{
                  background: ord.token === currentOrder?.token ? '#ffedd5' : '#f1f5f9',
                  color: ord.token === currentOrder?.token ? '#c2410c' : '#475569',
                  border: ord.token === currentOrder?.token ? '1px solid #fed7aa' : '1px solid #e2e8f0',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700
                }}
              >
                {ord.token}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSearchToken} style={{ display: 'flex', gap: '0.4rem' }}>
          <input
            type="text"
            placeholder="e.g. CN-102"
            value={searchTokenInput}
            onChange={(e) => setSearchTokenInput(e.target.value)}
            style={{ width: '130px', padding: '0.45rem 0.8rem', fontSize: '0.85rem' }}
          />
          <button
            type="submit"
            style={{
              background: '#f97316',
              color: 'white',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}
          >
            Track
          </button>
        </form>
      </div>

      {!currentOrder ? (
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}
        >
          <AlertCircle size={40} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
          <h3>Token not found</h3>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
            Please check the token number or browse your order history.
          </p>
        </div>
      ) : (
        <>
          {/* Main Digital Token Pass */}
          <div className="token-hero-card">
            <span className="token-chip-label">Official College Digital Token</span>
            <div className="token-big-number">{currentOrder.token}</div>

            {/* Simulated QR Code for Counter Scanner */}
            <div className="token-qr-box" title="Scan at canteen counter barcode reader">
              <svg viewBox="0 0 100 100" fill="currentColor">
                {/* Simulated high-fidelity 2D Barcode pattern */}
                <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                <rect x="10" y="10" width="15" height="15" fill="white" />
                <rect x="13" y="13" width="9" height="9" fill="#0f172a" />
                <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                <rect x="75" y="10" width="15" height="15" fill="white" />
                <rect x="78" y="13" width="9" height="9" fill="#0f172a" />
                <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                <rect x="10" y="75" width="15" height="15" fill="white" />
                <rect x="13" y="78" width="9" height="9" fill="#0f172a" />
                {/* Dots */}
                <rect x="35" y="10" width="6" height="6" fill="#0f172a" />
                <rect x="45" y="10" width="8" height="6" fill="#0f172a" />
                <rect x="58" y="15" width="6" height="6" fill="#0f172a" />
                <rect x="35" y="25" width="6" height="8" fill="#0f172a" />
                <rect x="45" y="22" width="6" height="6" fill="#0f172a" />
                <rect x="55" y="25" width="8" height="6" fill="#0f172a" />
                <rect x="15" y="40" width="12" height="6" fill="#0f172a" />
                <rect x="32" y="40" width="6" height="6" fill="#0f172a" />
                <rect x="42" y="38" width="16" height="8" fill="#0f172a" />
                <rect x="65" y="40" width="10" height="6" fill="#0f172a" />
                <rect x="80" y="40" width="14" height="6" fill="#0f172a" />
                <rect x="35" y="55" width="12" height="6" fill="#0f172a" />
                <rect x="52" y="52" width="8" height="8" fill="#0f172a" />
                <rect x="68" y="55" width="8" height="6" fill="#0f172a" />
                <rect x="35" y="70" width="6" height="12" fill="#0f172a" />
                <rect x="45" y="75" width="10" height="6" fill="#0f172a" />
                <rect x="60" y="70" width="12" height="6" fill="#0f172a" />
                <rect x="78" y="75" width="14" height="8" fill="#0f172a" />
              </svg>
            </div>

            {/* Current Status Pill */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <span className={`status-badge status-${currentOrder.status.toLowerCase()}`}>
                {currentOrder.status === 'Ready' && '🔔 '}
                {currentOrder.status === 'Preparing' && '👨‍🍳 '}
                {currentOrder.status === 'Pending' && '⏳ '}
                {currentOrder.status === 'Completed' && '✅ '}
                Order Status: {currentOrder.status.toUpperCase()}
              </span>
            </div>

            {/* Instructions based on status */}
            <div style={{ maxWidth: '480px', margin: '0 auto', fontSize: '0.9rem', color: '#cbd5e1' }}>
              {currentOrder.status === 'Ready' && (
                <p style={{ color: '#6ee7b7', fontWeight: 700 }}>
                  🎉 Your food is hot and packed! Please proceed to <strong>Counter 2</strong> and present this token to collect.
                </p>
              )}
              {currentOrder.status === 'Preparing' && (
                <p>
                  🍳 Kitchen is preparing your freshly cooked meal. Estimated wait is approximately{' '}
                  <strong>{currentOrder.estimatedMinutes || 6} mins</strong>.
                </p>
              )}
              {currentOrder.status === 'Pending' && (
                <p>
                  📋 Your order was received by the canteen counter and is queued for preparation.
                </p>
              )}
              {currentOrder.status === 'Completed' && (
                <p style={{ color: '#94a3b8' }}>
                  ✨ This order has been collected and completed. Thank you for dining with CampusBite!
                </p>
              )}
            </div>

            {/* Demo advancement helper for viva/project demonstration */}
            {currentOrder.status !== 'Completed' && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  onClick={handleSimulateNextStep}
                  style={{
                    background: 'rgba(249, 115, 22, 0.25)',
                    color: '#fed7aa',
                    border: '1px solid rgba(249, 115, 22, 0.5)',
                    padding: '0.45rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Sparkles size={14} /> Simulate Next Status (For Project Demo) <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Stepper Progress Bar */}
          <div className="progress-stepper">
            {steps.map((st, index) => {
              const state = getStepStatus(st.key, currentOrder.status);
              const StepIcon = st.icon;

              return (
                <div key={st.key} className={`step-node ${state}`}>
                  <div className="step-circle">
                    <StepIcon size={20} />
                  </div>
                  <div>
                    <div className="step-label">{st.label}</div>
                    <div className="step-time">{st.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Details & Summary Card */}
          <div className="order-details-card">
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              Order Breakdown • {currentOrder.token}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                  Student Name & Roll
                </span>
                <p style={{ fontWeight: 700, color: '#0f172a' }}>
                  {currentOrder.customerName} ({currentOrder.studentId})
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                  Pickup Slot
                </span>
                <p style={{ fontWeight: 700, color: '#0f172a' }}>
                  {currentOrder.pickupSlot}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                  Payment Method
                </span>
                <p style={{ fontWeight: 700, color: '#0f172a' }}>
                  {currentOrder.paymentMode}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                  Counter Location
                </span>
                <p style={{ fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <MapPin size={14} /> Main Canteen - Counter 2
                </p>
              </div>
            </div>

            {/* Ordered Items Table */}
            <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '0.75rem', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                Items Ordered:
              </div>
              {currentOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0',
                    borderBottom: idx < currentOrder.items.length - 1 ? '1px solid #e2e8f0' : 'none',
                    fontSize: '0.88rem'
                  }}
                >
                  <span>
                    <strong>{item.quantity}x</strong> {item.name}
                  </span>
                  <span style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  marginTop: '0.5rem',
                  borderTop: '2px dashed #cbd5e1',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: '#0f172a'
                }}
              >
                <span>Total Amount Paid:</span>
                <span style={{ color: '#f97316' }}>₹{currentOrder.totalAmount}</span>
              </div>
            </div>

            {currentOrder.notes && (
              <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#64748b' }}>
                <strong>Chef Note:</strong> "{currentOrder.notes}"
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

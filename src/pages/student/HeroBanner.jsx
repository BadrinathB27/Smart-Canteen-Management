import React from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { Flame, Clock, Sparkles, TrendingUp, Ticket } from 'lucide-react';

export const HeroBanner = ({ onExploreClick }) => {
  const { orders, setStudentTab, activeToken } = useCanteen();

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Preparing'
  ).length;

  return (
    <section className="hero-banner animate-fade-in">
      <div className="hero-content">
        <div className="hero-tag">
          <Sparkles size={14} /> Smart Campus Dining • Break Rush Solution
        </div>
        
        <h2 className="hero-title">
          Skip The 20-Min Queue, <span>Order Ahead & Grab Hot Meals</span>
        </h2>
        
        <p className="hero-desc">
          Browse today’s fresh kitchen items, order straight from your phone during class breaks, 
          and collect food effortlessly with your unique digital token when your order status turns <strong>Ready</strong>.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            onClick={onExploreClick}
            style={{
              background: '#f97316',
              color: 'white',
              padding: '0.75rem 1.4rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)'
            }}
          >
            <Flame size={18} /> View Fresh Menu
          </button>

          {activeToken && (
            <button
              onClick={() => setStudentTab('track')}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0.75rem 1.4rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Ticket size={18} color="#fdba74" /> Track Token ({activeToken})
            </button>
          )}
        </div>

        {/* Live campus ticker stats */}
        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <div className="hero-stat-icon">
              <Clock size={20} />
            </div>
            <div className="hero-stat-text">
              <strong>6 - 8 mins</strong>
              <span>Avg. Kitchen Prep</span>
            </div>
          </div>

          <div className="hero-stat-item">
            <div className="hero-stat-icon">
              <TrendingUp size={20} />
            </div>
            <div className="hero-stat-text">
              <strong>{activeOrdersCount} in Queue</strong>
              <span>Live Kitchen Orders</span>
            </div>
          </div>

          <div className="hero-stat-item">
            <div className="hero-stat-icon">
              <Sparkles size={20} />
            </div>
            <div className="hero-stat-text">
              <strong>100% Digital</strong>
              <span>Zero Paper Tokens</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

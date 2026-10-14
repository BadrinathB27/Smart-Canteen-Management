import React from 'react';
import { useCanteen } from '../context/CanteenContext';
import { Clock, ShieldAlert, RotateCcw, Heart, Utensils } from 'lucide-react';

export const Footer = () => {
  const { resetAllData } = useCanteen();

  const handleResetConfirm = () => {
    if (window.confirm('Reset menu and orders to initial sample demonstration data? Any added custom items or demo orders will be replaced.')) {
      resetAllData();
    }
  };

  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Brand & Mission */}
        <div className="footer-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'white', marginBottom: '0.75rem' }}>
            <div style={{ background: '#f97316', padding: '6px', borderRadius: '8px' }}>
              <Utensils size={18} color="white" />
            </div>
            <strong style={{ fontSize: '1.15rem' }}>CampusBite Canteen</strong>
          </div>
          <p>
            An intelligent college canteen management system engineered to eliminate rush-hour lines,
            speed up meal distribution with digital tokens, and minimize food wastage with predictive demand analytics.
          </p>
        </div>

        {/* Operating Hours */}
        <div className="footer-col">
          <h4>
            <Clock size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
            Kitchen Timings
          </h4>
          <p style={{ marginBottom: '0.4rem' }}><strong>Breakfast:</strong> 8:00 AM – 10:45 AM</p>
          <p style={{ marginBottom: '0.4rem' }}><strong>Lunch Rush:</strong> 12:15 PM – 2:30 PM</p>
          <p style={{ marginBottom: '0.4rem' }}><strong>Evening Snacks:</strong> 4:00 PM – 6:30 PM</p>
          <p style={{ color: '#10b981', fontWeight: 600 }}>Kitchen Status: Open & Accepting Orders</p>
        </div>

        {/* Demonstration Disclaimer */}
        <div className="footer-col">
          <h4>
            <ShieldAlert size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
            Academic Prototype Notice
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '0.8rem' }}>
            This system runs with client-side <code>localStorage</code> persistence for easy presentation.
            All demo orders, tokens, and menu edits are preserved across browser refreshes.
          </p>
          <button
            onClick={handleResetConfirm}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#1e293b',
              color: '#cbd5e1',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.78rem',
              border: '1px solid #334155'
            }}
          >
            <RotateCcw size={14} /> Reset Sample Data
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} CampusBite — Smart Canteen Management System • College Capstone Project
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#cbd5e1' }}>
          Designed with <Heart size={14} color="#f43f5e" fill="#f43f5e" /> for Campus Students & Canteen Staff
        </div>
      </div>
    </footer>
  );
};

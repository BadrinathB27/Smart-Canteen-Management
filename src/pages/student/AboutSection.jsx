import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Smartphone, 
  Layers, 
  BarChart, 
  ShieldCheck, 
  Zap, 
  Users 
} from 'lucide-react';

export const AboutSection = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <span style={{ color: '#f97316', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          College Project Presentation
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '0.4rem 0 0.8rem' }}>
          Smart Canteen Management System
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
          A modern solution to campus break-time chaos, designed to save students' valuable break time 
          while empowering canteen managers with inventory optimization and food waste reduction tools.
        </p>
      </div>

      {/* Problem vs Solution Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* The Problem */}
        <div
          style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#be123c', marginBottom: '1rem' }}>
            <Clock size={24} />
            <h3 style={{ fontSize: '1.25rem', color: '#9f1239' }}>The Traditional Problem</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#881337', fontSize: '0.9rem' }}>
            <li>❌ <strong>20-25 min queue times</strong> during short 30-min break slots.</li>
            <li>❌ Lost or soiled <strong>paper coupons</strong> causing counter disputes.</li>
            <li>❌ Students arrive at counter only to find dishes <strong>out of stock</strong>.</li>
            <li>❌ Unpredictable demand leading to <strong>15-20% leftover cooked food waste</strong>.</li>
            <li>❌ High kitchen stress with order pileups and manual paper billing.</li>
          </ul>
        </div>

        {/* The Solution */}
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#059669', marginBottom: '1rem' }}>
            <Zap size={24} />
            <h3 style={{ fontSize: '1.25rem', color: '#065f46' }}>The CampusBite Solution</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#064e3b', fontSize: '0.9rem' }}>
            <li>✅ <strong>Pre-order during class</strong> and arrive only when food is hot & ready.</li>
            <li>✅ Unique <strong>digital tokens</strong> with 2D verification for 5-second pickup.</li>
            <li>✅ Real-time <strong>menu stock toggle</strong> so students never order unavailable items.</li>
            <li>✅ <strong>Waste & Demand Analytics</strong> to guide kitchen chefs on batch sizes.</li>
            <li>✅ Live <strong>4-stage kitchen order tracker</strong> (Pending, Prep, Ready, Done).</li>
          </ul>
        </div>
      </div>

      {/* 3 Steps Workflow */}
      <div
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        }}
      >
        <h3 style={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '1.75rem' }}>
          How CampusBite Works: Simple 3-Step Flow
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#ffedd5',
                color: '#ea580c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}
            >
              <Smartphone size={26} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>1. Order from Anywhere</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Select items from the dynamic menu, choose dietary preferences, and specify pickup slot.
            </p>
          </div>

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}
            >
              <Layers size={26} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>2. Receive Digital Token</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Instantly receive a verified digital token (e.g. <code>CN-106</code>). Kitchen sees your order on their queue.
            </p>
          </div>

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}
            >
              <CheckCircle2 size={26} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>3. Grab & Go in 30 Seconds</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              When status hits <strong>Ready</strong>, visit Counter 2, flash your digital pass, and enjoy your meal without queueing.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Architecture & Future Roadmap */}
      <div
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        }}
      >
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={20} color="#f97316" />
          Technical Stack & Future Extensibility
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', fontSize: '0.88rem' }}>
          <div>
            <h5 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>Current Frontend Architecture:</h5>
            <p style={{ color: '#475569', lineHeight: 1.5 }}>
              Built with <strong>React 19</strong>, <strong>Vite</strong>, and <strong>Pure CSS</strong>. 
              Utilizes centralized React Context with automatic localStorage synchronization for local persistence.
            </p>
          </div>

          <div>
            <h5 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>Future Production Backend Roadmap:</h5>
            <p style={{ color: '#475569', lineHeight: 1.5 }}>
              Architecture is structured for clean integration with <strong>Node.js / Express / Fastify</strong> REST APIs, 
              <strong>PostgreSQL / MongoDB</strong> databases, <strong>WebSockets</strong> for kitchen displays, and <strong>Razorpay / Stripe UPI</strong> gateways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useMemo } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { 
  BarChart3, 
  Trash2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Flame, 
  Layers,
  Sparkles,
  PieChart
} from 'lucide-react';

export const DemandAnalytics = () => {
  const { menu, orders } = useCanteen();

  // Compute aggregate demand & waste metrics
  const analyticsData = useMemo(() => {
    let totalPrepared = 0;
    let totalSold = 0;

    const itemAudits = menu.map((item) => {
      const prepared = item.dailyPrepared || 50;
      // Combine base dailySold + any live orders placed in this session
      const liveOrderQty = orders.reduce((sum, order) => {
        const found = order.items.find((i) => i.id === item.id);
        return sum + (found ? found.quantity : 0);
      }, 0);

      const sold = (item.dailySold || 0) + liveOrderQty;
      const leftover = Math.max(0, prepared - sold);
      const wastePercentage = prepared > 0 ? ((leftover / prepared) * 100).toFixed(1) : 0;

      totalPrepared += prepared;
      totalSold += sold;

      // Demand estimate recommendation based on sales velocity
      let demandRecommendation = 'Optimal Prep';
      let recommendationColor = '#059669'; // Green

      if (sold >= prepared * 0.95) {
        demandRecommendation = 'High Demand: Increase prep by 15%';
        recommendationColor = '#dc2626'; // Red warning: stockout risk
      } else if (wastePercentage > 15) {
        demandRecommendation = 'Surplus Risk: Reduce prep by 10-15%';
        recommendationColor = '#d97706'; // Amber: waste risk
      }

      return {
        ...item,
        prepared,
        sold,
        leftover,
        wastePercentage: Number(wastePercentage),
        demandRecommendation,
        recommendationColor
      };
    });

    const totalLeftover = Math.max(0, totalPrepared - totalSold);
    const overallWasteRate =
      totalPrepared > 0 ? ((totalLeftover / totalPrepared) * 100).toFixed(1) : '0.0';

    // Top 5 Popular items
    const topPopular = [...itemAudits]
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    return {
      totalPrepared,
      totalSold,
      totalLeftover,
      overallWasteRate: Number(overallWasteRate),
      itemAudits,
      topPopular
    };
  }, [menu, orders]);

  return (
    <div className="analytics-section animate-fade-in">
      {/* Explicit Academic Disclaimer Banner */}
      <div className="disclaimer-banner">
        <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Academic Demonstration Dataset:</strong> The analytics, waste ratios, and demand estimates below are derived from client-side sample menu inventories and simulation orders. In a live production deployment, these calculations connect directly to kitchen weigh-scale IoT endpoints, point-of-sale logs, and weekly student attendance figures.
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="analytics-cards-row">
        {/* Overall Food Waste Rate */}
        <div className="metric-card">
          <span className="metric-label">Calculated Food Waste Rate</span>
          <div className="metric-value" style={{ color: analyticsData.overallWasteRate > 10 ? '#dc2626' : '#059669' }}>
            {analyticsData.overallWasteRate}%
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Formula: <code>(Total Leftovers / Total Prepared) × 100</code>
          </p>
          <div className="waste-progress-bar">
            <div
              className="waste-progress-fill"
              style={{ width: `${Math.min(100, analyticsData.overallWasteRate * 3)}%` }}
            />
          </div>
          <span style={{ fontSize: '0.75rem', color: analyticsData.overallWasteRate <= 8 ? '#059669' : '#b45309', fontWeight: 700 }}>
            {analyticsData.overallWasteRate <= 8 ? '✅ Within Safe Campus Target (<8%)' : '⚠️ Action Needed: Food Surplus Detected'}
          </span>
        </div>

        {/* Total Prepared vs Sold */}
        <div className="metric-card">
          <span className="metric-label">Kitchen Production & Sales</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span className="metric-value" style={{ color: '#0f172a' }}>{analyticsData.totalSold}</span>
            <span style={{ fontSize: '1rem', color: '#64748b' }}>/ {analyticsData.totalPrepared} portions</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.5rem' }}>
            Portions successfully sold vs daily morning preparation quota.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase' }}>Sold:</span>
              <strong style={{ display: 'block', color: '#059669' }}>{analyticsData.totalSold}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase' }}>Leftovers:</span>
              <strong style={{ display: 'block', color: '#dc2626' }}>{analyticsData.totalLeftover}</strong>
            </div>
          </div>
        </div>

        {/* Peak Demand Window */}
        <div className="metric-card">
          <span className="metric-label">Peak Break Rush Window</span>
          <div className="metric-value" style={{ color: '#f97316' }}>12:15 - 1:30 PM</div>
          <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Accounts for <strong>62%</strong> of daily meal turnover during Lunch Break Slots 1 & 2.
          </p>
          <div style={{ background: '#fff7ed', padding: '0.5rem 0.75rem', borderRadius: '8px', marginTop: 'auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#c2410c', fontWeight: 600 }}>
              💡 Chef Recommendation: Pre-stage 35 Biryani & Thali tokens by 12:00 PM.
            </span>
          </div>
        </div>
      </div>

      {/* Top 5 Most Popular Items Leaderboard */}
      <div
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Flame size={20} color="#f97316" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
            Top 5 Student Favorites (Demand Leaderboard)
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {analyticsData.topPopular.map((item, idx) => {
            const maxSold = analyticsData.topPopular[0]?.sold || 100;
            const barWidth = Math.round((item.sold / maxSold) * 100);

            return (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span>
                    <strong>#{idx + 1} {item.name}</strong> ({item.category})
                  </span>
                  <span style={{ fontWeight: 700, color: '#f97316' }}>
                    {item.sold} sold • ₹{item.price * item.sold}
                  </span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${barWidth}%`,
                      background: 'linear-gradient(90deg, #f97316, #fb923c)',
                      borderRadius: '9999px',
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item-by-Item Food Waste & Demand Audit Table */}
      <div className="data-table-container">
        <div style={{ padding: '1.25rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              Item-Level Waste & Demand Audit
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Prepared portions vs actual student consumption with algorithmic kitchen batch suggestions.
            </p>
          </div>
          <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#475569', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontWeight: 600 }}>
            {analyticsData.itemAudits.length} Menu Items Tracked
          </span>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Category</th>
              <th>Prepared</th>
              <th>Sold (Live)</th>
              <th>Leftover</th>
              <th>Waste %</th>
              <th>Demand Forecasting Advice</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.itemAudits.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    {item.isVeg ? '🌱 Veg' : '🍗 Non-Veg'} • ₹{item.price}
                  </div>
                </td>
                <td>{item.category}</td>
                <td><strong>{item.prepared}</strong></td>
                <td><strong style={{ color: '#059669' }}>{item.sold}</strong></td>
                <td>
                  <strong style={{ color: item.leftover > 10 ? '#dc2626' : '#475569' }}>
                    {item.leftover}
                  </strong>
                </td>
                <td>
                  <span
                    style={{
                      fontWeight: 700,
                      color: item.wastePercentage > 12 ? '#dc2626' : '#059669'
                    }}
                  >
                    {item.wastePercentage}%
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: item.recommendationColor,
                      background: `${item.recommendationColor}15`,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      display: 'inline-block'
                    }}
                  >
                    {item.demandRecommendation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

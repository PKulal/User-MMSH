import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Clock, Calendar, PlayCircle, CheckCircle2, TrendingUp, Plus } from 'lucide-react';
import { MOCK_CAMPAIGNS } from '../data/mockCampaigns';

const StatsCard = ({ label, count, icon }) => (
  <div className="stats-card">
    <div className="stats-info">
      <span className="stats-label">{label}</span>
      <span className="stats-count">{count}</span>
    </div>
    <div className="stats-icon-box">
      {icon}
    </div>
  </div>
);

const StatusPill = ({ status }) => {
  let styles = {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #e5e7eb'
  };

  switch (status) {
    case 'Running':
      styles = { backgroundColor: '#fff', color: '#000', border: '1px solid #000' };
      break;
    case 'Booked':
      styles = { backgroundColor: '#ded5d5ff', color: '#fff', border: '1px solid #000' };
      break;
    case 'Submitted':
      styles = { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' };
      break;
    case 'Completed':
      styles = { backgroundColor: '#e5e7eb', color: '#6b7280', border: '1px solid #d1d5db' };
      break;
  }

  return (
    <span className="status-pill" style={{
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      border: styles.border
    }}>
      {status}
    </span>
  );
};

export default function DashboardOverview() {
  const { user } = useAuth();

  // Calculate stats from real mock data
  const getCount = (status) => MOCK_CAMPAIGNS.filter(c => c.status === status).length;

  const STATS = [
    { label: 'Submitted', count: getCount('Submitted'), icon: <FileText size={24} /> },
    { label: 'Booked', count: getCount('Booked'), icon: <Calendar size={24} /> },
    { label: 'Running', count: getCount('Running'), icon: <PlayCircle size={24} /> },
    { label: 'Completed', count: getCount('Completed'), icon: <CheckCircle2 size={24} /> },
  ];

  // Take top 5 recent campaigns
  const RECENT_CAMPAIGNS = MOCK_CAMPAIGNS.slice(0, 5);

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '1400px' }}>
      {/* Header Section */}
      <div className="dashboard-header-row">
        <div>
          <h1>Welcome back!</h1>
          <p className="subtitle">Here's an overview of your campaigns</p>
        </div>
        <Link to="/create-campaign" className="btn btn-primary">
          <Plus size={18} /> Create New Campaign
        </Link>
      </div>

      {/* Stats Row - 4 Columns */}
      <div className="stats-grid-row">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="main-dashboard-content">
        {/* Recent Campaigns Table */}
        <div className="card sections-wrapper">
          <div className="section-header">
            <h3>Recent Campaigns</h3>
            <Link to="/campaigns" className="view-all-link">View all {'>'}</Link>
          </div>

          <table className="recent-table">
            <thead>
              <tr>
                <th>Campaign ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_CAMPAIGNS.map(camp => (
                <tr key={camp.id}>
                  <td className="font-mono">{camp.id}</td>
                  <td className="font-medium">{camp.name}</td>
                  <td><StatusPill status={camp.status} /></td>
                  <td>{camp.startDate}</td>
                  <td>{camp.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .dashboard-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
        }

        .subtitle {
          color: hsl(var(--text-muted));
          margin-top: 0.5rem;
        }

        .stats-grid-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* 4 cols for 4 cards */
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stats-card {
          background: hsl(var(--bg-card));
          border: 1px solid var(--glass-border);
          padding: 1.5rem;
          border-radius: var(--radius-sm); /* Sharper per reference */
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .stats-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stats-label {
          color: hsl(var(--text-muted));
          font-size: 0.9rem;
        }

        .stats-count {
          font-size: 2rem;
          font-weight: 600;
          line-height: 1;
        }

        .stats-icon-box {
          width: 48px;
          height: 48px;
          background: #f3f4f6; /* Light gray background for icons */
          border-radius: 4px; /* Square with slight radius */
          display: flex;
          align-items: center;
          justify-content: center;
          color: #374151;
        }

        .main-dashboard-content {
          display: block; /* Full width */
        }

        .sections-wrapper {
          padding: 1.5rem;
          border-radius: var(--radius-sm);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .view-all-link {
          color: hsl(var(--text-muted));
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        .view-all-link:hover {
          color: hsl(var(--text-main));
        }

        .recent-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .recent-table th {
          padding-bottom: 1rem;
          color: hsl(var(--text-muted));
          font-weight: 600;
          font-size: 0.85rem;
          border-bottom: 1px solid transparent;
        }

        .recent-table td {
          padding: 1.25rem 0;
          color: hsl(var(--text-main));
          font-size: 0.95rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .recent-table tr:last-child td {
          border-bottom: none;
        }

        .status-pill {
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
          min-width: 80px;
          text-align: center;
        }

        .font-mono { font-family: monospace; color: hsl(var(--text-muted)); }
        .font-medium { font-weight: 500; }

        @media (max-width: 1200px) {
           .stats-grid-row {
              grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
           }
        }
      `}</style>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, ChevronDown, CheckCircle2, Clock, BarChart3, AlertCircle, Eye, Copy } from 'lucide-react';
import { MOCK_CAMPAIGNS } from '../data/mockCampaigns';

const StatusBadge = ({ status }) => {
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
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.25rem 0.75rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: 600,
      minWidth: '80px',
      ...styles
    }}>
      {status}
    </span>
  );
};

export default function Campaigns() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const handleDuplicate = (e, campaign) => {
    e.stopPropagation();
    navigate('/create-campaign', { state: { duplicateData: campaign } });
  };

  const filteredCampaigns = useMemo(() => {
    return MOCK_CAMPAIGNS.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.id.toLowerCase().includes(searchTerm.toLowerCase());

      if (statusFilter === 'All Status') return matchesSearch;
      return matchesSearch && campaign.status === statusFilter;
    });
  }, [searchTerm, statusFilter]);

  const handleRowClick = (id) => {
    navigate(`/campaign/${id}`);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '1400px' }}>
      <div className="page-header">
        <div>
          <h1>Campaigns</h1>
          <p className="subtitle">Manage and track all your advertising campaigns</p>
        </div>
        <Link to="/create-campaign" className="btn btn-primary">
          <Plus size={18} /> Create Campaign
        </Link>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} color="hsl(var(--text-muted))" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-dropdown">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Running</option>
            <option>Booked</option>
            <option>Submitted</option>
            <option>Completed</option>
          </select>
          <ChevronDown size={16} className="dropdown-icon" />
        </div>
      </div>

      <div className="table-container card">
        <table className="campaigns-table">
          <thead>
            <tr>
              <th>Campaign ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Screens</th>
              <th>Est. Reach</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map(campaign => (
                <tr key={campaign.id} onClick={() => handleRowClick(campaign.id)}>
                  <td className="font-mono text-muted">{campaign.id}</td>
                  <td className="font-medium">{campaign.name}</td>
                  <td><StatusBadge status={campaign.status} /></td>
                  <td>{campaign.screens} screens</td>
                  <td>{campaign.reach}</td>
                  <td>{campaign.startDate}</td>
                  <td>{campaign.endDate}</td>
                  <td className="text-right">
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        className="btn-icon-sm"
                        title="Duplicate Campaign"
                        onClick={(e) => handleDuplicate(e, campaign)}
                      >
                        <Copy size={16} />
                      </button>
                      <button className="btn-icon-sm" title="View Details">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-8 text-muted">No campaigns found matching your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .subtitle {
          color: hsl(var(--text-muted));
          margin-top: 0.25rem;
        }

        .controls-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .search-box {
          flex: 1; /* Match image: long search bar */
          max-width: 600px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: hsl(var(--bg-card));
          border: 1px solid var(--glass-border);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
        }

        .search-box input {
          background: transparent;
          border: none;
          color: hsl(var(--text-main));
          width: 100%;
          outline: none;
          font-size: 0.95rem;
        }

        .filter-dropdown {
          position: relative;
          width: 200px;
        }

        .filter-dropdown select {
          width: 100%;
          padding: 0.75rem 1rem;
          background: hsl(var(--bg-card));
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          outline: none;
          appearance: none;
          cursor: pointer;
          color: hsl(var(--text-main));
        }

        .dropdown-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: hsl(var(--text-muted));
        }

        .table-container {
           padding: 0; /* Remove default card padding for table */
           overflow: hidden; /* Rounded corners for table */
        }

        .campaigns-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .campaigns-table th {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          color: hsl(var(--text-muted));
          font-weight: 600;
          font-size: 0.85rem;
          background: rgba(0,0,0,0.02);
        }

        .campaigns-table td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          color: hsl(var(--text-main));
          font-size: 0.95rem;
        }

        .campaigns-table tr:hover td {
          background: rgba(0,0,0,0.02);
          cursor: pointer;
        }
        
        .campaigns-table tr:last-child td {
          border-bottom: none;
        }

        .font-mono { font-family: monospace; }
        .text-muted { color: hsl(var(--text-muted)); }
        .font-medium { font-weight: 500; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .py-8 { padding-top: 2rem; padding-bottom: 2rem; }

        .btn-icon-sm {
            background: transparent;
            border: 1px solid var(--glass-border);
            width: 32px;
            height: 32px;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: hsl(var(--text-muted));
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-icon-sm:hover {
            color: hsl(var(--text-main));
            border-color: hsl(var(--text-main));
            background: hsl(var(--bg-card));
        }

        `}</style>
    </div>
  );
}

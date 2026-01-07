import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Megaphone, BarChart3, User, LogOut } from 'lucide-react';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { label: 'Campaigns', path: '/campaigns', icon: <Megaphone size={20} /> },
    { label: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
    { label: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <aside className="left-sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-box">OA</div>
        <span className="brand-text">AdScreen</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}

        <div className="divider"></div>

        <button onClick={handleLogout} className="nav-item logout-btn">
          <LogOut size={20} />
          <span className="nav-label">Logout</span>
        </button>
      </nav>

      <style>{`
        .left-sidebar {
          width: 240px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          border-right: 1px solid var(--glass-border);
          border-left: none;
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          z-index: 100;
          background: hsl(var(--bg-card));
          transition: width 0.3s ease;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          padding-left: 0.5rem;
          overflow: hidden;
          white-space: nowrap;
        }

        .logo-box {
          width: 40px;
          height: 40px;
          min-width: 40px; /* Prevent squashing */
          background: hsl(var(--text-main)); /* Black in light mode */
          color: hsl(var(--bg-card));      /* White in light mode */
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .brand-text {
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.5px;
          transition: opacity 0.2s;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          border-radius: var(--radius-sm);
          color: hsl(var(--text-muted));
          text-decoration: none;
          transition: var(--transition-fast);
          border: 1px solid transparent;
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
        }

        .nav-item:hover {
          background: rgba(0,0,0,0.04);
          color: hsl(var(--text-main));
        }

        .nav-item.active {
          background: hsl(var(--text-main));
          color: hsl(var(--bg-card));
        }

        .divider {
          height: 1px;
          background: var(--glass-border);
          margin: 1rem 0;
        }

        .logout-btn {
          margin-top: auto;
          background: transparent;
          border: none;
          width: 100%;
          cursor: pointer;
          font-family: inherit;
          font-size: 1rem;
          text-align: left;
        }

        .logout-btn:hover {
          color: hsl(var(--status-error));
          background: rgba(0,0,0,0.03);
        }

        .nav-label {
            transition: opacity 0.2s;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
            .left-sidebar {
                width: 80px;
                padding: 2rem 1rem;
            }
            .brand-text, .nav-label {
                display: none;
                opacity: 0;
            }
            .sidebar-header {
                justify-content: center;
                padding-left: 0;
            }
            .nav-item {
                justify-content: center;
                padding: 0.875rem 0.5rem;
            }
        }
      `}</style>
    </aside>
  );
}

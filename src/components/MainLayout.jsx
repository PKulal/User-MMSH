import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content-wrapper">
        <Outlet />
      </main>

      <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
        }

        .main-content-wrapper {
          flex: 1;
          margin-left: 240px; /* Offset for Left sidebar */
          padding: 0;
          /* Subtle subtle pattern for engagement without color */
          background-image: radial-gradient(hsl(var(--text-muted)) 1px, transparent 1px);
          background-size: 40px 40px;
          background-color: hsl(var(--bg-dark));
          transition: margin-left 0.3s ease;
        }

        @media (max-width: 1024px) {
            .main-content-wrapper {
                margin-left: 80px;
            }
        }
      `}</style>
    </div>
  );
}

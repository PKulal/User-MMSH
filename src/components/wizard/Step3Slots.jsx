import React, { useState, useEffect } from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { ArrowLeft, ArrowRight, Clock, Sun, Moon, Zap } from 'lucide-react';

export default function Step3Slots() {
  const { campaignData, updateCampaignData, nextStep, prevStep } = useWizard();
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const selectedScreens = campaignData.selectedScreens || [];

  // Local state for slots selection: { screenId: [hourIndices] }
  const selections = campaignData.screenSlots || {};

  const currentScreen = selectedScreens[currentScreenIndex];

  const toggleHour = (hourIndex) => {
    const screenId = currentScreen.id;
    const currentSlots = selections[screenId] || [];
    let newSlots;

    if (currentSlots.includes(hourIndex)) {
      newSlots = currentSlots.filter(id => id !== hourIndex);
    } else {
      newSlots = [...currentSlots, hourIndex];
    }

    const newSelections = { ...selections, [screenId]: newSlots };
    updateCampaignData({ screenSlots: newSelections });
  };

  const handleNext = () => {
    // Check if all screens have at least one segment
    const allValid = selectedScreens.every(s => (selections[s.id] && selections[s.id].length > 0));

    if (allValid) {
      nextStep();
    } else {
      alert("Please select at least one hourly segment for every screen.");
    }
  };

  if (selectedScreens.length === 0) {
    return (
      <div className="empty-state">
        <p>No screens selected. Please go back.</p>
        <button className="btn btn-secondary" onClick={prevStep}>Back</button>
      </div>
    );
  }

  return (
    <div className="slots-container animate-fade-in">
      <div className="step-header">
        <h2>Scheduling & Segments</h2>
        <p>Review and adjust the hourly segments for each selected screen.</p>
      </div>

      <div className="layout-split">
        {/* Sidebar: Screen List */}
        <div className="screens-sidebar glass-panel">
          <h3>Your Screens ({selectedScreens.length})</h3>
          <div className="screens-list">
            {selectedScreens.map((screen, index) => {
              const segmentsCount = selections[screen.id]?.length || 0;
              const hasSlots = segmentsCount > 0;
              return (
                <div
                  key={screen.id}
                  className={`sidebar-item ${index === currentScreenIndex ? 'active' : ''} ${hasSlots ? 'completed' : ''}`}
                  onClick={() => setCurrentScreenIndex(index)}
                >
                  <div className="status-dot"></div>
                  <div className="item-info">
                    <span className="item-name">{screen.name}</span>
                    <span className="item-details">{hasSlots ? `${segmentsCount} segments selected` : 'None selected'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main: Slot Selector */}
        <div className="slot-selector-area">
          <div className="current-screen-header">
            <h3>{currentScreen.name}</h3>
            <p className="location-sub">{currentScreen.location} • {currentScreen.type}</p>
          </div>

          <div className="selection-card glass-panel">
            <h4>Select Hourly Segments</h4>
            <p className="text-xs text-muted mb-4">Choose the hours you want your ad to run. Each segment allows one 10s ad every 180s.</p>

            <div className="hours-grid">
              {Array.from({ length: 24 }).map((_, i) => {
                const isSelected = (selections[currentScreen.id] || []).includes(i);
                return (
                  <div
                    key={i}
                    className={`hour-box ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleHour(i)}
                  >
                    {i.toString().padStart(2, '0')}:00
                  </div>
                );
              })}
            </div>
          </div>

          <div className="navigation-hints">
            <button
              className="btn btn-secondary btn-sm"
              disabled={currentScreenIndex === 0}
              onClick={() => setCurrentScreenIndex(prev => prev - 1)}
            >
              Previous Screen
            </button>
            <button
              className="btn btn-secondary btn-sm"
              disabled={currentScreenIndex === selectedScreens.length - 1}
              onClick={() => setCurrentScreenIndex(prev => prev + 1)}
            >
              Next Screen
            </button>
          </div>
        </div>
      </div>

      <div className="wizard-footer">
        <button className="btn btn-secondary" onClick={prevStep}>
          <ArrowLeft size={16} /> Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Calculate Pricing <ArrowRight size={16} />
        </button>
      </div>

      <style>{`
        .layout-split {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 2rem;
          min-height: 500px;
        }

        .screens-sidebar {
          padding: 1.25rem;
          height: fit-content;
          border-radius: var(--radius-sm);
        }
        
        .screens-sidebar h3 {
          font-size: 1rem;
          margin-bottom: 1.25rem;
          color: hsl(var(--text-main));
        }

        .screens-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .sidebar-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
          background: rgba(255,255,255,0.03);
          border: 1px solid transparent;
        }

        .sidebar-item:hover {
          background: rgba(255,255,255,0.1);
          border-color: var(--glass-border);
        }
        
        .sidebar-item.active {
          background: rgba(var(--color-primary), 0.1);
          border-color: hsl(var(--color-primary));
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--glass-border);
          margin-top: 6px;
        }

        .sidebar-item.completed .status-dot {
          background: hsl(var(--status-success));
          box-shadow: 0 0 8px rgba(var(--status-success), 0.4);
        }

        .item-name {
          font-weight: 500;
          font-size: 0.95rem;
          display: block;
          margin-bottom: 0.25rem;
        }

        .item-details {
          font-size: 0.8rem;
          color: hsl(var(--text-muted));
        }

        .selection-card {
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .selection-card h4 {
            margin-bottom: 0.5rem;
        }

        .mb-4 { margin-bottom: 1.5rem; }

        .hours-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 0.75rem;
        }

        .hour-box {
            padding: 0.75rem;
            border: 1px solid var(--glass-border);
            border-radius: 6px;
            text-align: center;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s;
            background: rgba(255,255,255,0.02);
        }

        .hour-box:hover {
            background: rgba(255,255,255,0.1);
            border-color: hsl(var(--text-muted));
        }

        .hour-box.selected {
            background: hsl(var(--color-primary));
            color: white;
            border-color: hsl(var(--color-primary));
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(var(--color-primary), 0.3);
        }

        .current-screen-header {
          margin-bottom: 1.5rem;
        }

        .location-sub {
          color: hsl(var(--text-muted));
        }
        
        .navigation-hints {
          display: flex;
          gap: 1rem;
          justify-content: center;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
        }

        .text-xs { font-size: 0.75rem; }
        .text-muted { color: hsl(var(--text-muted)); }

        @media (max-width: 1100px) {
            .layout-split { grid-template-columns: 1fr; }
            .hours-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 600px) {
            .hours-grid { grid-template-columns: repeat(2, 1fr); }
            .selection-card { padding: 1.25rem; }
        }

      `}</style>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard } from '../../contexts/WizardContext';
import { ArrowLeft, CheckCircle2, Loader2, Calendar, Layout, DollarSign } from 'lucide-react';

export default function Step6Review() {
  const { campaignData, prevStep } = useWizard();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Mock Submit
    setTimeout(() => {
      const id = 'CMP-' + Math.floor(Math.random() * 10000);
      alert(`Campaign Submitted Successfully! ID: ${id}`);
      navigate('/');
    }, 1500);
  };

  const pricingDetails = useMemo(() => {
    if (!campaignData.startDate || !campaignData.endDate) return { days: 0, screens: [], grandTotal: 0 };

    const start = new Date(campaignData.startDate);
    const end = new Date(campaignData.endDate);
    const diffTime = Math.abs(end - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let grandTotal = 0;
    const screenBreakdowns = campaignData.selectedScreens.map(screen => {
      const selectedHourIndices = campaignData.screenSlots[screen.id] || [];
      const getHourMultiplier = (hour) => {
        if (hour >= 6 && hour < 12) return 1.0;
        if (hour >= 12 && hour < 18) return 1.2;
        if (hour >= 18 && hour < 22) return 1.5;
        return 0.8;
      };
      let dailyCost = 0;
      selectedHourIndices.forEach(hour => dailyCost += (screen.basePricePerHour * getHourMultiplier(hour)));
      const selectedQuantity = screen.selectedQuantity || 1;
      const totalScreenCost = dailyCost * days * selectedQuantity;
      grandTotal += totalScreenCost;
      return { ...screen, selectedQuantity, slotsCount: selectedHourIndices.length, totalCost: totalScreenCost };
    });

    return { days, screens: screenBreakdowns, grandTotal };
  }, [campaignData]);

  return (
    <div className="review-container animate-fade-in">
      <div className="step-header">
        <h2>Final Review</h2>
        <p>Review your campaign details before submission.</p>
      </div>

      <div className="review-main-content">
        <div className="review-sidebar">
          <div className="card glass-panel section-card">
            <h3>Campaign Summary</h3>
            <div className="summary-stat">
              <label>Campaign Name</label>
              <div className="value">{campaignData.name}</div>
            </div>
            <div className="summary-stat">
              <label>Duration</label>
              <div className="value"><Calendar size={14} /> {pricingDetails.days} Days</div>
              <small className="text-muted">{campaignData.startDate} — {campaignData.endDate}</small>
            </div>
            <div className="summary-stat">
              <label>Total Investment</label>
              <div className="value highlight">{pricingDetails.grandTotal.toLocaleString()} KWD</div>
            </div>
          </div>

          <div className="card glass-panel section-card">
            <h3>Media Previews</h3>
            <div className="media-preview-list">
              {campaignData.selectedScreens.map(screen => {
                const files = campaignData.mediaFiles[screen.id] || [];
                return (
                  <div key={screen.id} className="preview-screen-item">
                    <span className="screen-tiny-name">{screen.name}</span>
                    <div className="thumbnails-flex">
                      {files.length > 0 ? files.map(file => (
                        <div key={file.id} className="review-thumbnail-small">
                          <div className="blank-thumbnail-tiny">PREVIEW</div>
                        </div>
                      )) : <div className="no-media-text">No media uploaded</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="review-details">
          <div className="card glass-panel section-card">
            <h3>Target Screens Breakdown</h3>
            <div className="table-responsive">
              <table className="review-table">
                <thead>
                  <tr>
                    <th>Screen Details</th>
                    <th>Type</th>
                    <th className="text-center">Qty</th>
                    <th className="text-center">Slots</th>
                    <th className="text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingDetails.screens.map(screen => (
                    <tr key={screen.id}>
                      <td>
                        <div className="screen-info-cell">
                          <span className="s-name">{screen.name}</span>
                          <span className="s-res">{screen.resolution}</span>
                        </div>
                      </td>
                      <td>{screen.type}</td>
                      <td className="text-center"><span className="count-badge">{screen.selectedQuantity}</span></td>
                      <td className="text-center"><span className="count-badge">{screen.slotsCount}</span></td>
                      <td className="text-right font-bold">{screen.totalCost.toLocaleString()} KWD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card glass-panel section-card">
            <h3>Campaign Description</h3>
            <p className="description-text">{campaignData.description || 'No description provided.'}</p>
          </div>
        </div>
      </div>

      <div className="wizard-footer">
        <button className="btn btn-secondary" onClick={prevStep} disabled={isSubmitting}>
          <ArrowLeft size={16} /> Back
        </button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="spin" size={18} /> :
            <>Submit Campaign <CheckCircle2 size={18} /></>
          }
        </button>
      </div>

      <style>{`
        .review-main-content {
            display: grid;
            grid-template-columns: 350px 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .review-sidebar {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .review-details {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .summary-stat {
            margin-bottom: 1.5rem;
        }
        .summary-stat label {
            display: block;
            font-size: 0.8rem;
            color: hsl(var(--text-muted));
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.25rem;
        }
        .summary-stat .value {
            font-size: 1.1rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .summary-stat .value.highlight {
            color: hsl(var(--color-primary));
            font-size: 1.5rem;
        }

        .media-preview-list {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
        }
        .preview-screen-item {
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--glass-border);
        }
        .preview-screen-item:last-child { border-bottom: none; }
        .screen-tiny-name {
            font-size: 0.85rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            display: block;
        }

        .thumbnails-flex {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .review-thumbnail-small {
            width: 48px;
            height: 48px;
            background: #000;
            border-radius: 4px;
            border: 1px solid var(--glass-border);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .blank-thumbnail-tiny {
            font-size: 0.4rem;
            color: #444;
            font-weight: 800;
            letter-spacing: 0.05em;
        }
        .no-media-text { font-size: 0.75rem; color: hsl(var(--text-muted)); }

        .review-table {
            width: 100%;
            border-collapse: collapse;
        }
        .review-table th {
            text-align: left;
            padding: 0.75rem;
            font-size: 0.75rem;
            color: hsl(var(--text-muted));
            border-bottom: 1px solid var(--glass-border);
            text-transform: uppercase;
        }
        .review-table td {
            padding: 1.25rem 0.75rem;
            border-bottom: 1px solid var(--glass-border);
            font-size: 0.9rem;
        }
        .screen-info-cell { display: flex; flex-direction: column; gap: 0.25rem; }
        .s-name { font-weight: 600; color: hsl(var(--text-main)); }
        .s-res { font-size: 0.75rem; color: hsl(var(--text-muted)); }

        .count-badge {
            background: hsl(var(--bg-dark));
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 0.8rem;
            border: 1px solid var(--glass-border);
        }

        .description-text {
            font-size: 1rem;
            line-height: 1.6;
            color: hsl(var(--text-main));
        }

        .section-card {
          padding: 1.5rem;
        }

        .section-card h3 {
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--glass-border);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: hsl(var(--text-muted));
        }

        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: 600; }
        .text-muted { color: hsl(var(--text-muted)); }

        @media (max-width: 1100px) {
            .review-main-content { grid-template-columns: 1fr; }
            .review-sidebar { order: 2; }
            .review-details { order: 1; }
        }

        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

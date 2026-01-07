import React, { useMemo } from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { ArrowLeft, ArrowRight, DollarSign, Calendar } from 'lucide-react';

const getHourMultiplier = (hour) => {
  if (hour >= 6 && hour < 12) return 1.0;  // Morning (6AM - 12PM)
  if (hour >= 12 && hour < 18) return 1.2; // Afternoon (12PM - 6PM)
  if (hour >= 18 && hour < 22) return 1.5; // Evening (6PM - 10PM)
  return 0.8;                             // Night (10PM - 6AM)
};

export default function Step4Pricing() {
  const { campaignData, nextStep, prevStep } = useWizard();

  const pricingDetails = useMemo(() => {
    if (!campaignData.startDate || !campaignData.endDate) return { total: 0, screens: [] };

    const start = new Date(campaignData.startDate);
    const end = new Date(campaignData.endDate);
    const diffTime = Math.abs(end - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let grandTotal = 0;

    const screenBreakdowns = campaignData.selectedScreens.map(screen => {
      // screenSlots is now an array of hour indices (0-23)
      const selectedHourIndices = campaignData.screenSlots[screen.id] || [];
      let dailyCost = 0;

      selectedHourIndices.forEach(hour => {
        const multiplier = getHourMultiplier(hour);
        const hourCost = screen.basePricePerHour * multiplier;
        dailyCost += hourCost;
      });

      const totalScreenCost = dailyCost * days;
      grandTotal += totalScreenCost;

      return {
        id: screen.id,
        name: screen.name,
        slotsCount: selectedHourIndices.length,
        dailyCost,
        totalCost: totalScreenCost
      };
    });

    return {
      days,
      screens: screenBreakdowns,
      grandTotal
    };

  }, [campaignData]);

  return (
    <div className="pricing-container animate-fade-in">
      <div className="step-header">
        <h2>Pricing Review</h2>
        <p>Estimated cost based on your duration and slot selection.</p>
      </div>

      <div className="summary-cards">
        <div className="card glass-panel summary-card">
          <span className="label">Campaign Duration</span>
          <div className="value-group">
            <Calendar size={20} />
            <span className="value">{pricingDetails.days} Days</span>
          </div>
          <span className="sub-label">{campaignData.startDate} to {campaignData.endDate}</span>
        </div>

        <div className="card glass-panel summary-card highlight">
          <span className="label">Total Estimated Price</span>
          <div className="value-group">
            <span className="value large">{pricingDetails.grandTotal.toLocaleString()}</span>
            <span className="currency-label">KWD</span>
          </div>
          <span className="sub-label">Tax inclusive</span>
        </div>
      </div>

      <div className="breakdown-section">
        <h3>Breakdown by Screen</h3>
        <div className="breakdown-table-container glass-panel">
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Screen</th>
                <th className="text-center">Slots / Day</th>
                <th className="text-right">Daily Cost</th>
                <th className="text-right">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {pricingDetails.screens.map(screen => (
                <tr key={screen.id}>
                  <td>
                    <span className="screen-name">{screen.name}</span>
                  </td>
                  <td className="text-center">
                    <span className="badge">{screen.slotsCount}</span>
                  </td>
                  <td className="text-right">{screen.dailyCost.toLocaleString()} KWD</td>
                  <td className="text-right font-bold">{screen.totalCost.toLocaleString()} KWD</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="wizard-footer">
        <button className="btn btn-secondary" onClick={prevStep}>
          <ArrowLeft size={16} /> Back
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          Proceed to Media <ArrowRight size={16} />
        </button>
      </div>

      <style>{`
        .summary-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .summary-card {
           display: flex;
           flex-direction: column;
           gap: 0.5rem;
           padding: 1.5rem;
           align-items: center;
           text-align: center;
        }

        .summary-card.highlight {
          background: linear-gradient(135deg, rgba(var(--color-primary), 0.1), rgba(var(--color-secondary), 0.1));
          border-color: rgba(var(--color-primary), 0.3);
        }

        .summary-card .label {
          color: hsl(var(--text-muted));
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .value-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: hsl(var(--text-main));
          margin: 0.5rem 0;
        }

        .value {
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .value.large {
          font-size: 2.25rem;
          font-weight: 700;
          color: hsl(var(--color-primary));
        }

        .sub-label {
          color: hsl(var(--text-dim));
          font-size: 0.85rem;
        }

        .breakdown-section h3 {
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .breakdown-table-container {
          overflow-x: auto;
          border-radius: var(--radius-sm);
        }

        .breakdown-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .breakdown-table th {
          text-align: left;
          padding: 1rem;
          background: rgba(255,255,255,0.03);
          color: hsl(var(--text-muted));
          font-weight: 500;
          font-size: 0.85rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .breakdown-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--glass-border);
        }
        
        .breakdown-table tr:last-child td {
          border-bottom: none;
        }

        .screen-name {
          font-weight: 500;
        }

        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: 600; color: hsl(var(--text-main)); }

        .badge {
          background: hsl(var(--bg-dark));
          padding: 2px 8px;
          border-radius: 12px;
        }

        @media (max-width: 600px) {
            .summary-cards { grid-template-columns: 1fr; }
            .value.large { font-size: 1.75rem; }
        }

      `}</style>
    </div>
  );
}

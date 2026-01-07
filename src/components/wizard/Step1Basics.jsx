import React, { useState } from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { ArrowRight, Info } from 'lucide-react';

export default function Step1Basics() {
    const { campaignData, updateCampaignData, nextStep } = useWizard();
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!campaignData.name.trim()) newErrors.name = 'Campaign Name is required';
        if (!campaignData.startDate) newErrors.startDate = 'Start Date is required';
        if (!campaignData.endDate) newErrors.endDate = 'End Date is required';

        if (campaignData.startDate && campaignData.endDate) {
            if (new Date(campaignData.endDate) < new Date(campaignData.startDate)) {
                newErrors.endDate = 'End Date cannot be before Start Date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            nextStep();
        }
    };

    return (
        <div className="step-container animate-fade-in">
            <div className="step-header">
                <h2>Campaign Basics</h2>
                <p>Start by defining the core details of your campaign.</p>
            </div>

            <div className="form-grid">
                <div className="input-group">
                    <label className="input-label">Campaign Name *</label>
                    <input
                        type="text"
                        className={`input-field ${errors.name ? 'error' : ''}`}
                        placeholder="e.g. Summer Launch 2024"
                        value={campaignData.name}
                        onChange={(e) => updateCampaignData({ name: e.target.value })}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="input-group">
                    <label className="input-label">Description (Optional)</label>
                    <textarea
                        className="input-field"
                        placeholder="Internal notes about this campaign..."
                        rows={3}
                        value={campaignData.description}
                        onChange={(e) => updateCampaignData({ description: e.target.value })}
                    />
                </div>

                <div className="row-2-col">
                    <div className="input-group">
                        <label className="input-label">Start Date *</label>
                        <input
                            type="date"
                            className={`input-field ${errors.startDate ? 'error' : ''}`}
                            min={new Date().toISOString().split('T')[0]}
                            value={campaignData.startDate}
                            onChange={(e) => updateCampaignData({ startDate: e.target.value })}
                        />
                        {errors.startDate && <span className="error-text">{errors.startDate}</span>}
                    </div>

                    <div className="input-group">
                        <label className="input-label">End Date *</label>
                        <input
                            type="date"
                            className={`input-field ${errors.endDate ? 'error' : ''}`}
                            min={campaignData.startDate || new Date().toISOString().split('T')[0]}
                            value={campaignData.endDate}
                            onChange={(e) => updateCampaignData({ endDate: e.target.value })}
                        />
                        {errors.endDate && <span className="error-text">{errors.endDate}</span>}
                    </div>
                </div>
            </div>

            <div className="wizard-footer">
                <div className="auto-save-indicator">
                    <Info size={14} />
                    <span>Draft auto-saved locally</span>
                </div>
                <button className="btn btn-primary" onClick={handleNext}>
                    Next Step <ArrowRight size={16} />
                </button>
            </div>

            <style>{`
        .step-container {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .step-header {
          margin-bottom: 2rem;
        }

        .step-header h2 {
          margin-bottom: 0.5rem;
        }
        
        .step-header p {
          color: hsl(var(--text-muted));
        }

        .row-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .input-field.error {
          border-color: hsl(var(--status-error));
        }

        .error-text {
          color: hsl(var(--status-error));
          font-size: 0.8rem;
          margin-top: 0.25rem;
        }

        .wizard-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .auto-save-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: hsl(var(--text-dim));
          font-size: 0.85rem;
        }
      `}</style>
        </div>
    );
}

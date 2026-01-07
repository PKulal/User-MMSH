import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { WizardProvider, useWizard } from '../contexts/WizardContext';
import Step1Basics from '../components/wizard/Step1Basics';
import Step2Discovery from '../components/wizard/Step2Discovery';
import Step3Slots from '../components/wizard/Step3Slots';
import Step4Pricing from '../components/wizard/Step4Pricing';
import Step5Media from '../components/wizard/Step5Media';
import Step6Review from '../components/wizard/Step6Review';

const STEPS = [
  { id: 1, label: 'Basics' },
  { id: 2, label: 'Screens' },
  { id: 3, label: 'Slots' },
  { id: 4, label: 'Pricing' },
  { id: 5, label: 'Media' },
  { id: 6, label: 'Review' }
];

const WizardContent = () => {
  const { currentStep, goToStep } = useWizard();
  const navigate = useNavigate();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Basics />;
      case 2: return <Step2Discovery />;
      case 3: return <Step3Slots />;
      case 4: return <Step4Pricing />;
      case 5: return <Step5Media />;
      case 6: return <Step6Review />;
      default: return <Step1Basics />;
    }
  };

  return (
    <div className="wizard-layout">
      {/* Wizard Header */}
      <header className="wizard-header glass-panel">
        <div className="container header-inner">
          <Link to="/" className="back-link">
            <div className="btn-icon-circle">
              <ChevronLeft size={20} />
            </div>
            <span>Back to Dashboard</span>
          </Link>

          <div className="progress-steps">
            {STEPS.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <div key={step.id} className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                  <div className="step-circle">
                    {isCompleted ? <Check size={14} /> : step.id}
                  </div>
                  <span className="step-label">{step.label}</span>
                  {step.id !== STEPS.length && <div className="step-line" />}
                </div>
              );
            })}
          </div>

          <div className="header-actions">
            {/* Draft Save could go here */}
          </div>
        </div>
      </header>

      {/* Step Content */}
      <main className={`container wizard-container ${currentStep === 2 ? 'no-scroll-container' : ''}`}>
        <div className={`step-wrapper ${currentStep !== 2 ? 'card glass-panel' : 'full-height-wrapper'}`}>
          {renderStep()}
        </div>
      </main>

      <style>{`
        .wizard-layout {
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden; /* Prevent body scroll */
        }

        .wizard-header {
          flex-shrink: 0;
          padding: 1rem 0;
          border-bottom: 1px solid var(--glass-border);
          background: hsl(var(--bg-card)); /* Ensure solid background */
          z-index: 10;
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: hsl(var(--text-muted));
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition-fast);
        }

        .back-link:hover {
          color: hsl(var(--text-main));
        }

        .btn-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          background: hsl(var(--bg-card));
        }

        .progress-steps {
          display: flex;
          align-items: center;
          gap: 0;
        }

        .step-item {
          display: flex;
          align-items: center;
          position: relative;
        }

        .step-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: hsl(var(--bg-card));
          border: 1px solid var(--glass-border);
          color: hsl(var(--text-muted));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 2;
          transition: var(--transition-fast);
        }

        .step-label {
          margin-left: 0.5rem;
          margin-right: 1.5rem;
          font-size: 0.85rem;
          color: hsl(var(--text-muted));
          font-weight: 500;
        }

        .step-line {
          position: absolute;
          left: 28px;
          right: -10px; /* Bridge gap to next step */
          top: 50%;
          height: 2px;
          background: var(--glass-border);
          z-index: 1;
          width: calc(100% - 28px); 
          display: none; 
        }

        .step-item.active .step-circle {
          background: hsl(var(--color-primary));
          color: white;
          border-color: hsl(var(--color-primary));
          box-shadow: 0 0 0 4px rgba(var(--color-primary), 0.2);
        }
        
        .step-item.active .step-label {
          color: white;
        }

        .step-item.completed .step-circle {
          background: hsl(var(--status-success));
          color: white;
          border-color: hsl(var(--status-success));
        }

        .step-item.completed .step-label {
          color: hsl(var(--text-main));
        }

        .wizard-container {
          flex-grow: 1;
          width: 100%;
          padding-top: 2rem;
          padding-bottom: 3rem;
          /* Default scroll behavior for most steps */
          overflow-y: auto; 
        }

        .wizard-container.no-scroll-container {
            overflow: hidden; /* Let child handle scroll */
            padding-bottom: 0; /* Removing bottom padding so footer can sit flush */
            display: flex;
            flex-direction: column;
        }

        .step-wrapper {
          min-height: 400px;
        }

        .full-height-wrapper {
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        @media (max-width: 900px) {
            .step-label {
                display: none;
            }
            .step-item {
                margin-right: 0.5rem;
            }
            .back-link span {
                display: none;
            }
        }
      `}</style>
    </div>
  );
};

export default function CreateCampaign() {
  const location = useLocation();
  const initialData = location.state?.duplicateData || null;

  return (
    <WizardProvider initialData={initialData}>
      <WizardContent />
    </WizardProvider>
  );
}

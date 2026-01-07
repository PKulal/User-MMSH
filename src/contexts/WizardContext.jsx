import React, { createContext, useContext, useState, useMemo } from 'react';

const WizardContext = createContext(null);

export const useWizard = () => useContext(WizardContext);

export const WizardProvider = ({ children, initialData = null }) => {
    const [currentStep, setCurrentStep] = useState(1);

    const defaultData = {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        selectedScreens: [], // Array of screen objects
        screenSlots: {}, // Map of screenId -> [slotIds]
        mediaFiles: {} // Map of screenId -> [file/metadata]
    };

    const [campaignData, setCampaignData] = useState(() => {
        if (initialData) {
            return {
                ...defaultData,
                ...initialData,
                name: initialData.name ? `${initialData.name} (Copy)` : '',
                id: undefined // Ensure a new ID is generated later
            };
        }
        return defaultData;
    });

    const updateCampaignData = (updates) => {
        setCampaignData(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);
    const goToStep = (step) => setCurrentStep(step);
    const resetWizard = () => {
        setCampaignData(defaultData);
        setCurrentStep(1);
    };

    const value = useMemo(() => ({
        currentStep,
        campaignData,
        updateCampaignData,
        nextStep,
        prevStep,
        goToStep,
        resetWizard
    }), [currentStep, campaignData]);

    return (
        <WizardContext.Provider value={value}>
            {children}
        </WizardContext.Provider>
    );
};

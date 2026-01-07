import React, { useState, useMemo } from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { MOCK_SCREENS } from '../../data/mockScreens';
import { Search, Map, List, Check, Info, ArrowRight, ArrowLeft, Eye, Calendar, Clock, Monitor, Users, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Step2Discovery() {
    const { campaignData, updateCampaignData, nextStep, prevStep } = useWizard();
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDetailScreen, setSelectedDetailScreen] = useState(null); // Screen object or null
    const [activePreviewIndex, setActivePreviewIndex] = useState(0);

    // Filter States
    const [governorateFilter, setGovernorateFilter] = useState('All');
    const [genderFilter, setGenderFilter] = useState('All');
    const [ageFilter, setAgeFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [nationalityFilter, setNationalityFilter] = useState('All');

    const toggleScreenSelection = (screen) => {
        const isSelected = campaignData.selectedScreens.some(s => s.id === screen.id);
        let newSelection;
        if (isSelected) {
            newSelection = campaignData.selectedScreens.filter(s => s.id !== screen.id);
        } else {
            newSelection = [...campaignData.selectedScreens, screen];
        }
        updateCampaignData({ selectedScreens: newSelection });
    };

    const isScreenSelected = (screen) => campaignData.selectedScreens.some(s => s.id === screen.id);

    const filteredScreens = useMemo(() => {
        return MOCK_SCREENS.filter(screen => {
            const basicMatch = screen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                screen.location.toLowerCase().includes(searchTerm.toLowerCase());

            const governorateMatch = governorateFilter === 'All' || screen.governorate === governorateFilter;
            const genderMatch = genderFilter === 'All' || screen.demographics?.mainGender === genderFilter;
            const ageMatch = ageFilter === 'All' || screen.demographics?.mainAgeGroup === ageFilter;
            const typeMatch = typeFilter === 'All' || screen.type === typeFilter;
            const nationalityMatch = nationalityFilter === 'All' || screen.demographics?.mainNationality === nationalityFilter;

            return basicMatch && governorateMatch && genderMatch && ageMatch && typeMatch && nationalityMatch;
        });
    }, [searchTerm, governorateFilter, genderFilter, ageFilter, typeFilter, nationalityFilter]);

    const handleNext = () => {
        if (campaignData.selectedScreens.length > 0) {
            nextStep();
        }
    };

    // If a screen is selected for details, render the details view
    if (selectedDetailScreen) {
        return (
            <div className="details-view-container animate-fade-in">
                <div className="details-scroll-wrapper">
                    <div className="details-content-inner">
                        {/* Header Back Link */}
                        <div
                            className="back-btn-row"
                            onClick={() => {
                                setSelectedDetailScreen(null);
                                setActivePreviewIndex(0);
                            }}
                        >
                            <ArrowLeft size={16} /> <span>Back to Discover</span>
                        </div>

                        {/* Title & Tags */}
                        <div className="details-header">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedDetailScreen.name}</h2>
                                <p className="text-muted">{selectedDetailScreen.location}, {selectedDetailScreen.country}</p>
                            </div>
                            <div className="tags-row">
                                {selectedDetailScreen.tags?.map(tag => (
                                    <span key={tag} className={`tag-badge ${tag === 'Indoor' ? 'tag-dark' : 'tag-outline'}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="details-grid-layout">
                            {/* Left Column: Preview & Specs */}
                            <div className="details-left-col">
                                <div className="carousel-container">
                                    <div className="carousel-slide">
                                        {(selectedDetailScreen.previews && selectedDetailScreen.previews.length > 0) ? (
                                            <>
                                                {/* Blank Preview Screen Logic */}
                                                <div className="blank-preview-screen">
                                                    <Monitor size={48} className="mb-2" />
                                                    <span className="text-xl font-bold">Image Preview {activePreviewIndex + 1}</span>
                                                    <span className="text-sm opacity-50">Dimensions: {selectedDetailScreen.resolution}</span>
                                                </div>

                                                {selectedDetailScreen.previews.length > 1 && (
                                                    <div className="carousel-controls">
                                                        <button
                                                            className="carousel-btn prev"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActivePreviewIndex(prev => (prev - 1 + selectedDetailScreen.previews.length) % selectedDetailScreen.previews.length);
                                                            }}
                                                        >
                                                            <ChevronLeft size={20} />
                                                        </button>
                                                        <button
                                                            className="carousel-btn next"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActivePreviewIndex(prev => (prev + 1) % selectedDetailScreen.previews.length);
                                                            }}
                                                        >
                                                            <ChevronRight size={20} />
                                                        </button>
                                                        <div className="carousel-dots">
                                                            {selectedDetailScreen.previews.map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`carousel-dot ${i === activePreviewIndex ? 'active' : ''}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="carousel-overlay">
                                                <Monitor size={48} className="mb-2" />
                                                <span>No Preview Available</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Screen Specifications */}
                                <div className="card specs-card">
                                    <h3 className="card-title">Screen Specifications</h3>
                                    <div className="specs-grid">
                                        <div className="spec-row">
                                            <div className="spec-pair">
                                                <Monitor size={16} className="spec-icon" />
                                                <span className="spec-label">Physical Size:</span>
                                                <span className="spec-val">{selectedDetailScreen.specs?.physicalSize || selectedDetailScreen.size}</span>
                                            </div>
                                            <div className="spec-pair">
                                                <Monitor size={16} className="spec-icon" />
                                                <span className="spec-label">Resolution:</span>
                                                <span className="spec-val">{selectedDetailScreen.specs?.resolutionText || selectedDetailScreen.resolution}</span>
                                            </div>
                                        </div>
                                        <div className="spec-row">
                                            <div className="spec-pair">
                                                <Clock size={16} className="spec-icon" />
                                                <span className="spec-label">Operating Hours:</span>
                                                <span className="spec-val">{selectedDetailScreen.specs?.operatingHours || '10:00 AM - 10:00 PM'}</span>
                                            </div>
                                            <div className="spec-pair">
                                                <Calendar size={16} className="spec-icon" />
                                                <span className="spec-label">Ad Frequency (Slot):</span>
                                                <span className="spec-val">180 seconds (10s ad per slot)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Demographics Integration */}
                                <div className="card demographics-rich-card">
                                    <h3 className="card-title">Audience Profile</h3>

                                    <div className="demo-table-container">
                                        {/* Nationality */}
                                        <div className="demo-table-section">
                                            <div className="table-header-main">Profile by Nationality</div>
                                            <div className="table-row labels cols-3">
                                                <span>Kuwaiti</span>
                                                <span>Arab</span>
                                                <span>Non-Arab</span>
                                            </div>
                                            <div className="table-row values cols-3">
                                                <span>{selectedDetailScreen.demographics?.nationality?.kuwaiti || 0}%</span>
                                                <span>{selectedDetailScreen.demographics?.nationality?.arab || 0}%</span>
                                                <span>{selectedDetailScreen.demographics?.nationality?.nonArab || 0}%</span>
                                            </div>
                                        </div>

                                        {/* Gender */}
                                        <div className="demo-table-section">
                                            <div className="table-header-main">Profile by Gender</div>
                                            <div className="table-row labels cols-2">
                                                <span>Male</span>
                                                <span>Female</span>
                                            </div>
                                            <div className="table-row values cols-2">
                                                <span>{selectedDetailScreen.demographics?.gender?.male || 0}%</span>
                                                <span>{selectedDetailScreen.demographics?.gender?.female || 0}%</span>
                                            </div>
                                        </div>

                                        {/* Age Group */}
                                        <div className="demo-table-section full-width">
                                            <div className="table-header-main">Profile by Age Group</div>
                                            <div className="table-row labels cols-4">
                                                <div><span>Boomers</span><small>61 - 80</small></div>
                                                <div><span>Gen X</span><small>45 - 60</small></div>
                                                <div><span>Millennials</span><small>29 - 44</small></div>
                                                <div><span>Gen Z</span><small>Less Than 28</small></div>
                                            </div>
                                            <div className="table-row values cols-4">
                                                <span>{selectedDetailScreen.demographics?.age?.boomers || 0}%</span>
                                                <span>{selectedDetailScreen.demographics?.age?.genX || 0}%</span>
                                                <span>{selectedDetailScreen.demographics?.age?.millennials || 0}%</span>
                                                <span>{selectedDetailScreen.demographics?.age?.genZ || 0}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Metrics & Info */}
                            <div className="details-right-col">
                                <div className="card metrics-card">
                                    <h3 className="card-title">Reach Metrics</h3>
                                    <div className="primary-metric">
                                        <span className="metric-huge">{selectedDetailScreen.metrics?.daily || '0'}</span>
                                        <span className="metric-label">Daily Impressions</span>
                                    </div>
                                    <div className="secondary-metrics">
                                        <div>
                                            <span className="metric-sub-label">Weekly</span>
                                            <p className="metric-sub-val">{selectedDetailScreen.metrics?.weekly || '0'}</p>
                                        </div>
                                        <div>
                                            <span className="metric-sub-label">Monthly</span>
                                            <p className="metric-sub-val">{selectedDetailScreen.metrics?.monthly || '0'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="playback-info-box">
                                    <h3 className="card-title">Playback Information</h3>
                                    <div className="info-row">
                                        <span>Slot Duration</span>
                                        <span>{selectedDetailScreen.specs?.slotDuration || '10s'}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Loop Length</span>
                                        <span>{selectedDetailScreen.specs?.loopLength || '60s'}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Category</span>
                                        <span>{selectedDetailScreen.specs?.category || 'General'}</span>
                                    </div>
                                </div>

                                {/* Select Button in Details View */}
                                <div className="details-action-area">
                                    <div className="price-display">
                                        <span className="text-muted text-sm">Base Price</span>
                                        <div className="price-val">{selectedDetailScreen.basePricePerHour} KWD<span className="text-sm font-normal">/hour</span></div>
                                    </div>
                                    <button
                                        className={`btn ${isScreenSelected(selectedDetailScreen) ? 'btn-secondary' : 'btn-primary'} w-full`}
                                        onClick={() => toggleScreenSelection(selectedDetailScreen)}
                                    >
                                        {isScreenSelected(selectedDetailScreen) ? 'Remove Selection' : 'Select Screen'}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <style>{`
                    .details-view-container {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                        margin: -2rem -2rem -2rem -2rem;
                    }
                    .details-scroll-wrapper {
                        flex: 1;
                        overflow-y: auto;
                        padding: 2rem;
                    }
                    .details-content-inner {
                        max-width: 1200px;
                        margin: 0 auto;
                        width: 100%;
                    }
                    .back-btn-row {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        color: hsl(var(--text-muted));
                        cursor: pointer;
                        margin-bottom: 1.5rem;
                        font-weight: 500;
                    }
                    .back-btn-row:hover { color: hsl(var(--text-main)); }

                    .details-header { margin-bottom: 2rem; }
                    .text-2xl { font-size: 1.75rem; line-height: 1.2; }
                    .text-muted { color: hsl(var(--text-muted)); }
                    .mb-2 { margin-bottom: 0.5rem; }

                    .tags-row { display: flex; gap: 0.5rem; margin-top: 0.75rem; }
                    .tag-badge { 
                        padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; 
                    }
                    .tag-dark { background: #374151; color: white; }
                    .tag-outline { border: 1px solid #d1d5db; color: #374151; }

                    .details-grid-layout {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        gap: 2rem;
                    }

                    .carousel-container {
                        position: relative;
                        background: #000;
                        border-radius: var(--radius-md);
                        height: 400px;
                        overflow: hidden;
                        margin-bottom: 2rem;
                        border: 1px solid var(--glass-border);
                    }
                    .carousel-track {
                        width: 100%;
                        height: 100%;
                    }
                    .carousel-slide {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        background: #000;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                    .blank-preview-screen {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: #4b5563;
                        gap: 0.5rem;
                        width: 100%;
                        height: 100%;
                    }
                    .carousel-controls {
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        pointer-events: none;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 1rem;
                    }
                    .carousel-btn {
                        pointer-events: auto;
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        background: rgba(0,0,0,0.5);
                        color: white;
                        border: 1px solid rgba(255,255,255,0.1);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .carousel-btn:hover { background: rgba(0,0,0,0.8); }
                    .carousel-dots {
                        position: absolute;
                        bottom: 1.5rem;
                        left: 50%;
                        transform: translateX(-50%);
                        display: flex;
                        gap: 0.5rem;
                    }
                    .carousel-dot {
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        background: rgba(255,255,255,0.2);
                    }
                    .carousel-dot.active {
                        background: white;
                        width: 16px;
                        border-radius: 4px;
                    }
                    .carousel-overlay {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.5rem;
                        color: white;
                        font-size: 1.2rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        pointer-events: none;
                        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                    }
                    .carousel-control, .carousel-indicators, .indicator { display: none; }
                    .indicator.active { background: white; width: 20px; border-radius: 4px; }

                    .demo-table-container {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                    }
                    .demo-table-section {
                        background: #fdfdfd;
                        border: 1px solid #eee;
                        border-radius: 4px;
                        overflow: hidden;
                    }
                    .table-header-main {
                        background: #2c3e50;
                        color: white;
                        padding: 0.75rem;
                        font-size: 0.85rem;
                        font-weight: 600;
                        text-align: center;
                    }
                    .table-row {
                        display: grid;
                        border-bottom: 1px solid #eee;
                    }
                    .table-row.cols-2 { grid-template-columns: repeat(2, 1fr); }
                    .table-row.cols-3 { grid-template-columns: repeat(3, 1fr); }
                    .table-row.cols-4 { grid-template-columns: repeat(4, 1fr); }

                    .table-row.labels {
                        background: #f8f9fa;
                        font-weight: 600;
                        font-size: 0.75rem;
                        text-align: center;
                    }
                    .table-row.labels span, .table-row.labels div { 
                        padding: 0.75rem 0.5rem; 
                        border-right: 1px solid #eee; 
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    .table-row.labels div span { padding: 0; border: none; }
                    .table-row.values {
                        font-size: 0.95rem;
                        text-align: center;
                    }
                    .table-row.values span { padding: 1rem 0.5rem; border-right: 1px solid #eee; }
                    .table-row span:last-child, .table-row div:last-child { border-right: none; }

                    .age-labels-small { font-size: 0.65rem; color: #666; font-weight: normal; }

                    .table-row.labels small { font-size: 0.65rem; color: #666; font-weight: normal; margin-top: 2px; }

                    .screen-preview-box {
                        background: #f9fafb;
                        border: 1px dashed #d1d5db;
                        border-radius: var(--radius-md);
                        height: 300px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: hsl(var(--text-dim));
                        margin-bottom: 2rem;
                    }

                    .card {
                        background: white;
                        border: 1px solid #e5e7eb;
                        border-radius: var(--radius-sm);
                        padding: 1.5rem;
                        margin-bottom: 1.5rem;
                    }
                    .card-title { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; }

                    .specs-grid { display: flex; flex-direction: column; gap: 1rem; }
                    .spec-row { display: flex; justify-content: space-between; gap: 2rem; }
                    .spec-pair { display: flex; align-items: center; gap: 0.5rem; flex: 1; }
                    .spec-icon { color: hsl(var(--text-muted)); }
                    .spec-label { font-size: 0.85rem; color: #6b7280; }
                    .spec-val { font-size: 0.9rem; font-weight: 500; }

                    .demo-section { margin-bottom: 1rem; }
                    .demo-label { display: block; font-size: 0.85rem; color: #6b7280; margin-bottom: 0.5rem; }
                    .demo-pills { display: flex; gap: 0.5rem; }
                    .demo-pill { padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; background: #f3f4f6; color: #374151; font-weight: 500; }
                    .demo-pill.dark { background: #4b5563; color: white; }
                    .demo-text { font-size: 0.9rem; color: #374151; }

                    .metrics-card { border: 2px solid #8b5cf6; /* Accent border per image */ padding: 1.5rem; }
                    .metric-huge { font-size: 2.5rem; font-weight: 700; display: block; line-height: 1; }
                    .metric-label { font-size: 0.85rem; color: #6b7280; }
                    .secondary-metrics { display: flex; justify-content: space-between; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; }
                    .metric-sub-label { font-size: 0.75rem; color: #6b7280; display: block; }
                    .metric-sub-val { font-size: 1rem; font-weight: 600; }

                    .playback-info-box { margin-bottom: 2rem; }
                    .info-row { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #f3f4f6; font-size: 0.9rem; }
                    .info-row span:last-child { font-weight: 500; }

                    .details-action-area {
                        background: #f9fafb;
                        padding: 1.5rem;
                        border-radius: var(--radius-sm);
                        border: 1px solid #e5e7eb;
                    }

                    .hours-grid {
                        display: grid;
                        grid-template-columns: repeat(6, 1fr);
                        gap: 0.5rem;
                    }
                    .hour-box {
                        padding: 0.5rem;
                        border: 1px solid #e5e7eb;
                        border-radius: 4px;
                        text-align: center;
                        font-size: 0.75rem;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .hour-box:hover { background: #f3f4f6; }
                    .hour-box.selected {
                        background: hsl(var(--text-main));
                        color: white;
                        border-color: hsl(var(--text-main));
                    }
                    .text-xs { font-size: 0.75rem; }
                    .price-display { margin-bottom: 1rem; }
                    .price-val { font-size: 1.5rem; font-weight: 700; }
                    .w-full { width: 100%; }

                    @media (max-width: 900px) {
                        .details-grid-layout { grid-template-columns: 1fr; }
                    }
                `}</style>
            </div>
        );
    }

    // Default LIST VIEW
    return (
        <div className="discovery-container animate-fade-in">
            <div className="header-section glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
                <div className="discovery-header">
                    <div>
                        <h2>Select Screens</h2>
                        <p>Choose the locations for your ad campaign.</p>
                    </div>
                    <div className="view-toggles">
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={18} /> List
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
                            onClick={() => setViewMode('map')}
                        >
                            <Map size={18} /> Map
                        </button>
                    </div>
                </div>

                <div className="filters-bar">
                    <div className="search-box">
                        <Search size={18} color="hsl(var(--text-muted))" />
                        <input
                            type="text"
                            placeholder="Search screens..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select className="filter-select" value={governorateFilter} onChange={(e) => setGovernorateFilter(e.target.value)}>
                        <option value="All">Governorate</option>
                        <option value="Capital">Capital</option>
                        <option value="Hawally">Hawally</option>
                        <option value="M.Kabeer">M.Kabeer</option>
                        <option value="Ahmadi">Ahmadi</option>
                        <option value="Jahara">Jahara</option>
                        <option value="Farwania">Farwania</option>
                    </select>

                    <select className="filter-select" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                        <option value="All">Gender</option>
                        <option value="Male">Male 0%-30%</option>
                        <option value="Male">Male 30%-60%</option>
                        <option value="Male">Male 60%-100%</option>
                        <option value="Female">Female 0%-30%</option>
                        <option value="Female">Female 30%-60%</option>
                        <option value="Female">Female 60%-100%</option>
                    </select>

                    <select className="filter-select" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
                        <option value="All">Age</option>
                        <option value="Boomers (61-80)">Boomers (61-80):0%-30%</option>
                        <option value="Boomers (61-80)">Boomers (61-80):30%-60%</option>
                        <option value="Boomers (61-80)">Boomers (61-80):60%-100%</option>
                        <option value="GenX (45-60)">GenX (45-60):0%-30%</option>
                        <option value="GenX (45-60)">GenX (45-60):30%-60%</option>
                        <option value="GenX (45-60)">GenX (45-60):60%-100%</option>
                        <option value="Millennials (29 - 44)">Millennials (29 - 44):0%-30%</option>
                        <option value="Millennials (29 - 44)">Millennials (29 - 44):30%-60%</option>
                        <option value="Millennials (29 - 44)">Millennials (29 - 44):60%-100%</option>
                        <option value="Gen Z (Less Than 28)">Gen Z (Less Than 28):0%-30%</option>
                        <option value="Gen Z (Less Than 28)">Gen Z (Less Than 28):30%-60%</option>
                        <option value="Gen Z (Less Than 28)">Gen Z (Less Than 28):60%-100%</option>
                    </select>

                    <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="All">Screen Types</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Indoor">Indoor</option>
                    </select>

                    <select className="filter-select" value={nationalityFilter} onChange={(e) => setNationalityFilter(e.target.value)}>
                        <option value="All">Nationality</option>
                        <option value="Kuwaiti">Kuwaiti 0%-30%</option>
                        <option value="Kuwaiti">Kuwaiti 30%-60%</option>
                        <option value="Kuwaiti">Kuwaiti 60%-100%</option>
                        <option value="Arab">Arab 0%-30%</option>
                        <option value="Arab">Arab 30%-60%</option>
                        <option value="Arab">Arab 60%-100%</option>
                        <option value="Non Arab">Non Arab 0%-30%</option>
                        <option value="Non Arab">Non Arab 30%-60%</option>
                        <option value="Non Arab">Non Arab 60%-100%</option>
                    </select>
                </div>
            </div>

            <div className="scrollable-content-area">
                {viewMode === 'list' ? (
                    <div className="screens-grid">
                        {filteredScreens.map(screen => {
                            const isSelected = isScreenSelected(screen);
                            return (
                                <div
                                    key={screen.id}
                                    className={`card screen-card ${isSelected ? 'selected' : ''}`}
                                >
                                    <div className="screen-header">
                                        <span className="badge-type">{screen.type}</span>
                                        {isSelected && <div className="check-circle"><Check size={14} /></div>}
                                    </div>
                                    <h3 className="text-lg font-bold mb-1">{screen.name}</h3>
                                    <p className="location-text">{screen.location}, {screen.country}</p>

                                    <div className="screen-specs">
                                        <div className="spec-item">
                                            <span className="label">Size</span>
                                            <span className="value">{screen.size}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="label">Resolution</span>
                                            <span className="value">{screen.resolution}</span>
                                        </div>
                                        <div className="spec-item" style={{ gridColumn: 'span 2', marginTop: '4px' }}>
                                            <span className="label">Active Hourly Segments</span>
                                            <span className="value" style={{ color: isSelected ? 'hsl(var(--color-primary))' : 'inherit' }}>
                                                {(campaignData.screenSlots[screen.id] || []).length} / 24 hours
                                            </span>
                                        </div>
                                    </div>

                                    <div className="screen-footer">
                                        <button
                                            className="btn-text-only"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedDetailScreen(screen);
                                            }}
                                        >
                                            <Eye size={14} /> View Details
                                        </button>
                                        <div className="price-row">
                                            <div className="price-hint">
                                                {screen.basePricePerHour} KWD<span style={{ fontSize: '0.7em', fontWeight: 400 }}>/hr</span>
                                            </div>
                                            <button
                                                className={`btn-sm ${isSelected ? 'btn-secondary' : 'btn-primary'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleScreenSelection(screen);
                                                }}
                                            >
                                                {isSelected ? 'Remove' : 'Select'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="map-placeholder glass-panel">
                        <Map size={48} color="hsl(var(--text-muted))" />
                        <p>Map View is simulated for Phase 1</p>
                        <div className="simulated-pins">
                            {filteredScreens.map(screen => (
                                <div key={screen.id} className="pin-item" onClick={() => setSelectedDetailScreen(screen)}>
                                    <span>{screen.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="wizard-footer glass-panel">
                <button className="btn btn-secondary" onClick={prevStep}>
                    <ArrowLeft size={16} /> Back
                </button>
                <div className="selection-summary">
                    {campaignData.selectedScreens.length} screens, {Object.values(campaignData.screenSlots).flat().length} segments selected
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={campaignData.selectedScreens.length === 0}
                >
                    Next Step <ArrowRight size={16} />
                </button>
            </div>

            <style>{`
        .discovery-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden; /* Flex container clips overflow */
        }

        .header-section {
            flex-shrink: 0;
            background: hsl(var(--bg-card));
            /* compensate for step-wrapper padding if any, forcing full width */
            margin: -2rem -2rem 0 -2rem; 
            padding: 2rem 2rem 0.5rem 2rem;
            border-bottom: 1px solid var(--glass-border);
            z-index: 10;
        }

        .scrollable-content-area {
            flex: 1;
            overflow-y: auto;
            padding: 1.5rem 0;
            min-height: 0; /* Crucial for nested flex scrolling */
        }

        .discovery-header {
           display: flex;
           justify-content: space-between;
           align-items: flex-end;
           margin-bottom: 1rem;
        }

        .view-toggles {
          display: flex;
          background: hsl(var(--bg-card));
          padding: 4px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--glass-border);
        }

        .filters-bar {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          padding-bottom: 1rem;
        }

        .search-box {
          flex: 2; 
          min-width: 200px;
          position: relative;
          display: flex;
          align-items: center;
          background: hsl(var(--bg-dark));
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0 0.75rem;
        }

        .search-box input {
            border: none;
            background: transparent;
            width: 100%;
            padding: 0.75rem 0.5rem;
            outline: none;
            color: hsl(var(--text-main));
        }
        
        .filter-select {
          background: hsl(var(--bg-dark));
          border: 1px solid var(--glass-border);
          color: hsl(var(--text-main));
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          outline: none;
          min-width: 140px;
          flex: 1;
        }

        .screens-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          padding-bottom: 1rem;
        }

        /* ... existing card styles ... */
        .screen-card {
           border: 1px solid var(--glass-border);
           position: relative;
           display: flex;
           flex-direction: column;
           background: hsl(var(--bg-card));
        }
        .screen-card:hover { transform: translateY(-4px); border-color: rgba(var(--color-primary), 0.5); }
        .screen-card.selected { border-color: hsl(var(--color-primary)); background: rgba(var(--color-primary), 0.05); box-shadow: 0 0 0 1px hsl(var(--color-primary)); }

        .screen-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
        .badge-type { font-size: 0.7rem; background: rgba(0,0,0,0.05); padding: 2px 8px; border-radius: 12px; color: hsl(var(--text-muted)); }
        .check-circle { width: 20px; height: 20px; background: hsl(var(--color-primary)); border-radius: 50%; display: flex; alignItems: center; justifyContent: center; color: white; }
        
        .font-bold { font-weight: 700; }
        .text-lg { font-size: 1.125rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .location-text { color: hsl(var(--text-muted)); font-size: 0.9rem; margin-bottom: 1rem; }

        .screen-specs {
           display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem; padding: 0.75rem 0;
           border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);
        }
        .spec-item { display: flex; flex-direction: column; }
        .spec-item .label { font-size: 0.7rem; color: hsl(var(--text-dim)); }
        .spec-item .value { font-size: 0.85rem; }

        .screen-footer { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; margin-top: auto; }
        .view-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: none; background: transparent; color: hsl(var(--text-muted)); border-radius: 4px; font-size: 0.9rem; transition: var(--transition-fast); }
        .view-btn.active { background: hsl(var(--bg-dark)); color: hsl(var(--text-main)); box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
        
        .price-row { display: flex; align-items: center; gap: 1rem; }
        .btn-text-only { background: none; border: none; color: hsl(var(--text-muted)); font-size: 0.85rem; display: flex; gap: 0.25rem; align-items: center; cursor: pointer; padding: 0; }
        .btn-text-only:hover { color: hsl(var(--text-main)); }
        
        .btn-sm { padding: 0.25rem 0.75rem; font-size: 0.8rem; border-radius: 4px; cursor: pointer; border: 1px solid transparent; }
        .btn-sm.btn-primary { background: hsl(var(--text-main)); color: white; }
        .btn-sm.btn-secondary { background: white; color: hsl(var(--text-main)); border: 1px solid hsl(var(--border)); }
        .price-hint { font-weight: 600; color: hsl(var(--text-main)); }

        .wizard-footer {
            flex-shrink: 0;
            margin: 0 -2rem -2rem -2rem; /* Extend to edges */
            padding: 1.5rem 2rem;
            background: hsl(var(--bg-card));
            border-top: 1px solid var(--glass-border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 10;
        }

        .selection-summary { color: hsl(var(--text-muted)); font-weight: 500; }

        @media (max-width: 1024px) {
            /* .wizard-footer { left: 80px; } */ /* No longer fixed, so this media query is not needed for footer */
        }
      `}</style>
        </div>
    );
}

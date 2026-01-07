import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Layout, Clock, BarChart3, Monitor, CheckCircle2 } from 'lucide-react';
import { MOCK_CAMPAIGNS } from '../data/mockCampaigns';

// Shared Status Badge (Could be extracted)
const StatusBadge = ({ status }) => {
    let styles = {
        bg: '#f3f4f6',
        color: '#374151',
        border: '1px solid #e5e7eb'
    };

    switch (status) {
        case 'Running':
            styles = { bg: '#fff', color: '#000', border: '1px solid #000' };
            break;
        case 'Booked':
            styles = { bg: '#ded5d5ff', color: '#fff', border: '1px solid #000' };
            break;
        case 'Submitted':
            styles = { bg: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' };
            break;
        case 'Completed':
            styles = { bg: '#e5e7eb', color: '#6b7280', border: '1px solid #d1d5db' };
            break;
    }

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            ...styles
        }}>
            {status}
        </span>
    );
};

export default function CampaignDetails() {
    const { id } = useParams();

    const campaign = useMemo(() => {
        return MOCK_CAMPAIGNS.find(c => c.id === id);
    }, [id]);

    if (!campaign) {
        return (
            <div className="container pt-8">
                <div className="card glass-panel p-8 text-center">
                    <h2>Campaign Not Found ({id})</h2>
                    <Link to="/campaigns" className="btn btn-primary mt-4">Back to Campaigns</Link>
                </div>
            </div>
        );
    }

    const { timeline, status } = campaign;

    return (
        <div className="container" style={{ paddingTop: '2rem', maxWidth: '1400px', paddingBottom: '3rem' }}>
            <Link to="/campaigns" className="back-link">
                <ChevronLeft size={16} /> Back to Campaigns
            </Link>

            <div className="header-section">
                <div className="header-top">
                    <StatusBadge status={campaign.status} />
                    <span className="text-muted text-sm font-mono">{campaign.id}</span>
                </div>
                <h1 className="campaign-title">{campaign.name}</h1>
                <p className="text-muted">{campaign.description}</p>
            </div>

            <div className="details-grid">
                {/* LEFT COLUMN */}
                <div className="left-col">
                    {/* Overview Card */}
                    <div className="card glass-panel mb-6">
                        <h3 className="section-title">Campaign Overview</h3>
                        <div className="overview-grid">
                            <div className="overview-item">
                                <div className="icon-box"><Calendar size={20} /></div>
                                <div>
                                    <span className="label">Duration</span>
                                    <div className="value">{campaign.startDate} - {campaign.endDate}</div>
                                </div>
                            </div>
                            <div className="overview-item">
                                <div className="icon-box"><Layout size={20} /></div>
                                <div>
                                    <span className="label">Screens</span>
                                    <div className="value">{campaign.screens} locations</div>
                                </div>
                            </div>
                            <div className="overview-item">
                                <div className="icon-box"><BarChart3 size={20} /></div>
                                <div>
                                    <span className="label">Est. Reach</span>
                                    <div className="value">{campaign.reach}/day</div>
                                </div>
                            </div>
                            <div className="overview-item">
                                <div className="icon-box"><Clock size={20} /></div>
                                <div>
                                    <span className="label">Time Slots</span>
                                    <div className="value">{campaign.slotsPerDay || 4} slots/day</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selected Screens */}
                    <div className="card glass-panel mb-6">
                        <h3 className="section-title">Selected Screens</h3>
                        <div className="screens-list">
                            {campaign.locations && campaign.locations.length > 0 ? (
                                campaign.locations.map((loc, idx) => (
                                    <div key={idx} className="screen-item-row">
                                        <div className="screen-icon-box"><Monitor size={20} /></div>
                                        <div className="screen-details-flex">
                                            <div className="screen-main">
                                                <div className="screen-name">{loc.name}</div>
                                                <div className="screen-loc text-muted text-sm">{loc.location}</div>
                                            </div>
                                            <div className="screen-size text-muted text-sm">{loc.size}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No specific screens listed in mock data.</p>
                            )}
                        </div>
                    </div>

                    {/* Price Estimate */}
                    <div className="card glass-panel">
                        <div className="price-header">
                            <h3 className="section-title mb-0">Price Estimate</h3>
                            {status === 'Submitted' && <span className="badge-outline">Pending Review</span>}
                        </div>

                        <div className="price-rows">
                            <div className="price-row">
                                <span>Screen fees</span>
                                <span>{(campaign.price * 0.8).toLocaleString()} KWD</span>
                            </div>
                            <div className="price-row">
                                <span>Peak hours surcharge</span>
                                <span>{(campaign.price * 0.15).toLocaleString()} KWD</span>
                            </div>
                            <div className="price-row">
                                <span>Production fee</span>
                                <span>{(campaign.price * 0.05).toLocaleString()} KWD</span>
                            </div>
                            <div className="price-row total">
                                <span>Total Estimate</span>
                                <span>{campaign.price.toLocaleString()} KWD</span>
                            </div>
                        </div>

                        <button className="btn btn-dark w-full mt-4">View Estimate PDF</button>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="right-col">
                    {/* Status Timeline */}
                    <div className="card glass-panel mb-6">
                        <h3 className="section-title">Status Timeline</h3>
                        <div className="timeline">
                            <TimelineItem
                                label="Submitted"
                                date={timeline?.submitted}
                                isActive={status === 'Submitted'}
                                isCompleted={timeline?.submitted && status !== 'Submitted'}
                            />
                            <TimelineItem
                                label="Processing"
                                date={null}
                                isActive={status === 'Processing'} // If we had this status
                                isCompleted={timeline?.booked}
                                isconnector
                            />
                            <TimelineItem
                                label="Booked"
                                date={timeline?.booked}
                                isActive={status === 'Booked'}
                                isCompleted={timeline?.booked && (status === 'Running' || status === 'Completed')}
                            />
                            <TimelineItem
                                label="Running"
                                date={timeline?.running}
                                isActive={status === 'Running'}
                                isCompleted={status === 'Completed'}
                            />
                            <TimelineItem
                                label="Completed"
                                date={timeline?.completed}
                                isActive={status === 'Completed'}
                                isLast
                            />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="card glass-panel">
                        <h3 className="section-title">Quick Stats</h3>
                        <div className="big-stat-box">
                            <span className="big-stat-val">{campaign.totalImpressions?.toLocaleString() || '1.5M'}</span>
                            <span className="big-stat-label">Total Est. Impressions</span>
                        </div>
                        <div className="small-stats-grid">
                            <div className="small-stat">
                                <span className="val">{campaign.durationDays || 30}</span>
                                <span className="lbl">Days</span>
                            </div>
                            <div className="small-stat">
                                <span className="val">{campaign.slotsPerDay || 4}</span>
                                <span className="lbl">Slots/Day</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .back-link {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: hsl(var(--text-muted));
                    margin-bottom: 2rem;
                    text-decoration: none;
                    font-weight: 500;
                }
                .back-link:hover { color: hsl(var(--text-main)); }

                .header-section { margin-bottom: 2rem; }
                .header-top { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
                .campaign-title { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; }
                
                .details-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 2rem;
                }

                @media (max-width: 1000px) {
                    .details-grid { grid-template-columns: 1fr; }
                }

                .card { padding: 1.5rem; }
                .section-title { font-size: 1rem; font-weight: 600; margin-bottom: 1.5rem; color: hsl(var(--text-main)); }
                .mb-0 { margin-bottom: 0 !important; }

                /* Overview */
                .overview-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                .overview-item { display: flex; gap: 1rem; align-items: flex-start; }
                .icon-box { 
                    width: 40px; height: 40px; background: #f9fafb; border: 1px solid #e5e7eb; 
                    border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6b7280;
                }
                .label { display: block; font-size: 0.8rem; color: #6b7280; margin-bottom: 0.25rem; }
                .value { font-weight: 600; color: #111827; }

                /* Screens List */
                .screen-item-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: #f9fafb;
                    border-radius: 8px;
                    margin-bottom: 0.75rem;
                }
                .screen-icon-box { 
                     min-width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
                }
                .screen-details-flex {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .screen-name { font-weight: 500; }

                /* Price */
                .price-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
                .badge-outline { padding: 2px 8px; border: 1px solid #d1d5db; border-radius: 100px; font-size: 0.75rem; color: #6b7280; }
                
                .price-rows { display: flex; flex-direction: column; gap: 1rem; }
                .price-row { display: flex; justify-content: space-between; font-size: 0.95rem; }
                .price-row.total { 
                    border-top: 1px solid #e5e7eb; 
                    padding-top: 1rem; 
                    margin-top: 0.5rem; 
                    font-weight: 700; 
                    font-size: 1.1rem; 
                }
                
                .btn-dark { background: #1f2937; color: white; padding: 0.75rem; border-radius: 6px; font-weight: 500; }
                .btn-dark:hover { background: #111827; }

                /* Timeline */
                .timeline { display: flex; flex-direction: column; }
                .timeline-item { display: flex; gap: 1rem; position: relative; padding-bottom: 2rem; }
                .timeline-item.last { padding-bottom: 0; }
                
                .timeline-line {
                    position: absolute;
                    left: 7px; /* center of dot (16px width / 2) - 1px border */
                    top: 20px;
                    bottom: 0;
                    width: 2px;
                    background: #e5e7eb;
                }
                .timeline-item.last .timeline-line { display: none; }

                .timeline-dot {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #e5e7eb;
                    z-index: 2;
                    flex-shrink: 0;
                    margin-top: 4px;
                }
                .timeline-item.active .timeline-dot {
                    background: #111827;
                    box-shadow: 0 0 0 4px rgba(0,0,0,0.1);
                }
                .timeline-item.completed .timeline-dot {
                    background: #111827;
                }

                .timeline-content .state-label { font-weight: 600; font-size: 0.95rem; display: block; }
                .timeline-content .date-label { font-size: 0.8rem; color: #6b7280; }
                
                .timeline-item.inactive .state-label { color: #9ca3af; }

                /* Stats */
                .big-stat-box { background: #f9fafb; padding: 1.5rem; text-align: center; margin-bottom: 1rem; }
                .big-stat-val { font-size: 2rem; font-weight: 700; display: block; }
                .big-stat-label { font-size: 0.85rem; color: #6b7280; }
                
                .small-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                .small-stat { background: #f9fafb; padding: 1rem; text-align: center; }
                .small-stat .val { font-size: 1.25rem; font-weight: 700; display: block; }
                .small-stat .lbl { font-size: 0.75rem; color: #6b7280; }

            `}</style>
        </div>
    );
}

const TimelineItem = ({ label, date, isActive, isCompleted, isLast }) => {
    return (
        <div className={`timeline-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${!isActive && !isCompleted ? 'inactive' : ''} ${isLast ? 'last' : ''}`}>
            <div className="timeline-line" />
            <div className="timeline-dot" />
            <div className="timeline-content">
                <span className="state-label">{label}</span>
                {date && <span className="date-label">{date}</span>}
            </div>
        </div>
    );
};

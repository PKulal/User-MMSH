import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import {
    BarChart3, Download, Calendar, Filter, ChevronDown,
    TrendingUp, Users, PlayCircle, Wallet, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { MOCK_REPORTS } from '../data/mockReports';
import { MOCK_CAMPAIGNS } from '../data/mockCampaigns';

const StatCard = ({ title, value, icon, change, isPositive }) => (
    <div className="report-stat-card glass-panel">
        <div className="stat-header">
            <div className="stat-icon">{icon}</div>
            {change && (
                <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {change}%
                </div>
            )}
        </div>
        <div className="stat-body">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{title}</span>
        </div>
    </div>
);

const PlayoutHeatmap = ({ data }) => {
    const maxVal = Math.max(...data, 1);
    const getIntensity = (val) => (val / maxVal);

    return (
        <div className="heatmap-container">
            <div className="heatmap-grid">
                {data.map((val, hour) => (
                    <div
                        key={hour}
                        className="heatmap-cell"
                        style={{
                            backgroundColor: `rgba(59, 130, 246, ${Math.max(0.05, getIntensity(val))})`,
                            border: val === 0 ? '1px dashed #e5e7eb' : 'none'
                        }}
                        title={`${hour}:00 - ${val} playouts`}
                    />
                ))}
            </div>
            <div className="heatmap-labels">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:00</span>
            </div>
        </div>
    );
};

export default function Reports() {
    const [timeRange, setTimeRange] = useState('7 days');
    const [selectedCampaign, setSelectedCampaign] = useState('Overall');

    const reportData = useMemo(() => {
        if (selectedCampaign === 'Overall') return MOCK_REPORTS.overall;
        return MOCK_REPORTS.campaigns[selectedCampaign] || MOCK_REPORTS.overall;
    }, [selectedCampaign]);

    const budgetData = [
        { name: 'Spent', value: reportData.spent || reportData.totalSpent, color: '#3b82f6' },
        { name: 'Remaining', value: (reportData.plannedBudget || reportData.totalBudgetAllocated) - (reportData.spent || reportData.totalSpent), color: '#e5e7eb' }
    ];

    const handleExport = () => {
        alert('Exporting report as PDF/CSV...');
    };

    return (
        <div className="reports-container">
            <header className="reports-header-row">
                <div>
                    <h1 className="page-title">Reports & Analytics</h1>
                    <p className="text-muted">Track your advertising performance and budget.</p>
                </div>
                <div className="header-actions">
                    <div className="dropdown-wrapper">
                        <Filter size={18} />
                        <select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)}>
                            <option value="Overall">Overall Performance</option>
                            {MOCK_CAMPAIGNS.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={handleExport}>
                        <Download size={18} /> Export
                    </button>
                </div>
            </header>

            {/* Quick Stats Grid */}
            <div className="stats-grid three-cols">
                <StatCard
                    title="Total Impressions"
                    value={(reportData.impressions || reportData.totalImpressions).toLocaleString()}
                    icon={<Users size={20} />}
                    change="12.5"
                    isPositive={true}
                />
                <StatCard
                    title="Playouts"
                    value={reportData.playouts.toLocaleString()}
                    icon={<PlayCircle size={20} />}
                    change="2.4"
                    isPositive={false}
                />
                <StatCard
                    title="No. of Campaigns"
                    value={selectedCampaign === 'Overall' ? (reportData.activeCampaigns || 0).toLocaleString() : "1"}
                    icon={<BarChart3 size={20} />}
                />
            </div>

            <div className="reports-main-grid">
                {/* Main Chart Section */}
                <div className="chart-section card glass-panel">
                    <div className="chart-header">
                        <h3>Performance Over Time</h3>
                        <div className="range-pills">
                            {['7 days', '14 days', '30 days'].map(range => (
                                <button
                                    key={range}
                                    className={`range-pill ${timeRange === range ? 'active' : ''}`}
                                    onClick={() => setTimeRange(range)}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="chart-canvas">
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={reportData.performanceHistory || reportData.history}>
                                <defs>
                                    <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                                />
                                <Area type="monotone" dataKey="impressions" stroke="#3b82f6" fillOpacity={1} fill="url(#colorImpressions)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="reports-side">
                    <div className="card glass-panel budget-card">
                        <h3>Budget Breakdown</h3>
                        <div className="donut-container">
                            <ResponsiveContainer width="100%" height={240}>
                                <PieChart>
                                    <Pie
                                        data={budgetData}
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {budgetData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" align="center" />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="donut-label">
                                <span className="pct">{Math.round(((reportData.spent || reportData.totalSpent) / (reportData.plannedBudget || reportData.totalBudgetAllocated)) * 100)}%</span>
                                <span className="lbl">Spent</span>
                            </div>
                        </div>
                    </div>

                    <div className="card glass-panel info-card">
                        <h3>Campaign Health</h3>
                        <div className="donut-container small">
                            <ResponsiveContainer width="100%" height={160}>
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Achieved', value: reportData.health.actualImpressions, color: '#10b981' },
                                            { name: 'Target', value: reportData.health.targetImpressions - reportData.health.actualImpressions, color: '#f1f5f9' }
                                        ]}
                                        innerRadius={50}
                                        outerRadius={65}
                                        paddingAngle={0}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        <Cell fill="#10b981" />
                                        <Cell fill="#f1f5f9" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="donut-label">
                                <span className="pct small">{reportData.health.completionRate}%</span>
                                <span className="lbl small">Target</span>
                            </div>
                        </div>
                        <div className="info-list compact">
                            <div className="info-item">
                                <span className="lbl">Status</span>
                                <span className="val" style={{ color: '#10b981' }}>ON TRACK</span>
                            </div>
                            <div className="info-item">
                                <span className="lbl">Est. Completion</span>
                                <span className="val">Oct 15</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="reports-main-grid mt-6">
                <div className="card glass-panel">
                    <h3>Audience Demographics</h3>
                    <div className="demo-flex">
                        <div className="demo-chart">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={reportData.demographics.ageGroups} layout="vertical">
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="demo-stats">
                            <div className="demo-stat-box">
                                <span className="lbl">Gender Split</span>
                                <div className="gender-bar">
                                    <div className="male" style={{ width: `${reportData.demographics.gender[0].value}%` }}>M {reportData.demographics.gender[0].value}%</div>
                                    <div className="female" style={{ width: `${reportData.demographics.gender[1].value}%` }}>F {reportData.demographics.gender[1].value}%</div>
                                </div>
                            </div>
                            {reportData.demographics.nationality && (
                                <div className="demo-stat-box mt-4">
                                    <span className="lbl">Nationality</span>
                                    <div className="nationality-list">
                                        {reportData.demographics.nationality.map(n => (
                                            <div key={n.name} className="nat-item">
                                                <span>{n.name}</span>
                                                <span className="bold">{n.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card glass-panel">
                    <h3>24h Playout Heatmap</h3>
                    <p className="text-muted text-sm mb-4">Playout density across different hours of the day.</p>
                    <PlayoutHeatmap data={reportData.heatmapData} />
                    <div className="heatmap-legend mt-4">
                        <span className="lbl">Intensity:</span>
                        <div className="legend-blocks">
                            <div className="block l1" />
                            <div className="block l2" />
                            <div className="block l3" />
                            <div className="block l4" />
                        </div>
                    </div>
                </div>
            </div>

            {selectedCampaign === 'Overall' && (
                <div className="card glass-panel mt-6">
                    <div className="chart-header">
                        <h3>Active Screens Over Time</h3>
                    </div>
                    <div className="chart-canvas">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={reportData.screensHistory}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    cursor={{ fill: '#f1f5f9' }}
                                />
                                <Bar dataKey="screens" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {selectedCampaign === 'Overall' && (
                <div className="reports-main-grid mt-6">
                    <div className="card glass-panel">
                        <div className="chart-header">
                            <h3>eCPM Over Time (KWD)</h3>
                        </div>
                        <div className="chart-canvas">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={reportData.ecpmHistory}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: '#f1f5f9' }}
                                    />
                                    <Bar dataKey="ecpm" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card glass-panel">
                        <div className="chart-header">
                            <h3>Number of Playouts Over Time</h3>
                        </div>
                        <div className="chart-canvas">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={reportData.performanceHistory}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: '#f1f5f9' }}
                                    />
                                    <Bar dataKey="playouts" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {selectedCampaign === 'Overall' && (
                <div className="reports-main-grid mt-6">
                    <div className="card glass-panel">
                        <h3>Geospatial Distribution</h3>
                        <p className="text-muted text-sm mb-4">Top performing regions by impression volume.</p>
                        <div className="region-list">
                            {reportData.regionalPerformance.map((reg, idx) => (
                                <div key={reg.region} className="region-item">
                                    <div className="reg-info">
                                        <span className="reg-rank">{idx + 1}</span>
                                        <span className="reg-name">{reg.region}</span>
                                    </div>
                                    <div className="reg-value">
                                        <span className="val">{(reg.impressions / 1000).toFixed(0)}k</span>
                                        <span className="lbl">imps</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card glass-panel">
                        <h3>Report Summary</h3>
                        <div className="summary-bullets">
                            <div className="bullet">
                                <div className="dot positive" />
                                <p>Campaign performance is <strong>12% higher</strong> than last month.</p>
                            </div>
                            <div className="bullet">
                                <div className="dot warning" />
                                <p>Peak hours (18:00 - 20:00) are showing <strong>high saturation</strong>.</p>
                            </div>
                            <div className="bullet">
                                <div className="dot info" />
                                <p>Upcoming weekend predicted to reach <strong>1.2M impressions</strong>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="card glass-panel mt-6">
                <div className="section-header">
                    <h3>{selectedCampaign === 'Overall' ? 'Screen Performance' : 'Daily Logs'}</h3>
                </div>
                <div className="table-responsive">
                    <table className="report-table">
                        <thead>
                            {selectedCampaign === 'Overall' ? (
                                <tr>
                                    <th>Screen Name</th>
                                    <th>Playouts</th>
                                    <th>Impressions</th>
                                    <th>Status</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th>Date</th>
                                    <th>Impressions</th>
                                    <th>Playouts</th>
                                    <th>Efficiency</th>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {(selectedCampaign === 'Overall' ? reportData.screenPerformance : reportData.history).map((row, idx) => (
                                <tr key={idx}>
                                    <td className="font-medium">{row.name || row.date}</td>
                                    <td>{row.playouts.toLocaleString()}</td>
                                    <td>{row.impressions.toLocaleString()}</td>
                                    <td>
                                        <span className={`status-tag ${row.status === 'Playing' ? 'playing' : ''}`}>
                                            {row.status || '98.5%'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
        .reports-container { padding: 2rem; max-width: 1400px; margin: 0 auto; padding-bottom: 5rem; }
        
        .reports-header-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; }
        .page-title { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; }
        
        .header-actions { display: flex; gap: 1rem; }
        .dropdown-wrapper { 
          display: flex; align-items: center; gap: 0.75rem; background: #fff; border: 1px solid #e5e7eb;
          padding: 0 1rem; border-radius: 6px;
        }
        .dropdown-wrapper select { border: none; background: transparent; height: 44px; font-weight: 500; font-size: 0.95rem; outline: none; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .stats-grid.three-cols { grid-template-columns: repeat(3, 1fr); }
        .report-stat-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .stat-header { display: flex; justify-content: space-between; align-items: center; }
        .stat-icon { width: 40px; height: 40px; background: #f3f6ff; color: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .stat-change { display: flex; align-items: center; gap: 2px; font-size: 0.75rem; font-weight: 600; padding: 2px 6px; border-radius: 4px; }
        .stat-change.positive { background: #ecfdf5; color: #10b981; }
        .stat-change.negative { background: #fef2f2; color: #ef4444; }
        .stat-value { font-size: 1.75rem; font-weight: 700; display: block; line-height: 1; }
        .stat-label { font-size: 0.85rem; color: #64748b; font-weight: 500; }
        
        .reports-main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
        .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        
        /* Heatmap */
        .heatmap-container { margin-top: 1rem; }
        .heatmap-grid { display: grid; grid-template-columns: repeat(24, 1fr); gap: 4px; height: 60px; }
        .heatmap-cell { border-radius: 2px; transition: transform 0.2s; }
        .heatmap-cell:hover { transform: scale(1.2); z-index: 10; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .heatmap-labels { display: flex; justify-content: space-between; margin-top: 0.75rem; color: #64748b; font-size: 0.75rem; }
        .heatmap-legend { display: flex; align-items: center; gap: 0.75rem; }
        .legend-blocks { display: flex; gap: 4px; }
        .legend-blocks .block { width: 12px; height: 12px; border-radius: 2px; }
        .block.l1 { background: rgba(59, 130, 246, 0.1); }
        .block.l2 { background: rgba(59, 130, 246, 0.4); }
        .block.l3 { background: rgba(59, 130, 246, 0.7); }
        .block.l4 { background: rgba(59, 130, 246, 1.0); }

        /* Demographics */
        .demo-flex { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; }
        .gender-bar { display: flex; height: 24px; border-radius: 4px; overflow: hidden; margin-top: 0.5rem; font-size: 0.75rem; font-weight: 600; color: white; }
        .gender-bar .male { background: #3b82f6; display: flex; align-items: center; padding: 0 0.5rem; }
        .gender-bar .female { background: #ec4899; display: flex; align-items: center; justify-content: flex-end; padding: 0 0.5rem; }
        .nat-item { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
        .nat-item:last-child { border-bottom: none; }
        .nat-item .bold { font-weight: 700; }

        /* Regions & Summary */
        .region-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
        .region-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 8px; }
        .reg-info { display: flex; align-items: center; gap: 1rem; }
        .reg-rank { width: 24px; height: 24px; background: #fff; border: 1px solid #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; }
        .reg-name { font-weight: 500; }
        .reg-value { text-align: right; }
        .reg-value .val { display: block; font-weight: 700; color: #3b82f6; }
        .reg-value .lbl { font-size: 0.7rem; color: #64748b; text-transform: uppercase; }

        .summary-bullets { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1.5rem; }
        .bullet { display: flex; gap: 1rem; align-items: flex-start; }
        .bullet p { font-size: 0.95rem; line-height: 1.4; margin: 0; }
        .bullet .dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
        .dot.positive { background: #10b981; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }
        .dot.warning { background: #f59e0b; box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1); }
        .dot.info { background: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }

        .donut-container { position: relative; }
        .donut-container.small { height: 160px; margin: 1rem 0; }
        .donut-label { position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); text-align: center; display: flex; flex-direction: column; }
        .donut-label .pct { font-size: 1.5rem; font-weight: 700; }
        .donut-label .pct.small { font-size: 1.25rem; }
        .donut-label .lbl { font-size: 0.75rem; color: #64748b; }
        .donut-label .lbl.small { font-size: 0.7rem; }
        
        .info-list { display: flex; flex-direction: column; gap: 1rem; }
        .info-list.compact { gap: 0.5rem; margin-top: 0; }
        .info-item { display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid #f1f5f9; }
        .info-item:last-child { border-bottom: none; }
        .info-item .lbl { color: #64748b; font-size: 0.9rem; }
        .info-item .val { font-weight: 600; font-size: 0.95rem; }
        .status-even { color: #3b82f6; }

        .report-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .report-table th { text-align: left; padding: 1rem; font-size: 0.85rem; color: #64748b; border-bottom: 1px solid #f1f5f9; }
        .report-table td { padding: 1.25rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: 0.95rem; }
        .table-responsive { overflow-x: auto; margin: 0 -1rem; padding: 0 1rem; }
        
        .status-tag { padding: 4px 10px; border-radius: 100px; background: #f1f5f9; color: #64748b; font-size: 0.75rem; font-weight: 600; }
        .status-tag.playing { background: #ecfdf5; color: #10b981; }

        @media (max-width: 1100px) {
          .reports-main-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .demo-flex { grid-template-columns: 1fr; gap: 1rem; }
        }

        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr; }
          .reports-header-row { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .header-actions { width: 100%; flex-direction: column; }
          .dropdown-wrapper { width: 100%; justify-content: space-between; }
        }
      `}</style>
        </div>
    );
}

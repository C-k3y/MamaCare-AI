import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';

const Reports = () => {
    const [activeTab, setActiveTab] = useState('weekly');

    const s = {
        layout: { display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f7 0%, #ffe5ec 100%)', fontFamily: "'Inter', system-ui, sans-serif" },
        main: { marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' },
        content: { padding: '32px', flex: 1 },
        heading: { margin: '0 0 4px 0', fontSize: '1.75rem', fontWeight: '800', color: '#1a202c' },
        sub: { margin: '0 0 32px 0', fontSize: '1rem', color: '#718096' },
        tabs: { display: 'flex', gap: '8px', marginBottom: '28px' },
        tab: (active) => ({ padding: '10px 22px', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', background: active ? 'linear-gradient(135deg,#ff8fab,#fb6f92)' : 'rgba(255,255,255,0.8)', color: active ? 'white' : '#718096', boxShadow: active ? '0 4px 15px rgba(251,111,146,0.3)' : 'none', fontFamily: "'Inter', system-ui, sans-serif", transition: 'all 0.2s' }),
        grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '20px', marginBottom: '28px' },
        statCard: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(251,111,146,0.07)', border: '1px solid rgba(255,255,255,0.7)' },
        statLabel: { margin: '0 0 8px 0', fontSize: '0.82rem', fontWeight: '700', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em' },
        statValue: { margin: '0 0 4px 0', fontSize: '1.75rem', fontWeight: '800', color: '#1a202c' },
        statSub: { margin: 0, fontSize: '0.82rem', color: '#a0aec0' },
        trendUp: { color: '#38a169', fontWeight: '700', fontSize: '0.85rem' },
        trendDown: { color: '#e53e3e', fontWeight: '700', fontSize: '0.85rem' },
        card: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '24px', padding: '24px', boxShadow: '0 8px 32px rgba(251,111,146,0.08)', border: '1px solid rgba(255,255,255,0.6)', marginBottom: '24px' },
        cardTitle: { margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: '700', color: '#2d3748' },
        downloadBtn: { padding: '12px 24px', borderRadius: '14px', background: 'linear-gradient(135deg,#ff8fab,#fb6f92)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif", boxShadow: '0 4px 15px rgba(251,111,146,0.3)' }
    };

    const stats = [
        { label: 'Avg Blood Pressure', value: '116/74', sub: 'mmHg', trend: '↑ Normal', up: true },
        { label: 'Avg Weight', value: '68.3', sub: 'kg this week', trend: '↓ -0.2 kg', up: false },
        { label: 'Calories Avg', value: '1,820', sub: 'kcal/day', trend: '↑ On target', up: true },
        { label: 'Water Intake', value: '2.1', sub: 'L/day avg', trend: '↑ Great!', up: true }
    ];

    const reportHistory = [
        { date: 'Jul 14–20, 2026', label: 'Weekly Health Summary', type: 'PDF' },
        { date: 'Jul 7–13, 2026', label: 'Weekly Health Summary', type: 'PDF' },
        { date: 'June 2026', label: 'Monthly Nutrition Report', type: 'PDF' },
        { date: 'May 2026', label: 'Monthly Nutrition Report', type: 'PDF' }
    ];

    return (
        <div style={s.layout}>
            <Sidebar />
            <div style={s.main}>
                <DashboardNavbar />
                <div style={s.content}>
                    <h1 style={s.heading}>Health Reports</h1>
                    <p style={s.sub}>Track your health trends and download comprehensive reports for your records.</p>

                    <div style={s.tabs}>
                        {['weekly', 'monthly', 'custom'].map(t => (
                            <button key={t} style={s.tab(activeTab === t)} onClick={() => setActiveTab(t)}>
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div style={s.grid}>
                        {stats.map((st, i) => (
                            <div key={i} style={s.statCard}>
                                <p style={s.statLabel}>{st.label}</p>
                                <p style={s.statValue}>{st.value}</p>
                                <p style={s.statSub}>{st.sub}</p>
                                <p style={st.up ? s.trendUp : s.trendDown}>{st.trend}</p>
                            </div>
                        ))}
                    </div>

                    <div style={s.card}>
                        <h2 style={s.cardTitle}>Report History</h2>
                        {reportHistory.map((r, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < reportHistory.length - 1 ? '1px solid #edf2f7' : 'none' }}>
                                <div>
                                    <p style={{ margin: '0 0 2px 0', fontWeight: '700', color: '#1a202c', fontSize: '0.95rem' }}>{r.label}</p>
                                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#a0aec0' }}>{r.date}</p>
                                </div>
                                <button style={{ padding: '8px 18px', borderRadius: '10px', background: 'transparent', border: '2px solid rgba(251,111,146,0.3)', color: '#fb6f92', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif" }}>
                                    ↓ {r.type}
                                </button>
                            </div>
                        ))}
                    </div>

                    <button style={s.downloadBtn}>📊 Generate & Download Current Report</button>
                </div>
            </div>
        </div>
    );
};

export default Reports;

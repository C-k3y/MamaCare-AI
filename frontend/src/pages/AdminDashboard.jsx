import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('Dashboard');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const colors = {
        primary: '#6b21a8', // Deep purple/indigo
        primaryLight: '#f3e8ff',
        accent: '#d97706', // Amber/gold
        bg: '#f8fafc',
        white: '#ffffff',
        text: '#1e293b',
        textLight: '#64748b',
        border: '#e2e8f0',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        critical: '#b91c1c'
    };

    const s = {
        page: { display: 'flex', minHeight: '100vh', backgroundColor: colors.bg, fontFamily: "'Inter', system-ui, sans-serif", color: colors.text },
        
        // Sidebar
        sidebar: { width: '280px', backgroundColor: colors.white, borderRight: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', padding: '24px', boxSizing: 'border-box' },
        profileSection: { position: 'relative', textAlign: 'center', marginBottom: '32px', paddingTop: '20px' },
        starShape: { position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(107,33,168,0.2) 0%, rgba(107,33,168,0) 70%)', filter: 'blur(10px)', zIndex: 0 },
        avatarImg: { width: '80px', height: '80px', borderRadius: '50%', border: `4px solid ${colors.white}`, boxShadow: `0 4px 12px rgba(107,33,168,0.15)`, position: 'relative', zIndex: 1, backgroundColor: colors.primaryLight, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: colors.primary },
        providerName: { margin: '12px 0 4px 0', fontSize: '1.1rem', fontWeight: '700' },
        credentials: { margin: 0, fontSize: '0.8rem', color: colors.textLight, lineHeight: '1.4' },
        
        navMenu: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
        navItem: (active) => ({ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600', color: active ? colors.primary : colors.textLight, backgroundColor: active ? colors.primaryLight : 'transparent', transition: 'all 0.2s' }),
        
        // Main Content
        main: { flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' },
        header: { height: '70px', backgroundColor: colors.white, borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'sticky', top: 0, zIndex: 10 },
        headerTitle: { margin: 0, fontSize: '1.25rem', fontWeight: '700' },
        headerRight: { display: 'flex', alignItems: 'center', gap: '20px' },
        searchBar: { display: 'flex', alignItems: 'center', backgroundColor: colors.bg, padding: '8px 16px', borderRadius: '20px', border: `1px solid ${colors.border}`, width: '250px' },
        searchInput: { border: 'none', background: 'transparent', outline: 'none', marginLeft: '8px', width: '100%', fontSize: '0.9rem' },
        iconBtn: { background: 'none', border: 'none', cursor: 'pointer', color: colors.textLight, display: 'flex', alignItems: 'center' },
        
        contentArea: { padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' },
        
        // Grid System
        row3: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
        
        // Cards
        card: { backgroundColor: colors.white, borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(107,33,168,0.05)', border: `1px solid ${colors.border}` },
        cardTitle: { margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: '700', color: colors.text },
        
        // Top Stat Card
        statCard: { display: 'flex', alignItems: 'center', gap: '20px' },
        statIconBox: { width: '56px', height: '56px', borderRadius: '50%', border: `2px solid ${colors.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary },
        statValue: { margin: '0 0 4px 0', fontSize: '1.75rem', fontWeight: '800' },
        statLabel: { margin: 0, fontSize: '0.9rem', color: colors.textLight },
        statSub: { margin: '4px 0 0 0', fontSize: '0.8rem', color: colors.accent, fontWeight: '600' },
        
        // Lists
        listItem: { display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', borderBottom: `1px solid ${colors.border}` },
        listAvatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: colors.primaryLight },
        
        // Pills
        pillRow: { display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '16px 0' },
        pill: (color) => ({ padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: `${color}20`, color: color }),
        
        // Buttons
        btnGroup: { display: 'flex', gap: '12px', marginTop: '20px' },
        btn: (primary) => ({ flex: 1, padding: '10px', borderRadius: '12px', border: primary ? 'none' : `1px solid ${colors.border}`, backgroundColor: primary ? colors.primary : colors.white, color: primary ? colors.white : colors.text, fontWeight: '600', cursor: 'pointer', textAlign: 'center' }),
        
        // Progress Bars
        riskRow: { marginBottom: '16px' },
        riskLabelBox: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' },
        barBg: { height: '8px', backgroundColor: colors.border, borderRadius: '4px', overflow: 'hidden' },
        barFill: (color, width) => ({ height: '100%', backgroundColor: color, width: width, borderRadius: '4px' })
    };

    // Icons
    const SvgIcon = ({ d, size = 20, color = 'currentColor' }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={d} />
        </svg>
    );

    return (
        <div style={s.page}>
            {/* Sidebar */}
            <aside style={s.sidebar}>
                <div style={s.profileSection}>
                    <div style={s.starShape}></div>
                    <div style={s.avatarImg}>DR</div>
                    <h2 style={s.providerName}>Dr. Amara Osei</h2>
                    <p style={s.credentials}>MBBS, FCPS - MD (Medicine)<br/>OB/GYN Specialist</p>
                </div>
                
                <nav style={s.navMenu}>
                    {['Dashboard', 'Appointments', 'Appointment Requests', 'Patients', 'Prescriptions', 'Profile', 'Settings'].map(item => (
                        <div key={item} style={s.navItem(activeMenu === item)} onClick={() => setActiveMenu(item)}>
                            <span style={{width: '20px', height: '20px', background: activeMenu === item ? colors.primary : colors.textLight, opacity: 0.5, borderRadius: '4px'}}></span>
                            {item}
                        </div>
                    ))}
                    <div style={{...s.navItem(false), marginTop: 'auto', color: colors.danger}} onClick={handleLogout}>
                        Logout
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={s.main}>
                {/* Header */}
                <header style={s.header}>
                    <h1 style={s.headerTitle}>MamaCare AI — Provider Dashboard</h1>
                    <div style={s.headerRight}>
                        <div style={s.searchBar}>
                            <SvgIcon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            <input type="text" placeholder="Search patients..." style={s.searchInput} />
                        </div>
                        <button style={s.iconBtn}><SvgIcon d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></button>
                        <button style={s.iconBtn}><SvgIcon d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></button>
                        <button style={s.iconBtn}><SvgIcon d="M4 6h16M4 12h16M4 18h16" /></button>
                    </div>
                </header>

                <div style={s.contentArea}>
                    {/* Top Stat Row */}
                    <div style={s.row3}>
                        <div style={{...s.card, ...s.statCard}}>
                            <div style={s.statIconBox}><SvgIcon d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8z" size={24} /></div>
                            <div>
                                <p style={s.statValue}>1,245</p>
                                <p style={s.statLabel}>Total Patients</p>
                            </div>
                        </div>
                        <div style={{...s.card, ...s.statCard}}>
                            <div style={s.statIconBox}><SvgIcon d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" size={24} /></div>
                            <div>
                                <p style={s.statValue}>18</p>
                                <p style={s.statLabel}>Today's Patients</p>
                                <p style={s.statSub}>Dec 14, 2023</p>
                            </div>
                        </div>
                        <div style={{...s.card, ...s.statCard}}>
                            <div style={s.statIconBox}><SvgIcon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" size={24} /></div>
                            <div>
                                <p style={s.statValue}>12</p>
                                <p style={s.statLabel}>Today's Appointments</p>
                                <p style={s.statSub}>Dec 14, 2023</p>
                            </div>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div style={s.row3}>
                        {/* Patient Summary Donut */}
                        <div style={s.card}>
                            <h3 style={s.cardTitle}>Patient Summary</h3>
                            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                {/* Fake Donut Chart via CSS conic-gradient */}
                                <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: `conic-gradient(${colors.accent} 0% 25%, ${colors.danger} 25% 45%, ${colors.primary} 45% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '110px', height: '110px', backgroundColor: colors.white, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>100%</span>
                                        <span style={{ fontSize: '0.7rem', color: colors.textLight }}>Total</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px', fontSize: '0.8rem', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{width: '10px', height: '10px', borderRadius: '50%', background: colors.primary}}></div> Total</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{width: '10px', height: '10px', borderRadius: '50%', background: colors.accent}}></div> New</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{width: '10px', height: '10px', borderRadius: '50%', background: colors.danger}}></div> High-Risk</div>
                            </div>
                        </div>

                        {/* Today's Appointments List */}
                        <div style={s.card}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={s.cardTitle}>Today's Appointments</h3>
                                <span style={{ color: colors.primary, fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>See All</span>
                            </div>
                            <div>
                                {[
                                    { name: 'Sarah Jenkins', cond: 'Antenatal Checkup', time: '09:00 AM' },
                                    { name: 'Maria Garcia', cond: 'Risk Review', time: '10:30 AM' },
                                    { name: 'Aisha Patel', cond: 'First Trimester Scan', time: '11:45 AM' },
                                    { name: 'Emily Chen', cond: 'Routine Checkup', time: '02:00 PM' }
                                ].map((p, i) => (
                                    <div key={i} style={{ ...s.listItem, borderBottom: i === 3 ? 'none' : s.listItem.borderBottom }}>
                                        <div style={s.listAvatar}></div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: '0 0 2px 0', fontWeight: '700', fontSize: '0.9rem' }}>{p.name}</p>
                                            <p style={{ margin: 0, color: colors.textLight, fontSize: '0.8rem' }}>{p.cond}</p>
                                        </div>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: colors.primary }}>{p.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Patient Details */}
                        <div style={{...s.card, backgroundColor: colors.primaryLight, border: `1px solid ${colors.primary}40`}}>
                            <h3 style={s.cardTitle}>Next Patient Details</h3>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: colors.white }}></div>
                                <div>
                                    <p style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: '800', color: colors.primary }}>Sarah Jenkins</p>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: colors.textLight }}>ID: #PT-8942 • Female • 28y</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem', color: colors.textLight, marginBottom: '16px' }}>
                                <div><strong>Weight:</strong> 68 kg</div>
                                <div><strong>Height:</strong> 165 cm</div>
                                <div><strong>Last Visit:</strong> Nov 14</div>
                                <div><strong>Registered:</strong> Aug 02</div>
                            </div>

                            <div style={s.pillRow}>
                                <span style={s.pill(colors.danger)}>Gestational Diabetes</span>
                                <span style={s.pill(colors.warning)}>High BP</span>
                            </div>

                            <div style={s.btnGroup}>
                                <button style={s.btn(true)}>Call</button>
                                <button style={s.btn(false)}>Document</button>
                                <button style={s.btn(false)}>Chat</button>
                            </div>
                        </div>
                    </div>

                    {/* Third Row */}
                    <div style={s.row3}>
                        {/* Risk Overview */}
                        <div style={s.card}>
                            <h3 style={s.cardTitle}>Patient Risk Overview</h3>
                            {[
                                { label: 'Low Risk', pct: 65, color: colors.success },
                                { label: 'Moderate Risk', pct: 20, color: colors.warning },
                                { label: 'High Risk', pct: 10, color: colors.accent },
                                { label: 'Critical', pct: 5, color: colors.critical }
                            ].map((r, i) => (
                                <div key={i} style={s.riskRow}>
                                    <div style={s.riskLabelBox}>
                                        <span style={{ color: colors.textLight }}>{r.label}</span>
                                        <span style={{ fontWeight: '800' }}>{r.pct}%</span>
                                    </div>
                                    <div style={s.barBg}>
                                        <div style={s.barFill(r.color, `${r.pct}%`)}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Appointment Requests */}
                        <div style={s.card}>
                            <h3 style={s.cardTitle}>Appointment Requests</h3>
                            {[
                                { name: 'Linda Osei', cond: 'Fetal Movement Check' },
                                { name: 'Chloe Smith', cond: 'Nutrition Consult' },
                                { name: 'Fatima Noor', cond: 'Pain in lower back' }
                            ].map((req, i) => (
                                <div key={i} style={{ ...s.listItem, borderBottom: i === 2 ? 'none' : s.listItem.borderBottom }}>
                                    <div style={{...s.listAvatar, width: '32px', height: '32px'}}></div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: '0 0 2px 0', fontWeight: '700', fontSize: '0.85rem' }}>{req.name}</p>
                                        <p style={{ margin: 0, color: colors.textLight, fontSize: '0.75rem' }}>{req.cond}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{ background: colors.success, border: 'none', borderRadius: '50%', width: '24px', height: '24px', color: 'white', cursor: 'pointer', display: 'flex', alignItems:'center', justifyContent: 'center' }}>✓</button>
                                        <button style={{ background: colors.danger, border: 'none', borderRadius: '50%', width: '24px', height: '24px', color: 'white', cursor: 'pointer', display: 'flex', alignItems:'center', justifyContent: 'center' }}>✕</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Calendar */}
                        <div style={{...s.card, display: 'flex', flexDirection: 'column'}}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{...s.cardTitle, margin: 0}}>December 2023</h3>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}}>{'<'}</button>
                                    <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}}>{'>'}</button>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '0.8rem', fontWeight: '600', color: colors.textLight, marginBottom: '8px' }}>
                                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '0.85rem' }}>
                                {/* Dummy Calendar Grid */}
                                {Array.from({length: 31}).map((_, i) => (
                                    <div key={i} style={{ padding: '6px 0', borderRadius: '50%', background: i + 1 === 14 ? colors.primary : 'transparent', color: i + 1 === 14 ? 'white' : colors.text, fontWeight: i + 1 === 14 ? 'bold' : 'normal', cursor: 'pointer' }}>
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;

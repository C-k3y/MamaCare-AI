import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';

const adminStats = [
    { label: 'Total Patients', value: '1,284', icon: '👩', trend: '+12 this week' },
    { label: 'Active Doctors', value: '38', icon: '🩺', trend: '+2 this month' },
    { label: 'Appointments Today', value: '67', icon: '📅', trend: '5 pending' },
    { label: 'SOS Alerts', value: '3', icon: '🚨', trend: '2 resolved' }
];

const recentUsers = [
    { name: 'Jane Doe', email: 'jane@example.com', week: 24, status: 'Active' },
    { name: 'Amina Kofi', email: 'amina@example.com', week: 12, status: 'Active' },
    { name: 'Priya Sharma', email: 'priya@example.com', week: 36, status: 'High Risk' },
    { name: 'Maria Santos', email: 'maria@example.com', week: 8, status: 'Active' },
    { name: 'Yemi Okafor', email: 'yemi@example.com', week: 30, status: 'Inactive' }
];

const AdminDashboard = () => {
    const s = {
        layout: { display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f7f0ff 0%, #ede5ff 100%)', fontFamily: "'Inter', system-ui, sans-serif" },
        sidebar: { width: '280px', height: '100vh', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(139,92,246,0.15)', display: 'flex', flexDirection: 'column', padding: '24px 0', position: 'fixed', left: 0, top: 0, boxSizing: 'border-box' },
        sidebarLogo: { fontSize: '1.5rem', fontWeight: '800', color: '#7c3aed', padding: '0 32px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' },
        sidebarMenu: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' },
        sidebarItem: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 24px', borderRadius: '14px', color: '#718096', fontWeight: '600', textDecoration: 'none', fontSize: '0.95rem' },
        main: { marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' },
        navBar: { padding: '16px 32px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(139,92,246,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        content: { padding: '32px', flex: 1 },
        heading: { margin: '0 0 4px 0', fontSize: '1.75rem', fontWeight: '800', color: '#1a202c' },
        sub: { margin: '0 0 32px 0', fontSize: '1rem', color: '#718096' },
        statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '20px', marginBottom: '32px' },
        statCard: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(139,92,246,0.07)', border: '1px solid rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '18px' },
        iconBox: { width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' },
        statValue: { margin: '0 0 2px 0', fontSize: '1.6rem', fontWeight: '800', color: '#1a202c' },
        statLabel: { margin: '0 0 4px 0', fontSize: '0.82rem', fontWeight: '700', color: '#718096', textTransform: 'uppercase' },
        statTrend: { margin: 0, fontSize: '0.8rem', color: '#7c3aed', fontWeight: '600' },
        tableCard: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '24px', padding: '28px', boxShadow: '0 8px 32px rgba(139,92,246,0.08)', border: '1px solid rgba(255,255,255,0.6)' },
        tableTitle: { margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: '700', color: '#1a202c' },
        table: { width: '100%', borderCollapse: 'collapse' },
        th: { padding: '10px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '2px solid #f7fafc' },
        td: { padding: '14px 16px', fontSize: '0.92rem', color: '#2d3748', borderBottom: '1px solid #f7fafc' },
        statusBadge: (status) => ({ padding: '4px 12px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: '700', background: status === 'Active' ? 'rgba(56,161,105,0.1)' : status === 'High Risk' ? 'rgba(229,62,62,0.1)' : '#edf2f7', color: status === 'Active' ? '#38a169' : status === 'High Risk' ? '#e53e3e' : '#718096' })
    };

    return (
        <div style={s.layout}>
            <aside style={s.sidebar}>
                <div style={s.sidebarLogo}><span>🛡️</span> Admin Panel</div>
                <nav style={s.sidebarMenu}>
                    {[{ icon: '📊', label: 'Dashboard' }, { icon: '👩', label: 'Patients' }, { icon: '🩺', label: 'Doctors' }, { icon: '📅', label: 'Appointments' }, { icon: '🚨', label: 'Alerts' }, { icon: '⚙️', label: 'Settings' }].map((item, i) => (
                        <a key={i} href="#" style={{ ...s.sidebarItem, background: i === 0 ? 'rgba(124,58,237,0.08)' : 'transparent', color: i === 0 ? '#7c3aed' : '#718096' }}><span>{item.icon}</span>{item.label}</a>
                    ))}
                </nav>
            </aside>
            <div style={s.main}>
                <div style={s.navBar}>
                    <span style={{ fontWeight: '700', color: '#1a202c' }}>MamaCare Admin</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.9rem', color: '#718096' }}>Admin User</span>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>A</div>
                    </div>
                </div>
                <div style={s.content}>
                    <h1 style={s.heading}>Admin Dashboard</h1>
                    <p style={s.sub}>Platform overview and management controls.</p>
                    <div style={s.statsGrid}>
                        {adminStats.map((st, i) => (
                            <div key={i} style={s.statCard}>
                                <div style={s.iconBox}>{st.icon}</div>
                                <div>
                                    <p style={s.statLabel}>{st.label}</p>
                                    <p style={s.statValue}>{st.value}</p>
                                    <p style={s.statTrend}>{st.trend}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={s.tableCard}>
                        <h2 style={s.tableTitle}>Recent Patients</h2>
                        <table style={s.table}>
                            <thead>
                                <tr>
                                    {['Patient', 'Email', 'Pregnancy Week', 'Status', 'Actions'].map(h => <th key={h} style={s.th}>{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map((u, i) => (
                                    <tr key={i}>
                                        <td style={s.td}><strong>{u.name}</strong></td>
                                        <td style={s.td}>{u.email}</td>
                                        <td style={s.td}>Week {u.week}</td>
                                        <td style={s.td}><span style={s.statusBadge(u.status)}>{u.status}</span></td>
                                        <td style={s.td}><a href="#" style={{ color: '#7c3aed', fontWeight: '600', textDecoration: 'none', fontSize: '0.88rem' }}>View</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';

const Setttings = () => {
    const [notifications, setNotifications] = useState({ appointments: true, healthTips: true, messages: true, weeklyReports: false });
    const [privacy, setPrivacy] = useState({ shareData: false, analytics: true });
    const [saved, setSaved] = useState(false);

    const toggle = (group, key) => {
        if (group === 'notifications') setNotifications(p => ({ ...p, [key]: !p[key] }));
        else setPrivacy(p => ({ ...p, [key]: !p[key] }));
    };

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

    const s = {
        layout: { display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f7 0%, #ffe5ec 100%)', fontFamily: "'Inter', system-ui, sans-serif" },
        main: { marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' },
        content: { padding: '32px', flex: 1, maxWidth: '800px' },
        heading: { margin: '0 0 4px 0', fontSize: '1.75rem', fontWeight: '800', color: '#1a202c' },
        sub: { margin: '0 0 32px 0', fontSize: '1rem', color: '#718096' },
        card: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '24px', padding: '28px', boxShadow: '0 8px 32px rgba(251,111,146,0.08)', border: '1px solid rgba(255,255,255,0.6)', marginBottom: '24px' },
        cardTitle: { margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: '700', color: '#1a202c', display: 'flex', alignItems: 'center', gap: '10px' },
        row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid #edf2f7' },
        rowLast: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        label: { fontWeight: '600', color: '#2d3748', fontSize: '0.95rem' },
        labelSub: { fontSize: '0.82rem', color: '#a0aec0', marginTop: '2px' },
        toggle: (on) => ({ width: '48px', height: '26px', borderRadius: '13px', background: on ? 'linear-gradient(135deg,#ff8fab,#fb6f92)' : '#e2e8f0', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }),
        toggleDot: (on) => ({ position: 'absolute', top: '3px', left: on ? '24px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.3s' }),
        saveBtn: { padding: '14px 32px', borderRadius: '16px', background: saved ? '#38a169' : 'linear-gradient(135deg,#ff8fab,#fb6f92)', color: 'white', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(251,111,146,0.3)', fontFamily: "'Inter', system-ui, sans-serif", transition: 'background 0.3s' }
    };

    const notifItems = [
        { key: 'appointments', label: 'Appointment Reminders', sub: 'Get notified before your checkups' },
        { key: 'healthTips', label: 'Daily Health Tips', sub: 'Pregnancy insights sent each morning' },
        { key: 'messages', label: 'New Messages', sub: 'Alerts when doctors message you' },
        { key: 'weeklyReports', label: 'Weekly Reports', sub: 'Summary email every Sunday' }
    ];

    return (
        <div style={s.layout}>
            <Sidebar />
            <div style={s.main}>
                <DashboardNavbar />
                <div style={s.content}>
                    <h1 style={s.heading}>Settings</h1>
                    <p style={s.sub}>Manage your account preferences and notification settings.</p>

                    <div style={s.card}>
                        <h2 style={s.cardTitle}><span>🔔</span> Notifications</h2>
                        {notifItems.map((item, i) => (
                            <div key={item.key} style={i < notifItems.length - 1 ? s.row : s.rowLast}>
                                <div>
                                    <p style={s.label}>{item.label}</p>
                                    <p style={s.labelSub}>{item.sub}</p>
                                </div>
                                <button style={s.toggle(notifications[item.key])} onClick={() => toggle('notifications', item.key)}>
                                    <div style={s.toggleDot(notifications[item.key])} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={s.card}>
                        <h2 style={s.cardTitle}><span>🔒</span> Privacy</h2>
                        <div style={s.row}>
                            <div>
                                <p style={s.label}>Share Anonymous Data</p>
                                <p style={s.labelSub}>Help improve MamaCare by sharing anonymous health trends</p>
                            </div>
                            <button style={s.toggle(privacy.shareData)} onClick={() => toggle('privacy', 'shareData')}>
                                <div style={s.toggleDot(privacy.shareData)} />
                            </button>
                        </div>
                        <div style={s.rowLast}>
                            <div>
                                <p style={s.label}>Product Analytics</p>
                                <p style={s.labelSub}>Allow usage analytics to improve your experience</p>
                            </div>
                            <button style={s.toggle(privacy.analytics)} onClick={() => toggle('privacy', 'analytics')}>
                                <div style={s.toggleDot(privacy.analytics)} />
                            </button>
                        </div>
                    </div>

                    <div style={s.card}>
                        <h2 style={s.cardTitle}><span>🗑️</span> Danger Zone</h2>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ padding: '12px 20px', borderRadius: '12px', background: 'transparent', border: '2px solid #edf2f7', color: '#718096', fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif" }}>
                                Change Password
                            </button>
                            <button style={{ padding: '12px 20px', borderRadius: '12px', background: 'transparent', border: '2px solid rgba(229,62,62,0.3)', color: '#e53e3e', fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif" }}>
                                Delete Account
                            </button>
                        </div>
                    </div>

                    <button style={s.saveBtn} onClick={handleSave}>
                        {saved ? '✓ Saved!' : 'Save Preferences'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Setttings;

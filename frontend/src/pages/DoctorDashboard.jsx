import React, { useState } from 'react';

const todayAppointments = [
    { time: '09:00 AM', patient: 'Jane Doe', week: 24, type: 'Routine Checkup', status: 'Confirmed' },
    { time: '10:30 AM', patient: 'Amina Kofi', week: 12, type: 'First Trimester Scan', status: 'Confirmed' },
    { time: '12:00 PM', patient: 'Priya Sharma', week: 36, type: 'High Risk Review', status: 'Urgent' },
    { time: '2:00 PM', patient: 'Maria Santos', week: 8, type: 'Initial Consultation', status: 'Pending' }
];

const patientNotes = [
    { name: 'Jane Doe', note: 'BP slightly elevated last visit. Monitor closely.', flag: 'yellow' },
    { name: 'Priya Sharma', note: 'Gestational diabetes confirmed. Refer to nutritionist.', flag: 'red' },
    { name: 'Amina Kofi', note: 'Everything looks healthy. Continue prenatal vitamins.', flag: 'green' }
];

const DoctorDashboard = () => {
    const [activeTab, setActiveTab] = useState('appointments');

    const s = {
        layout: { display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', fontFamily: "'Inter', system-ui, sans-serif" },
        sidebar: { width: '280px', height: '100vh', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(14,165,233,0.15)', display: 'flex', flexDirection: 'column', padding: '24px 0', position: 'fixed', left: 0, top: 0, boxSizing: 'border-box' },
        logo: { fontSize: '1.4rem', fontWeight: '800', color: '#0284c7', padding: '0 32px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' },
        menu: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' },
        menuItem: (active) => ({ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 24px', borderRadius: '14px', cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem', color: active ? '#0284c7' : '#718096', background: active ? 'rgba(2,132,199,0.08)' : 'transparent', border: 'none', textAlign: 'left', width: '100%', fontFamily: "'Inter', system-ui, sans-serif" }),
        main: { marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' },
        navbar: { padding: '16px 32px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(14,165,233,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        content: { padding: '32px', flex: 1 },
        statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '28px' },
        statCard: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderRadius: '18px', padding: '22px', boxShadow: '0 4px 20px rgba(14,165,233,0.07)', border: '1px solid rgba(255,255,255,0.7)' },
        statValue: { margin: '0 0 4px 0', fontSize: '1.75rem', fontWeight: '800', color: '#0c4a6e' },
        statLabel: { margin: 0, fontSize: '0.82rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' },
        card: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '24px', padding: '28px', boxShadow: '0 8px 32px rgba(14,165,233,0.08)', border: '1px solid rgba(255,255,255,0.6)', marginBottom: '24px' },
        cardTitle: { margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: '700', color: '#0c4a6e' },
        apptRow: { display: 'flex', alignItems: 'center', gap: '20px', padding: '16px 0', borderBottom: '1px solid #f0f9ff' },
        timeBox: { width: '90px', fontSize: '0.88rem', fontWeight: '700', color: '#0284c7', flexShrink: 0 },
        statusBadge: (status) => ({ padding: '4px 12px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: '700', background: status === 'Confirmed' ? 'rgba(2,132,199,0.1)' : status === 'Urgent' ? 'rgba(229,62,62,0.1)' : '#f0fdf4', color: status === 'Confirmed' ? '#0284c7' : status === 'Urgent' ? '#e53e3e' : '#16a34a', marginLeft: 'auto', flexShrink: 0 }),
        flagDot: (flag) => ({ width: '10px', height: '10px', borderRadius: '50%', background: flag === 'red' ? '#e53e3e' : flag === 'yellow' ? '#d97706' : '#38a169', flexShrink: 0 })
    };

    return (
        <div style={s.layout}>
            <aside style={s.sidebar}>
                <div style={s.logo}><span>👨‍⚕️</span> Doctor Portal</div>
                <nav style={s.menu}>
                    {[{ icon: '📊', label: 'Overview' }, { icon: '📅', label: 'Appointments' }, { icon: '👩‍🦰', label: 'Patients' }, { icon: '📝', label: 'Notes' }, { icon: '💬', label: 'Messages' }, { icon: '⚙️', label: 'Settings' }].map((item, i) => (
                        <button key={i} style={s.menuItem(i === 0)} onClick={() => {}}><span>{item.icon}</span>{item.label}</button>
                    ))}
                </nav>
            </aside>
            <div style={s.main}>
                <div style={s.navbar}>
                    <span style={{ fontWeight: '700', color: '#0c4a6e' }}>Dr. Amara Osei</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Obstetrician · GH-MED-4521</span>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#0284c7,#38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>AO</div>
                    </div>
                </div>
                <div style={s.content}>
                    <div style={s.statsRow}>
                        {[{ label: "Today's Patients", value: '4' }, { label: 'This Week', value: '22' }, { label: 'Urgent Cases', value: '1' }, { label: 'Pending Reviews', value: '3' }].map((st, i) => (
                            <div key={i} style={s.statCard}>
                                <p style={s.statValue}>{st.value}</p>
                                <p style={s.statLabel}>{st.label}</p>
                            </div>
                        ))}
                    </div>

                    <div style={s.card}>
                        <h2 style={s.cardTitle}>Today's Schedule</h2>
                        {todayAppointments.map((appt, i) => (
                            <div key={i} style={{ ...s.apptRow, borderBottom: i < todayAppointments.length - 1 ? '1px solid #f0f9ff' : 'none' }}>
                                <div style={s.timeBox}>{appt.time}</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: '0 0 2px 0', fontWeight: '700', color: '#0c4a6e', fontSize: '0.95rem' }}>{appt.patient}</p>
                                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>{appt.type} · Week {appt.week}</p>
                                </div>
                                <span style={s.statusBadge(appt.status)}>{appt.status}</span>
                            </div>
                        ))}
                    </div>

                    <div style={s.card}>
                        <h2 style={s.cardTitle}>Patient Notes & Flags</h2>
                        {patientNotes.map((n, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px 0', borderBottom: i < patientNotes.length - 1 ? '1px solid #f0f9ff' : 'none' }}>
                                <div style={s.flagDot(n.flag)} />
                                <div>
                                    <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: '#0c4a6e', fontSize: '0.95rem' }}>{n.name}</p>
                                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>{n.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;

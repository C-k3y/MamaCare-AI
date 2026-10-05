import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import API_ROUTES from '../constants/apiRoutes';

const DoctorDashboard = () => {
    const { token, user } = useAuth();
    const [activeTab, setActiveTab] = useState('appointments');
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [patientNotes, setPatientNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Fallback static stats for UI
    const [stats, setStats] = useState([
        { label: "Today's Patients", value: '0' },
        { label: 'This Week', value: '0' },
        { label: 'Urgent Cases', value: '0' },
        { label: 'Pending Reviews', value: '0' }
    ]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch Upcoming Appointments
                const appts = await appointmentService.getUpcoming(token);
                // Map API data to UI format
                const formattedAppts = appts.map(appt => ({
                    time: new Date(appt.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    patient: appt.mother_name || 'Unknown Patient',
                    week: appt.week || '-', // Assuming the API returns a week or we default it
                    type: appt.type || 'Consultation',
                    status: appt.status === 'scheduled' ? 'Confirmed' : appt.status
                }));
                setTodayAppointments(formattedAppts);
                setStats(prev => {
                    const newStats = [...prev];
                    newStats[0].value = formattedAppts.length.toString();
                    return newStats;
                });

                // Fetch Vitals (as Patient Notes)
                const vitalsRes = await fetch(API_ROUTES.RECORDS.VITALS, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (vitalsRes.ok) {
                    const vitalsData = await vitalsRes.json();
                    const formattedNotes = vitalsData.map(v => ({
                        name: `Pregnancy #${v.pregnancy}`, 
                        note: `BP: ${v.blood_pressure_systolic}/${v.blood_pressure_diastolic}, FHR: ${v.fetal_heart_rate_bpm} BPM. ${v.notes}`,
                        flag: v.fetal_heart_rate_bpm && (v.fetal_heart_rate_bpm < 110 || v.fetal_heart_rate_bpm > 160) ? 'red' : 'green'
                    }));
                    setPatientNotes(formattedNotes);
                }

            } catch (error) {
                console.error("Failed to fetch doctor dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchDashboardData();
        }
    }, [token]);

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
        flagDot: (flag) => ({ width: '10px', height: '10px', borderRadius: '50%', background: flag === 'red' ? '#e53e3e' : flag === 'yellow' ? '#d97706' : '#38a169', flexShrink: 0 }),
        emptyState: { padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '0.95rem' }
    };

    return (
        <div style={s.layout}>
            <aside style={s.sidebar}>
                <div style={s.logo}><span>⚕️</span> Doctor Portal</div>
                <nav style={s.menu}>
                    {[{ icon: '📊', label: 'Overview' }, { icon: '📅', label: 'Appointments' }, { icon: '👩🏽‍🍼', label: 'Patients' }, { icon: '📝', label: 'Notes' }, { icon: '💬', label: 'Messages' }, { icon: '⚙️', label: 'Settings' }].map((item, i) => (
                        <button key={i} style={s.menuItem(i === 0)} onClick={() => {}}><span>{item.icon}</span>{item.label}</button>
                    ))}
                </nav>
            </aside>
            <div style={s.main}>
                <div style={s.navbar}>
                    <span style={{ fontWeight: '700', color: '#0c4a6e' }}>Dr. {user?.first_name || user?.name || 'Doctor'}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Obstetrician</span>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#0284c7,#38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>DR</div>
                    </div>
                </div>
                <div style={s.content}>
                    <div style={s.statsRow}>
                        {stats.map((st, i) => (
                            <div key={i} style={s.statCard}>
                                <p style={s.statValue}>{st.value}</p>
                                <p style={s.statLabel}>{st.label}</p>
                            </div>
                        ))}
                    </div>

                    <div style={s.card}>
                        <h2 style={s.cardTitle}>Today's Schedule</h2>
                        {loading ? (
                            <div style={s.emptyState}>Loading appointments...</div>
                        ) : todayAppointments.length === 0 ? (
                            <div style={s.emptyState}>No appointments scheduled for today.</div>
                        ) : (
                            todayAppointments.map((appt, i) => (
                                <div key={i} style={{ ...s.apptRow, borderBottom: i < todayAppointments.length - 1 ? '1px solid #f0f9ff' : 'none' }}>
                                    <div style={s.timeBox}>{appt.time}</div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: '0 0 2px 0', fontWeight: '700', color: '#0c4a6e', fontSize: '0.95rem' }}>{appt.patient}</p>
                                        <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>{appt.type} · Week {appt.week}</p>
                                    </div>
                                    <span style={s.statusBadge(appt.status)}>{appt.status}</span>
                                </div>
                            ))
                        )}
                    </div>

                    <div style={s.card}>
                        <h2 style={s.cardTitle}>Patient Notes & Flags (Vitals)</h2>
                        {loading ? (
                            <div style={s.emptyState}>Loading vitals...</div>
                        ) : patientNotes.length === 0 ? (
                            <div style={s.emptyState}>No recent vitals or notes recorded.</div>
                        ) : (
                            patientNotes.map((n, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px 0', borderBottom: i < patientNotes.length - 1 ? '1px solid #f0f9ff' : 'none' }}>
                                    <div style={s.flagDot(n.flag)} />
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: '#0c4a6e', fontSize: '0.95rem' }}>{n.name}</p>
                                        <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>{n.note}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;

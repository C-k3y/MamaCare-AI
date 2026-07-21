import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import AppointmentCard from '../components/appointments/AppointmentCard';
import AppointmentModal from '../components/appointments/AppointmentModal';
import Calendar from '../components/appointments/Calendar';
import DoctorCard from '../components/appointments/DoctorCard';

const Appointments = () => {
    const styles = {
        layout: {
            display: 'flex',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fff5f7 0%, #ffe5ec 100%)',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        main: {
            marginLeft: '280px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        },
        content: {
            padding: '32px',
            flex: 1
        },
        pageHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
        },
        heading: {
            margin: 0,
            fontSize: '1.75rem',
            fontWeight: '800',
            color: '#1a202c'
        },
        newApptBtn: {
            padding: '12px 24px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)',
            color: 'white',
            border: 'none',
            fontWeight: '700',
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(251, 111, 146, 0.35)',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        gridLayout: {
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '24px',
            alignItems: 'start'
        },
        sectionTitle: {
            margin: '0 0 16px 0',
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#2d3748'
        },
        card: {
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(251, 111, 146, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            marginBottom: '24px'
        }
    };

    const upcomingAppointments = [
        { doctorName: 'Dr. Amara Osei', specialty: 'Obstetrician & Gynecologist', date: 'Jul 25, 2026', time: '10:30 AM', status: 'Upcoming' },
        { doctorName: 'Dr. Lena Fischer', specialty: 'Midwife Specialist', date: 'Aug 2, 2026', time: '2:00 PM', status: 'Upcoming' },
    ];

    const pastAppointments = [
        { doctorName: 'Dr. Samuel Mensah', specialty: 'Nutritionist', date: 'Jul 10, 2026', time: '9:00 AM', status: 'Completed' },
    ];

    return (
        <div style={styles.layout}>
            <Sidebar activeTab="appointments" />
            <div style={styles.main}>
                <DashboardNavbar />
                <div style={styles.content}>
                    <div style={styles.pageHeader}>
                        <h1 style={styles.heading}>My Appointments</h1>
                        <button style={styles.newApptBtn}>+ Book Appointment</button>
                    </div>

                    <div style={styles.gridLayout}>
                        <div>
                            <div style={styles.card}>
                                <h2 style={styles.sectionTitle}>Upcoming</h2>
                                {upcomingAppointments.map((appt, i) => (
                                    <AppointmentCard key={i} {...appt} />
                                ))}
                            </div>
                            <div style={styles.card}>
                                <h2 style={styles.sectionTitle}>Past Appointments</h2>
                                {pastAppointments.map((appt, i) => (
                                    <AppointmentCard key={i} {...appt} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <Calendar />
                            <div style={{ marginTop: '24px' }}>
                                <DoctorCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointments;

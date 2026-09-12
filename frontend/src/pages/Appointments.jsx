import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import AppointmentCard from '../components/appointments/AppointmentCard';
import AppointmentModal from '../components/appointments/AppointmentModal';
import Calendar from '../components/appointments/Calendar';
import DoctorCard from '../components/appointments/DoctorCard';
import { appointmentApi } from '../api/appointmentApi';

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

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const upcomingRes = await appointmentApi.getUpcoming();
                setUpcomingAppointments(upcomingRes.data);

                const historyRes = await appointmentApi.getHistory();
                setPastAppointments(historyRes.data);
            } catch (error) {
                console.error("Failed to fetch appointments", error);
            }
        };
        fetchAppointments();
    }, []);

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
                                {upcomingAppointments.length === 0 ? <p>No upcoming appointments.</p> : upcomingAppointments.map((appt, i) => {
                                    const dateObj = new Date(appt.date_time);
                                    return (
                                        <AppointmentCard 
                                            key={i} 
                                            doctorName={appt.doctor_details ? `Dr. ${appt.doctor_details.first_name} ${appt.doctor_details.last_name}` : 'Unassigned'} 
                                            specialty={appt.type === 'video' ? 'Telemedicine' : 'In Person'} 
                                            date={dateObj.toLocaleDateString()} 
                                            time={dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
                                            status={appt.status} 
                                        />
                                    );
                                })}
                            </div>
                            <div style={styles.card}>
                                <h2 style={styles.sectionTitle}>Past Appointments</h2>
                                {pastAppointments.length === 0 ? <p>No past appointments.</p> : pastAppointments.map((appt, i) => {
                                    const dateObj = new Date(appt.date_time);
                                    return (
                                        <AppointmentCard 
                                            key={i} 
                                            doctorName={appt.doctor_details ? `Dr. ${appt.doctor_details.first_name} ${appt.doctor_details.last_name}` : 'Unassigned'} 
                                            specialty={appt.type === 'video' ? 'Telemedicine' : 'In Person'} 
                                            date={dateObj.toLocaleDateString()} 
                                            time={dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
                                            status={appt.status} 
                                        />
                                    );
                                })}
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

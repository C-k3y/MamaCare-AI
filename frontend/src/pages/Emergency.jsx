import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import SOSButton from '../components/emergency/SOSButton';
import EmergencyContacts from '../components/emergency/EmergencyContacts';
import HospitalMap from '../components/emergency/HospitalMap';
import AmbulanceCard from '../components/emergency/AmbulanceCard';
import { emergencyApi } from '../api/emergencyApi';

const Emergency = () => {
    const [contacts, setContacts] = useState([]);
    const [loadingSOS, setLoadingSOS] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await emergencyApi.getContacts();
                setContacts(res.data);
            } catch (err) {
                console.error("Failed to fetch contacts", err);
            }
        };
        fetchContacts();
    }, []);

    const handleSOS = () => {
        setLoadingSOS(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        await emergencyApi.trigger({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                        alert('🚨 Emergency services and your contacts have been notified with your location. Help is on the way!');
                    } catch (err) {
                        alert('Error triggering SOS. Please call 911 immediately.');
                    } finally {
                        setLoadingSOS(false);
                    }
                },
                async (error) => {
                    console.warn("Geolocation denied/failed. Sending SOS without precise location.");
                    try {
                        await emergencyApi.trigger({});
                        alert('🚨 Emergency services have been notified. Help is on the way!');
                    } catch (err) {
                        alert('Error triggering SOS. Please call 911 immediately.');
                    } finally {
                        setLoadingSOS(false);
                    }
                }
            );
        } else {
            // Geolocation not supported
            emergencyApi.trigger({}).then(() => {
                alert('🚨 Emergency services have been notified. Help is on the way!');
            }).catch(() => {
                alert('Error triggering SOS. Please call 911 immediately.');
            }).finally(() => {
                setLoadingSOS(false);
            });
        }
    };

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
            marginBottom: '32px'
        },
        heading: {
            margin: '0 0 4px 0',
            fontSize: '1.75rem',
            fontWeight: '800',
            color: '#1a202c'
        },
        subheading: {
            margin: 0,
            fontSize: '1rem',
            color: '#718096'
        },
        sosBanner: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(229, 62, 62, 0.1)',
            border: '1px solid rgba(229, 62, 62, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
            marginBottom: '24px'
        },
        sosBannerText: {
            flex: 1
        },
        sosBannerHeading: {
            margin: '0 0 8px 0',
            fontSize: '1.4rem',
            fontWeight: '800',
            color: '#1a202c'
        },
        sosBannerDesc: {
            margin: 0,
            fontSize: '0.95rem',
            color: '#718096',
            lineHeight: '1.5'
        },
        gridLayout: {
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '24px',
            alignItems: 'start'
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar activeTab="emergency" />
            <div style={styles.main}>
                <DashboardNavbar />
                <div style={styles.content}>
                    <div style={styles.pageHeader}>
                        <h1 style={styles.heading}>Emergency Services</h1>
                        <p style={styles.subheading}>Your safety is our top priority. Reach help instantly.</p>
                    </div>

                    <div style={styles.sosBanner}>
                        <div style={styles.sosBannerText}>
                            <h2 style={styles.sosBannerHeading}>In an Emergency?</h2>
                            <p style={styles.sosBannerDesc}>
                                Press the SOS button to instantly alert emergency services and your emergency contacts. Your GPS location will be shared automatically.
                            </p>
                        </div>
                        <SOSButton onTrigger={handleSOS} disabled={loadingSOS} />
                    </div>

                    <div style={styles.gridLayout}>
                        <div>
                            <HospitalMap />
                            <div style={{ marginTop: '24px' }}>
                                <AmbulanceCard />
                            </div>
                        </div>
                        <div>
                            <EmergencyContacts contacts={contacts} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Emergency;

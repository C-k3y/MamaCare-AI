import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import UserProfile from '../components/profile/UserProfile';
import MedicalHistory from '../components/profile/MedicalHistory';
import PregnancyInfo from '../components/profile/PregnancyInfo';

const Profile = () => {
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
        gridLayout: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            alignItems: 'start'
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar activeTab="profile" />
            <div style={styles.main}>
                <DashboardNavbar />
                <div style={styles.content}>
                    <div style={styles.pageHeader}>
                        <h1 style={styles.heading}>My Profile</h1>
                        <p style={styles.subheading}>Manage your personal and health information.</p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <UserProfile />
                    </div>
                    <div style={styles.gridLayout}>
                        <PregnancyInfo />
                        <MedicalHistory />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import PregnancyProgress from '../components/pregnancy/PregnancyProgress';
import BabyGrowth from '../components/pregnancy/BabyGrowth';
import KickCounter from '../components/pregnancy/KickCounter';
import WeightTracker from '../components/pregnancy/WeightTracker';
import WeeklyTips from '../components/pregnancy/WeeklyTips';
import BloodPressureCard from '../components/pregnancy/BloodPressureCard';

const PregnancyTracker = () => {
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
            gridTemplateColumns: '1fr 340px',
            gap: '24px',
            alignItems: 'start'
        },
        twoCol: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '24px'
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar activeTab="pregnancy" />
            <div style={styles.main}>
                <DashboardNavbar />
                <div style={styles.content}>
                    <div style={styles.pageHeader}>
                        <h1 style={styles.heading}>Pregnancy Tracker</h1>
                        <p style={styles.subheading}>You're at Week 24 · 2nd Trimester · 112 days to go!</p>
                    </div>

                    <div style={styles.gridLayout}>
                        <div>
                            <div style={{ marginBottom: '24px' }}>
                                <PregnancyProgress currentWeek={24} totalWeeks={40} />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <BabyGrowth />
                            </div>
                            <div style={styles.twoCol}>
                                <BloodPressureCard />
                                <WeightTracker />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <KickCounter />
                            <WeeklyTips />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PregnancyTracker;

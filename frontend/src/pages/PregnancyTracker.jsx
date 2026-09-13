import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import PregnancyProgress from '../components/pregnancy/PregnancyProgress';
import BabyGrowth from '../components/pregnancy/BabyGrowth';
import KickCounter from '../components/pregnancy/KickCounter';
import WeightTracker from '../components/pregnancy/WeightTracker';
import WeeklyTips from '../components/pregnancy/WeeklyTips';
import BloodPressureCard from '../components/pregnancy/BloodPressureCard';
import LogVitalsModal from '../components/pregnancy/LogVitalsModal';
import { recordsApi } from '../api/recordsApi';

const PregnancyTracker = () => {
    const [pregnancy, setPregnancy] = useState(null);
    const [vitals, setVitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const pregRes = await recordsApi.getPregnancies();
            if (pregRes.data && pregRes.data.length > 0) {
                setPregnancy(pregRes.data[0]);
            }
            const vitalsRes = await recordsApi.getVitals();
            if (vitalsRes.data) {
                setVitals(vitalsRes.data);
            }
        } catch (error) {
            console.error("Failed to fetch records", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleVitalsLogged = () => {
        fetchData();
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
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
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
        logBtn: {
            padding: '10px 20px',
            borderRadius: '12px',
            background: '#fb6f92',
            color: 'white',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(251, 111, 146, 0.3)'
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

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading tracker...</div>;
    }

    const currentWeek = pregnancy?.gestational_age_weeks || 1;
    const trimester = pregnancy?.trimester || 1;

    return (
        <div style={styles.layout}>
            <Sidebar activeTab="pregnancy" />
            <div style={styles.main}>
                <DashboardNavbar />
                <div style={styles.content}>
                    <div style={styles.pageHeader}>
                        <div>
                            <h1 style={styles.heading}>Pregnancy Tracker</h1>
                            <p style={styles.subheading}>
                                You're at Week {currentWeek} · {trimester === 1 ? '1st' : trimester === 2 ? '2nd' : '3rd'} Trimester 
                                {pregnancy?.edd ? ` · EDD: ${new Date(pregnancy.edd).toLocaleDateString()}` : ''}
                            </p>
                        </div>
                        <button style={styles.logBtn} onClick={() => setIsModalOpen(true)}>+ Log Vitals</button>
                    </div>

                    <LogVitalsModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        pregnancyId={pregnancy?.id} 
                        onVitalsLogged={handleVitalsLogged} 
                    />

                    <div style={styles.gridLayout}>
                        <div>
                            <div style={{ marginBottom: '24px' }}>
                                <PregnancyProgress currentWeek={currentWeek} totalWeeks={40} />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <BabyGrowth />
                            </div>
                            <div style={styles.twoCol}>
                                <BloodPressureCard vitals={vitals} />
                                <WeightTracker vitals={vitals} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <KickCounter vitals={vitals} />
                            <WeeklyTips />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PregnancyTracker;

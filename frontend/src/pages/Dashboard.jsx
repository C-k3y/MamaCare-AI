import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import StatsCard from '../components/dashboard/StatsCard';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import ReminderCard from '../components/dashboard/ReminderCard';
import RiskCard from '../components/dashboard/RiskCard';
import HealthChart from '../components/dashboard/HealthChart';
import { aiApi } from '../api/aiApi';
import { appointmentApi } from '../api/appointmentApi';

const Dashboard = () => {
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
        greeting: {
            margin: '0 0 4px 0',
            fontSize: '1.75rem',
            fontWeight: '800',
            color: '#1a202c'
        },
        greetingSub: {
            margin: 0,
            fontSize: '1rem',
            color: '#718096'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
        },
        bottomGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '32px'
        },
        threeColGrid: {
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '20px'
        }
    };

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    const [riskData, setRiskData] = useState(null);
    const [riskHistory, setRiskHistory] = useState([]);
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await aiApi.getRisks();
                if (response.data && response.data.length > 0) {
                    setRiskData(response.data[0]);
                    const history = response.data.slice(0, 7).reverse();
                    setRiskHistory(history);
                }
                
                const remRes = await appointmentApi.getReminders();
                if (remRes.data) setReminders(remRes.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={styles.layout}>
            <Sidebar activeTab="dashboard" />
            <div style={styles.main}>
                <DashboardNavbar />
                <div style={styles.content}>
                    <div style={styles.pageHeader}>
                        <h1 style={styles.greeting}>Good morning, Jane 👋</h1>
                        <p style={styles.greetingSub}>{today} · Week 24 of your pregnancy</p>
                    </div>

                    <div style={styles.statsGrid}>
                        <StatsCard title="Baby's Heartbeat" value="148" unit="bpm" trend={2} icon="❤️" />
                        <StatsCard title="Weight" value="68.5" unit="kg" trend={-1} icon="⚖️" />
                        <StatsCard title="Blood Pressure" value="118/75" unit="mmHg" trend={0} icon="🩺" />
                        <StatsCard title="Steps Today" value="4,230" unit="steps" trend={12} icon="👣" />
                    </div>

                    <div style={styles.threeColGrid}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <HealthChart 
                                title="Risk Score Trend"
                                data={riskHistory.length > 0 ? riskHistory.map(r => r.risk_score * 100) : undefined}
                                labels={riskHistory.length > 0 ? riskHistory.map(r => new Date(r.created_at).toLocaleDateString('en-US', {weekday: 'short'})) : undefined}
                            />
                            <ActivityTimeline />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <RiskCard 
                                title="AI Risk Assessment" 
                                level={riskData ? riskData.risk_level : 'low'} 
                                description={
                                    riskData 
                                    ? `Risk Score: ${(riskData.risk_score * 100).toFixed(1)}%. Model: ${riskData.model_version}.`
                                    : "Analyzing latest vitals to determine risk profile..."
                                } 
                            />
                            {reminders.length === 0 ? <ReminderCard title="No reminders" time="" /> : reminders.map((rem, i) => (
                                <ReminderCard 
                                    key={i} 
                                    title={`Take ${rem.dosage} ${rem.medication_name}`} 
                                    time={rem.time_of_day} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

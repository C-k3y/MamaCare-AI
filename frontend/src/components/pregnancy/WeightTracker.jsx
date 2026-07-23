import React from 'react';

const WeightTracker = ({ currentWeight = 145, startingWeight = 138, unit = 'lbs' }) => {
    const gained = currentWeight - startingWeight;
    const isHealthyGain = gained >= 0 && gained <= 10; // Mock logic for demo

    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
        },
        title: {
            margin: 0,
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        chartArea: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            height: '100px',
            borderBottom: '2px solid #edf2f7',
            paddingBottom: '16px',
            marginBottom: '20px'
        },
        nodeCol: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
        },
        nodeVal: {
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '800',
            color: '#2d3748'
        },
        nodePoint: (active) => ({
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: active ? '#fb6f92' : '#cbd5e0',
            border: '4px solid white',
            boxShadow: active ? '0 0 0 2px #fb6f92' : 'none',
            zIndex: 2
        }),
        nodeLabel: {
            margin: 0,
            fontSize: '0.75rem',
            color: '#718096',
            fontWeight: '600',
            textTransform: 'uppercase'
        },
        footer: {
            background: isHealthyGain ? '#f0fff4' : '#fff5f5',
            padding: '12px',
            borderRadius: '12px',
            textAlign: 'center',
            color: isHealthyGain ? '#2f855a' : '#c53030',
            fontSize: '0.9rem',
            fontWeight: '600'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Weight Tracker</h3>
            </div>
            
            <div style={styles.chartArea}>
                <div style={styles.nodeCol}>
                    <p style={styles.nodeVal}>{startingWeight}</p>
                    <div style={styles.nodePoint(false)}></div>
                    <p style={styles.nodeLabel}>Start</p>
                </div>
                
                {/* Mock connection line */}
                <div style={{ height: '2px', background: '#e2e8f0', flex: 1, marginBottom: '25px', margin: '0 -20px' }}></div>
                
                <div style={styles.nodeCol}>
                    <p style={styles.nodeVal}>{currentWeight}</p>
                    <div style={styles.nodePoint(true)}></div>
                    <p style={styles.nodeLabel}>Current</p>
                </div>
            </div>
            
            <div style={styles.footer}>
                Total gained: {gained > 0 ? '+' : ''}{gained} {unit}
            </div>
        </div>
    );
};
export default WeightTracker;

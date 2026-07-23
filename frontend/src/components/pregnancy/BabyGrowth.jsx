import React from 'react';

const BabyGrowth = ({ week = 15, size = 'Apple', length = '10.1 cm', weight = '70 g' }) => {
    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
        },
        header: {
            margin: '0 0 16px 0',
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#2d3748'
        },
        imageBox: {
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffe5ec 0%, #ffc2d1 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4rem',
            marginBottom: '16px',
            boxShadow: '0 4px 15px rgba(251, 111, 146, 0.2)'
        },
        mainText: {
            margin: '0 0 8px 0',
            fontSize: '1.1rem',
            color: '#4a5568',
            fontWeight: '600'
        },
        highlight: {
            color: '#fb6f92',
            fontWeight: '800'
        },
        statsRow: {
            display: 'flex',
            gap: '24px',
            marginTop: '16px',
            background: '#f8fafc',
            padding: '12px 24px',
            borderRadius: '16px',
            width: '100%',
            boxSizing: 'border-box',
            justifyContent: 'center'
        },
        statCol: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        statLabel: {
            margin: 0,
            fontSize: '0.75rem',
            color: '#a0aec0',
            fontWeight: '600',
            textTransform: 'uppercase'
        },
        statValue: {
            margin: '4px 0 0 0',
            fontSize: '1rem',
            fontWeight: '700',
            color: '#2d3748'
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.header}>Week {week}</h3>
            
            <div style={styles.imageBox}>
                🍎 {/* This can be dynamically based on 'size' prop later */}
            </div>
            
            <p style={styles.mainText}>
                Your baby is the size of an <span style={styles.highlight}>{size}</span>!
            </p>
            
            <div style={styles.statsRow}>
                <div style={styles.statCol}>
                    <p style={styles.statLabel}>Length</p>
                    <p style={styles.statValue}>{length}</p>
                </div>
                <div style={styles.statCol}>
                    <p style={styles.statLabel}>Weight</p>
                    <p style={styles.statValue}>{weight}</p>
                </div>
            </div>
        </div>
    );
};
export default BabyGrowth;

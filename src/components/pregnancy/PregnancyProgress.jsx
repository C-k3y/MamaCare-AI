import React from 'react';

const PregnancyProgress = ({ currentWeek = 15, totalWeeks = 40 }) => {
    const percentage = Math.min((currentWeek / totalWeeks) * 100, 100);
    const trimester = currentWeek <= 13 ? 1 : currentWeek <= 26 ? 2 : 3;

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
            marginBottom: '16px'
        },
        title: {
            margin: 0,
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        badge: {
            padding: '6px 12px',
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            color: 'white',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase'
        },
        progressBarBg: {
            height: '16px',
            background: '#edf2f7',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '12px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
        },
        progressBarFill: {
            height: '100%',
            background: 'linear-gradient(90deg, #ff8fab 0%, #fb6f92 100%)',
            width: `${percentage}%`,
            transition: 'width 1s ease-in-out',
            borderRadius: '8px'
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            color: '#718096',
            fontWeight: '600'
        },
        daysLeft: {
            color: '#2d3748',
            fontWeight: '700'
        }
    };

    const daysRemaining = (totalWeeks - currentWeek) * 7;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Journey Progress</h3>
                <span style={styles.badge}>Trimester {trimester}</span>
            </div>
            
            <div style={styles.progressBarBg}>
                <div style={styles.progressBarFill}></div>
            </div>
            
            <div style={styles.footer}>
                <span>Week {currentWeek} of {totalWeeks}</span>
                <span style={styles.daysLeft}>{daysRemaining} days to go!</span>
            </div>
        </div>
    );
};
export default PregnancyProgress;

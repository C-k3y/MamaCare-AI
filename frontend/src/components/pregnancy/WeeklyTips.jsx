import React from 'react';

const WeeklyTips = ({ tip = "It's normal to feel more fatigued this week. Make sure you are taking time to rest and staying hydrated." }) => {
    const styles = {
        container: {
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(251, 111, 146, 0.3)',
            color: 'white',
            fontFamily: "'Inter', system-ui, sans-serif",
            display: 'flex',
            gap: '16px'
        },
        iconBox: {
            fontSize: '2rem'
        },
        content: {
            flex: 1
        },
        title: {
            margin: '0 0 8px 0',
            fontSize: '1.1rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        text: {
            margin: 0,
            fontSize: '0.95rem',
            lineHeight: '1.5',
            opacity: 0.95
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.iconBox}>💡</div>
            <div style={styles.content}>
                <h4 style={styles.title}>Doctor's Tip</h4>
                <p style={styles.text}>{tip}</p>
            </div>
        </div>
    );
};
export default WeeklyTips;

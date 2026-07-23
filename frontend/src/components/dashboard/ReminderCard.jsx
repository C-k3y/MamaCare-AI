import React from 'react';

const ReminderCard = ({ title, time, type = 'medication' }) => {
    const typeStyles = {
        medication: { bg: '#ebf8ff', color: '#3182ce', icon: '💊' },
        appointment: { bg: '#faf5ff', color: '#805ad5', icon: '📅' },
        hydration: { bg: '#e6fffa', color: '#319795', icon: '💧' },
        activity: { bg: '#fff5f5', color: '#e53e3e', icon: '🏃‍♀️' },
        default: { bg: '#ffe5ec', color: '#fb6f92', icon: '✨' }
    };

    const theme = typeStyles[type] || typeStyles.default;

    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '12px',
            transition: 'background 0.2s'
        },
        iconBox: {
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: theme.bg,
            color: theme.color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.25rem'
        },
        content: {
            flex: 1
        },
        title: {
            margin: '0 0 4px 0',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#2d3748'
        },
        time: {
            margin: 0,
            fontSize: '0.85rem',
            color: '#718096'
        },
        checkButton: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid #e2e8f0',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.2s',
            outline: 'none'
        }
    };

    return (
        <div 
            style={styles.container}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)'}
        >
            <div style={styles.iconBox}>{theme.icon}</div>
            <div style={styles.content}>
                <h4 style={styles.title}>{title}</h4>
                <p style={styles.time}>{time}</p>
            </div>
            <button 
                style={styles.checkButton}
                onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#38a169';
                    e.currentTarget.style.background = '#f0fff4';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.background = 'transparent';
                }}
                onClick={(e) => {
                    e.currentTarget.style.background = '#38a169';
                    e.currentTarget.style.borderColor = '#38a169';
                }}
            />
        </div>
    );
};
export default ReminderCard;

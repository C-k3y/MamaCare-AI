import React from 'react';

const RiskCard = ({ title, level = 'low', description }) => {
    const riskLevels = {
        low: { color: '#38a169', bg: '#f0fff4', label: 'Low Risk', border: '#c6f6d5' },
        medium: { color: '#dd6b20', bg: '#fffaf0', label: 'Moderate Risk', border: '#feebc8' },
        high: { color: '#e53e3e', bg: '#fff5f5', label: 'High Risk', border: '#fed7d7' }
    };
    
    const theme = riskLevels[level] || riskLevels.low;

    const styles = {
        container: {
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: `1px solid ${theme.border}`,
            fontFamily: "'Inter', system-ui, sans-serif",
            position: 'relative',
            overflow: 'hidden'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
        },
        title: {
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        badge: {
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            background: theme.bg,
            color: theme.color
        },
        description: {
            margin: 0,
            fontSize: '0.9rem',
            color: '#4a5568',
            lineHeight: '1.5'
        },
        accent: {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: theme.color
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.accent}></div>
            <div style={styles.header}>
                <h3 style={styles.title}>{title}</h3>
                <span style={styles.badge}>{theme.label}</span>
            </div>
            <p style={styles.description}>{description}</p>
        </div>
    );
};
export default RiskCard;

import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
    const colors = {
        info: { bg: '#ebf8ff', border: '#90cdf4', text: '#2b6cb0' },
        success: { bg: '#f0fff4', border: '#9ae6b4', text: '#2f855a' },
        warning: { bg: '#fffff0', border: '#faf089', text: '#b7791f' },
        error: { bg: '#fff5f5', border: '#feb2b2', text: '#c53030' }
    };
    
    const theme = colors[type] || colors.info;

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            backgroundColor: theme.bg,
            borderLeft: `4px solid ${theme.text}`,
            borderRadius: '8px',
            color: theme.text,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.95rem',
            marginBottom: '16px'
        },
        closeBtn: {
            background: 'none',
            border: 'none',
            color: theme.text,
            fontSize: '1.2rem',
            cursor: 'pointer',
            opacity: 0.7
        }
    };

    return (
        <div style={styles.container}>
            <span>{message}</span>
            {onClose && (
                <button style={styles.closeBtn} onClick={onClose}>&times;</button>
            )}
        </div>
    );
};
export default Alert;

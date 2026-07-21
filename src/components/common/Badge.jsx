import React from 'react';

const Badge = ({ children, variant = 'primary' }) => {
    const variants = {
        primary: { bg: '#ffe5ec', color: '#fb6f92' },
        success: { bg: '#f0fff4', color: '#38a169' },
        warning: { bg: '#fffff0', color: '#d69e2e' },
        danger: { bg: '#fff5f5', color: '#e53e3e' }
    };
    
    const theme = variants[variant] || variants.primary;

    const styles = {
        badge: {
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '16px',
            backgroundColor: theme.bg,
            color: theme.color,
            fontSize: '0.75rem',
            fontWeight: '700',
            fontFamily: "'Inter', system-ui, sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        }
    };

    return <span style={styles.badge}>{children}</span>;
};
export default Badge;

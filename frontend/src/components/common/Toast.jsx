import React, { useEffect, useState } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // Wait for fade out
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColors = {
        success: '#38a169',
        error: '#e53e3e',
        info: '#3182ce'
    };

    const styles = {
        container: {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: bgColors[type] || bgColors.info,
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.95rem',
            fontWeight: '500',
            zIndex: 9999,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.3s ease'
        }
    };

    if (!visible && !message) return null;

    return (
        <div style={styles.container}>
            {message}
        </div>
    );
};
export default Toast;

import React from 'react';

const TypingIndicator = () => {
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            borderTopLeftRadius: '4px',
            border: '1px solid rgba(251, 111, 146, 0.2)',
            maxWidth: 'fit-content',
            boxShadow: '0 4px 15px rgba(251, 111, 146, 0.05)',
            marginBottom: '16px'
        },
        dot: {
            width: '8px',
            height: '8px',
            backgroundColor: '#fb6f92',
            borderRadius: '50%',
            animation: 'typing-pulse 1.4s infinite ease-in-out both'
        },
        dot1: { animationDelay: '-0.32s' },
        dot2: { animationDelay: '-0.16s' },
        dot3: { animationDelay: '0s' }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                @keyframes typing-pulse {
                    0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                }
                `}
            </style>
            <div style={{ ...styles.dot, ...styles.dot1 }}></div>
            <div style={{ ...styles.dot, ...styles.dot2 }}></div>
            <div style={{ ...styles.dot, ...styles.dot3 }}></div>
        </div>
    );
};

export default TypingIndicator;

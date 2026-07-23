import React, { useState } from 'react';

const SOSButton = ({ onTrigger }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        button: {
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff4b4b 0%, #e53e3e 100%)',
            border: '8px solid rgba(255, 75, 75, 0.2)',
            color: 'white',
            fontSize: '1.75rem',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: isHovered 
                ? '0 0 40px rgba(229, 62, 62, 0.6), inset 0 0 20px rgba(0,0,0,0.1)' 
                : '0 10px 30px rgba(229, 62, 62, 0.4), inset 0 0 10px rgba(0,0,0,0.1)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            outline: 'none',
            animation: 'pulse-red 2s infinite'
        },
        text: {
            margin: 0,
            letterSpacing: '0.05em'
        },
        subtext: {
            margin: 0,
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            opacity: 0.9
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                @keyframes pulse-red {
                    0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(229, 62, 62, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
                }
                `}
            </style>
            <button 
                style={styles.button}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onTrigger}
            >
                <span style={styles.text}>SOS</span>
                <span style={styles.subtext}>Emergency</span>
            </button>
        </div>
    );
};
export default SOSButton;

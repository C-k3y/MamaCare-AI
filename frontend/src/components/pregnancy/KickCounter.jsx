import React, { useState } from 'react';

const KickCounter = () => {
    const [kicks, setKicks] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const handleKick = () => {
        if (!isActive) setIsActive(true);
        setKicks(k => k + 1);
    };

    const handleReset = () => {
        setKicks(0);
        setIsActive(false);
    };

    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            textAlign: 'center'
        },
        header: {
            margin: '0 0 20px 0',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        circle: {
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: isActive ? 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)' : '#edf2f7',
            color: isActive ? 'white' : '#a0aec0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 24px auto',
            cursor: 'pointer',
            boxShadow: isActive ? '0 8px 25px rgba(251, 111, 146, 0.4)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
        },
        number: {
            margin: 0,
            fontSize: '3rem',
            fontWeight: '800'
        },
        label: {
            margin: 0,
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        status: {
            fontSize: '0.85rem',
            color: isActive ? '#38a169' : '#718096',
            fontWeight: '600'
        },
        resetBtn: {
            background: 'transparent',
            border: '1px solid #cbd5e0',
            padding: '6px 12px',
            borderRadius: '12px',
            color: '#4a5568',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.header}>Kick Counter</h3>
            
            <div 
                style={styles.circle} 
                onClick={handleKick}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={e => e.currentTarget.style.transform = isActive ? 'scale(1.05)' : 'scale(1)'}
            >
                <p style={styles.number}>{kicks}</p>
                <p style={styles.label}>Kicks</p>
            </div>
            
            <div style={styles.footer}>
                <span style={styles.status}>
                    {isActive ? '● Session Active' : '○ Tap to start'}
                </span>
                <button 
                    style={styles.resetBtn}
                    onClick={handleReset}
                    onMouseOver={e => e.currentTarget.style.background = '#edf2f7'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};
export default KickCounter;

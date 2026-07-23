import React, { useState } from 'react';

const WaterTracker = ({ targetGlasses = 8 }) => {
    const [consumed, setConsumed] = useState(3);

    const handleAdd = () => {
        if (consumed < targetGlasses) setConsumed(c => c + 1);
    };

    const handleRemove = () => {
        if (consumed > 0) setConsumed(c => c - 1);
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        },
        title: {
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        subtitle: {
            margin: 0,
            fontSize: '0.9rem',
            color: '#718096'
        },
        glassesContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '24px'
        },
        glass: (isFilled) => ({
            fontSize: '2rem',
            opacity: isFilled ? 1 : 0.3,
            filter: isFilled ? 'drop-shadow(0 4px 6px rgba(66, 153, 225, 0.3))' : 'grayscale(100%)',
            transition: 'all 0.3s ease',
            transform: isFilled ? 'scale(1.1)' : 'scale(1)',
            cursor: 'default'
        }),
        controls: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px'
        },
        btn: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'white',
            border: '2px solid #ebf8ff',
            color: '#3182ce',
            fontSize: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
            outline: 'none'
        },
        count: {
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#2b6cb0',
            minWidth: '60px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Hydration</h3>
                <p style={styles.subtitle}>{targetGlasses} glasses goal</p>
            </div>
            
            <div style={styles.glassesContainer}>
                {Array.from({ length: targetGlasses }).map((_, i) => (
                    <span key={i} style={styles.glass(i < consumed)}>💧</span>
                ))}
            </div>
            
            <div style={styles.controls}>
                <button 
                    style={styles.btn} 
                    onClick={handleRemove}
                    onMouseOver={e => e.currentTarget.style.background = '#ebf8ff'}
                    onMouseOut={e => e.currentTarget.style.background = 'white'}
                >-</button>
                <span style={styles.count}>{consumed} / {targetGlasses}</span>
                <button 
                    style={styles.btn} 
                    onClick={handleAdd}
                    onMouseOver={e => e.currentTarget.style.background = '#ebf8ff'}
                    onMouseOut={e => e.currentTarget.style.background = 'white'}
                >+</button>
            </div>
        </div>
    );
};
export default WaterTracker;

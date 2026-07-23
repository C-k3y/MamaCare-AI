import React from 'react';

const AmbulanceCard = ({ status = 'idle', eta = null, onRequest }) => {
    // status: 'idle', 'dispatching', 'on_way'
    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(229, 62, 62, 0.1)',
            border: '1px solid rgba(229, 62, 62, 0.2)',
            fontFamily: "'Inter', system-ui, sans-serif",
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        iconBox: {
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: '#fff5f5',
            color: '#e53e3e',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem'
        },
        title: {
            margin: '0 0 4px 0',
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        subtitle: {
            margin: 0,
            fontSize: '0.85rem',
            color: '#718096'
        },
        etaBox: {
            background: '#fff5f5',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
            border: '1px solid #fed7d7'
        },
        etaText: {
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#e53e3e'
        },
        etaLabel: {
            margin: '4px 0 0 0',
            fontSize: '0.85rem',
            color: '#c53030',
            fontWeight: '600',
            textTransform: 'uppercase'
        },
        button: {
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(229, 62, 62, 0.3)',
            transition: 'transform 0.2s'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.iconBox}>🚑</div>
                <div>
                    <h3 style={styles.title}>Ambulance Service</h3>
                    <p style={styles.subtitle}>Fast medical transport</p>
                </div>
            </div>
            
            {status === 'idle' ? (
                <button 
                    style={styles.button}
                    onClick={onRequest}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    Request Ambulance
                </button>
            ) : (
                <div style={styles.etaBox}>
                    <p style={styles.etaText}>{eta || 'Dispatching...'}</p>
                    <p style={styles.etaLabel}>{status === 'on_way' ? 'Estimated Arrival' : 'Finding nearest unit'}</p>
                </div>
            )}
        </div>
    );
};
export default AmbulanceCard;

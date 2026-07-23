import React from 'react';

const BloodPressureCard = ({ sys = 118, dia = 75 }) => {
    const isNormal = sys < 120 && dia < 80;

    const styles = {
        container: {
            background: 'white',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            border: '1px solid #edf2f7',
            fontFamily: "'Inter', system-ui, sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
        },
        iconBox: {
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: '#ebf8ff',
            color: '#3182ce',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.8rem'
        },
        info: {
            flex: 1
        },
        title: {
            margin: '0 0 4px 0',
            fontSize: '1rem',
            color: '#718096',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        valueRow: {
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px'
        },
        value: {
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#1a202c'
        },
        unit: {
            fontSize: '0.9rem',
            color: '#4a5568',
            fontWeight: '600'
        },
        badge: {
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '700',
            background: isNormal ? '#f0fff4' : '#fffaf0',
            color: isNormal ? '#38a169' : '#dd6b20',
            textTransform: 'uppercase'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.iconBox}>❤️</div>
            <div style={styles.info}>
                <h3 style={styles.title}>Blood Pressure</h3>
                <div style={styles.valueRow}>
                    <p style={styles.value}>{sys}/{dia}</p>
                    <span style={styles.unit}>mmHg</span>
                </div>
            </div>
            <div style={styles.badge}>
                {isNormal ? 'Normal' : 'Elevated'}
            </div>
        </div>
    );
};
export default BloodPressureCard;

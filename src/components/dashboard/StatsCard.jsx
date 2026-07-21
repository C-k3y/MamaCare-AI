import React from 'react';

const StatsCard = ({ title, value, unit, trend, icon }) => {
    const isPositive = trend > 0;
    const isNeutral = trend === 0;

    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(251, 111, 146, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            transition: 'transform 0.2s',
            cursor: 'pointer'
        },
        iconWrapper: {
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ffe5ec 0%, #ffc2d1 100%)',
            color: '#fb6f92',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px'
        },
        info: {
            flex: 1
        },
        title: {
            margin: '0 0 4px 0',
            fontSize: '0.9rem',
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
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        unit: {
            fontSize: '1rem',
            color: '#4a5568',
            fontWeight: '500'
        },
        trendBadge: {
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600',
            background: isNeutral ? '#edf2f7' : (isPositive ? '#f0fff4' : '#fff5f5'),
            color: isNeutral ? '#718096' : (isPositive ? '#38a169' : '#e53e3e'),
            marginLeft: 'auto'
        }
    };

    return (
        <div 
            style={styles.container}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={styles.iconWrapper}>{icon}</div>
            <div style={styles.info}>
                <h3 style={styles.title}>{title}</h3>
                <div style={styles.valueRow}>
                    <p style={styles.value}>{value}</p>
                    <span style={styles.unit}>{unit}</span>
                </div>
            </div>
            {trend !== undefined && (
                <div style={styles.trendBadge}>
                    {isPositive ? '↑' : (isNeutral ? '-' : '↓')} {Math.abs(trend)}%
                </div>
            )}
        </div>
    );
};
export default StatsCard;

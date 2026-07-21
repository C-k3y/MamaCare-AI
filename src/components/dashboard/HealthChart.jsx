import React from 'react';

const HealthChart = ({ title, data = [65, 78, 59, 80, 81, 56, 70], labels = ['M','T','W','T','F','S','S'] }) => {
    const maxVal = Math.max(...data, 100);

    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(251, 111, 146, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            width: '100%',
            boxSizing: 'border-box'
        },
        title: {
            margin: '0 0 20px 0',
            fontSize: '1.15rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        chartArea: {
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '150px',
            paddingTop: '20px',
            borderBottom: '2px solid #edf2f7',
            gap: '10px'
        },
        barContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            gap: '8px'
        },
        bar: {
            width: '100%',
            maxWidth: '32px',
            background: 'linear-gradient(180deg, #fb6f92 0%, #ff8fab 100%)',
            borderRadius: '6px 6px 0 0',
            transition: 'height 0.5s ease',
            cursor: 'pointer'
        },
        label: {
            fontSize: '0.8rem',
            color: '#718096',
            fontWeight: '600'
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>{title}</h3>
            <div style={styles.chartArea}>
                {data.map((val, i) => (
                    <div key={i} style={styles.barContainer}>
                        <div 
                            style={{...styles.bar, height: `${(val / maxVal) * 100}%`}}
                            title={`${val}`}
                            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                        />
                        <span style={styles.label}>{labels[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default HealthChart;

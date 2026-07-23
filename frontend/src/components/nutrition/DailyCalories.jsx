import React from 'react';

const DailyCalories = ({ consumed = 1450, goal = 2200 }) => {
    const percentage = Math.min((consumed / goal) * 100, 100);
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'center'
        },
        title: {
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        circleWrapper: {
            position: 'relative',
            width: '150px',
            height: '150px'
        },
        svg: {
            transform: 'rotate(-90deg)'
        },
        circleBg: {
            fill: 'none',
            stroke: '#edf2f7',
            strokeWidth: '12'
        },
        circleProgress: {
            fill: 'none',
            stroke: 'url(#pinkGradient)',
            strokeWidth: '12',
            strokeLinecap: 'round',
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-in-out'
        },
        textWrapper: {
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        calories: {
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#2d3748'
        },
        label: {
            margin: 0,
            fontSize: '0.8rem',
            color: '#718096',
            fontWeight: '600',
            textTransform: 'uppercase'
        },
        footer: {
            fontSize: '0.9rem',
            color: '#4a5568',
            fontWeight: '500'
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Daily Calories</h3>
            
            <div style={styles.circleWrapper}>
                <svg width="150" height="150" style={styles.svg}>
                    <defs>
                        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff8fab" />
                            <stop offset="100%" stopColor="#fb6f92" />
                        </linearGradient>
                    </defs>
                    <circle cx="75" cy="75" r={radius} style={styles.circleBg} />
                    <circle cx="75" cy="75" r={radius} style={styles.circleProgress} />
                </svg>
                <div style={styles.textWrapper}>
                    <p style={styles.calories}>{consumed}</p>
                    <p style={styles.label}>kcal</p>
                </div>
            </div>
            
            <p style={styles.footer}>
                <strong style={{ color: '#fb6f92' }}>{goal - consumed}</strong> kcal remaining today
            </p>
        </div>
    );
};
export default DailyCalories;

import React from 'react';

const NutritionChart = ({ carbs = 45, protein = 30, fat = 25 }) => {
    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            width: '100%',
            boxSizing: 'border-box'
        },
        title: {
            margin: '0 0 24px 0',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        barWrapper: {
            display: 'flex',
            height: '24px',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '24px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        },
        segment: (width, color) => ({
            width: `${width}%`,
            background: color,
            transition: 'width 0.5s ease-in-out'
        }),
        legend: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        legendItem: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
        },
        dot: (color) => ({
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: color
        }),
        macroName: {
            margin: 0,
            fontSize: '0.85rem',
            color: '#718096',
            fontWeight: '600',
            textTransform: 'uppercase'
        },
        macroValue: {
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '800',
            color: '#2d3748'
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Macronutrients</h3>
            
            <div style={styles.barWrapper}>
                <div style={styles.segment(carbs, '#fb6f92')} title="Carbs"></div>
                <div style={styles.segment(protein, '#4299e1')} title="Protein"></div>
                <div style={styles.segment(fat, '#ecc94b')} title="Fat"></div>
            </div>
            
            <div style={styles.legend}>
                <div style={styles.legendItem}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={styles.dot('#fb6f92')}></div>
                        <p style={styles.macroName}>Carbs</p>
                    </div>
                    <p style={styles.macroValue}>{carbs}%</p>
                </div>
                
                <div style={styles.legendItem}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={styles.dot('#4299e1')}></div>
                        <p style={styles.macroName}>Protein</p>
                    </div>
                    <p style={styles.macroValue}>{protein}%</p>
                </div>
                
                <div style={styles.legendItem}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={styles.dot('#ecc94b')}></div>
                        <p style={styles.macroName}>Fat</p>
                    </div>
                    <p style={styles.macroValue}>{fat}%</p>
                </div>
            </div>
        </div>
    );
};
export default NutritionChart;

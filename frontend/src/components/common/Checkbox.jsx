import React from 'react';

const Checkbox = ({ checked, onChange, label }) => {
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: "'Inter', system-ui, sans-serif",
            cursor: 'pointer'
        },
        input: {
            accentColor: '#fb6f92',
            width: '18px',
            height: '18px',
            cursor: 'pointer'
        },
        label: {
            fontSize: '0.95rem',
            color: '#4a5568'
        }
    };

    return (
        <label style={styles.container}>
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={onChange} 
                style={styles.input}
            />
            <span style={styles.label}>{label}</span>
        </label>
    );
};
export default Checkbox;

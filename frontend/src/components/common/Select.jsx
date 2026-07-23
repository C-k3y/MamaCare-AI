import React, { useState } from 'react';

const Select = ({ label, options, value, onChange, style = {} }) => {
    const [focused, setFocused] = useState(false);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '16px',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        label: {
            marginBottom: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#4a5568'
        },
        select: {
            padding: '12px 16px',
            borderRadius: '12px',
            border: `1px solid ${focused ? '#fb6f92' : '#e2e8f0'}`,
            fontSize: '0.95rem',
            outline: 'none',
            color: '#2d3748',
            backgroundColor: '#ffffff',
            boxShadow: focused ? '0 0 0 3px rgba(251, 111, 146, 0.1)' : 'none',
            transition: 'all 0.2s',
            cursor: 'pointer',
            appearance: 'none',
            ...style
        },
        selectWrapper: {
            position: 'relative'
        },
        icon: {
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: '#a0aec0'
        }
    };

    return (
        <div style={styles.container}>
            {label && <label style={styles.label}>{label}</label>}
            <div style={styles.selectWrapper}>
                <select 
                    value={value}
                    onChange={onChange}
                    style={styles.select}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                >
                    {options.map((opt, i) => (
                        <option key={i} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <div style={styles.icon}>▼</div>
            </div>
        </div>
    );
};
export default Select;

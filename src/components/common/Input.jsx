import React, { useState } from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, style = {}, required }) => {
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
        input: {
            padding: '12px 16px',
            borderRadius: '12px',
            border: `1px solid ${focused ? '#fb6f92' : '#e2e8f0'}`,
            fontSize: '0.95rem',
            outline: 'none',
            color: '#2d3748',
            backgroundColor: '#ffffff',
            boxShadow: focused ? '0 0 0 3px rgba(251, 111, 146, 0.1)' : 'none',
            transition: 'all 0.2s',
            ...style
        }
    };

    return (
        <div style={styles.container}>
            {label && <label style={styles.label}>{label}</label>}
            <input 
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={styles.input}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required={required}
            />
        </div>
    );
};
export default Input;

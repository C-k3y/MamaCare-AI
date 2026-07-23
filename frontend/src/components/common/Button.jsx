import React, { useState } from 'react';

const Button = ({ children, onClick, variant = 'primary', style = {}, disabled, type="button", fullWidth = false }) => {
    const [hover, setHover] = useState(false);

    const baseStyle = {
        padding: '12px 24px',
        borderRadius: '12px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: "'Inter', system-ui, sans-serif",
        transition: 'all 0.2s ease',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        outline: 'none',
        ...style
    };

    const variants = {
        primary: {
            background: hover && !disabled ? 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)' : 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)',
            color: 'white',
            boxShadow: hover && !disabled ? '0 6px 20px rgba(251, 111, 146, 0.4)' : '0 4px 15px rgba(251, 111, 146, 0.3)',
            transform: hover && !disabled ? 'translateY(-2px)' : 'none'
        },
        secondary: {
            background: hover && !disabled ? 'rgba(251, 111, 146, 0.15)' : 'rgba(251, 111, 146, 0.05)',
            color: '#fb6f92',
            border: '1px solid rgba(251, 111, 146, 0.2)',
            transform: hover && !disabled ? 'translateY(-1px)' : 'none'
        },
        outline: {
            background: hover && !disabled ? '#f7fafc' : 'transparent',
            color: '#4a5568',
            border: '1px solid #e2e8f0'
        }
    };

    const currentStyle = { ...baseStyle, ...variants[variant] };

    return (
        <button 
            type={type}
            style={currentStyle} 
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {children}
        </button>
    );
};
export default Button;

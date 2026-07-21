import React from 'react';

const Card = ({ children, style = {} }) => {
    const defaultStyles = {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 10px 40px rgba(251, 111, 146, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        fontFamily: "'Inter', system-ui, sans-serif",
        ...style
    };

    return (
        <div style={defaultStyles}>
            {children}
        </div>
    );
};
export default Card;

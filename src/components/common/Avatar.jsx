import React from 'react';

const Avatar = ({ src, initials, size = 'md' }) => {
    const sizes = { sm: '32px', md: '48px', lg: '64px' };
    const dim = sizes[size] || sizes.md;

    const styles = {
        container: {
            width: dim,
            height: dim,
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffe5ec',
            color: '#fb6f92',
            fontWeight: 'bold',
            fontSize: size === 'sm' ? '14px' : size === 'lg' ? '24px' : '18px',
            fontFamily: "'Inter', system-ui, sans-serif",
            border: '2px solid white',
            boxShadow: '0 2px 8px rgba(251, 111, 146, 0.2)'
        },
        img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
    };

    return (
        <div style={styles.container}>
            {src ? <img src={src} alt="Avatar" style={styles.img} /> : initials}
        </div>
    );
};
export default Avatar;

import React from 'react';

const Header = ({ title = "MamaCare AI", subtitle }) => {
    const styles = {
        header: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(251, 111, 146, 0.2)',
            padding: '24px 40px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        titleBox: {
            display: 'flex',
            flexDirection: 'column'
        },
        title: {
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },
        subtitle: {
            margin: '4px 0 0 0',
            fontSize: '0.9rem',
            color: '#718096',
            fontWeight: '500'
        },
        actions: {
            display: 'flex',
            gap: '12px'
        },
        button: {
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(251, 111, 146, 0.3)',
            transition: 'transform 0.2s'
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.titleBox}>
                <h1 style={styles.title}>{title}</h1>
                {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
            </div>
            <div style={styles.actions}>
                <button 
                    style={styles.button}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    Get Started
                </button>
            </div>
        </header>
    );
};
export default Header;

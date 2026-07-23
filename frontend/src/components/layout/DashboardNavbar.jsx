import React from 'react';

const DashboardNavbar = ({ title = "Dashboard" }) => {
    const styles = {
        navbar: {
            height: '80px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            position: 'sticky',
            top: 0,
            zIndex: 90,
            fontFamily: "'Inter', system-ui, sans-serif",
            marginLeft: '280px', // Offset for sidebar
            boxSizing: 'border-box'
        },
        title: {
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        rightSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
        },
        iconBtn: {
            background: 'white',
            border: '1px solid #edf2f7',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '1.2rem',
            position: 'relative',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            transition: 'transform 0.2s'
        },
        badge: {
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            background: '#e53e3e',
            color: 'white',
            fontSize: '0.65rem',
            fontWeight: 'bold',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid white'
        },
        userBox: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        avatar: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
        },
        greeting: {
            margin: 0,
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#2d3748'
        }
    };

    return (
        <nav style={styles.navbar}>
            <h2 style={styles.title}>{title}</h2>

            <div style={styles.rightSection}>
                <button
                    style={styles.iconBtn}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    🔔
                    <span style={styles.badge}>3</span>
                </button>

                <div style={styles.userBox}>
                    <div style={styles.avatar}>JD</div>
                    <p style={styles.greeting}>Hi, Jane</p>
                </div>
            </div>
        </nav>
    );
};
export default DashboardNavbar;

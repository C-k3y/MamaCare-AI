import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const styles = {
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 48px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            fontFamily: "'Inter', system-ui, sans-serif",
            boxSizing: 'border-box'
        },
        logo: {
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#fb6f92',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        links: {
            display: 'flex',
            gap: '32px',
            alignItems: 'center'
        },
        link: {
            color: '#4a5568',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'color 0.2s'
        },
        loginBtn: {
            padding: '8px 20px',
            borderRadius: '20px',
            background: 'rgba(251, 111, 146, 0.1)',
            color: '#fb6f92',
            fontWeight: '700',
            textDecoration: 'none',
            border: '2px solid rgba(251, 111, 146, 0.2)',
            transition: 'all 0.2s'
        }
    };

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>
                <span>🩺</span> MamaCare AI
            </Link>
            <div style={styles.links}>
                <a href="#features" style={styles.link} onMouseOver={e => e.target.style.color = '#fb6f92'} onMouseOut={e => e.target.style.color = '#4a5568'}>Features</a>
                <a href="#about" style={styles.link} onMouseOver={e => e.target.style.color = '#fb6f92'} onMouseOut={e => e.target.style.color = '#4a5568'}>About</a>
                <a href="#pricing" style={styles.link} onMouseOver={e => e.target.style.color = '#fb6f92'} onMouseOut={e => e.target.style.color = '#4a5568'}>Pricing</a>
                <Link 
                    to="/login" 
                    style={styles.loginBtn}
                    onMouseOver={e => {
                        e.target.style.background = '#fb6f92';
                        e.target.style.color = 'white';
                    }}
                    onMouseOut={e => {
                        e.target.style.background = 'rgba(251, 111, 146, 0.1)';
                        e.target.style.color = '#fb6f92';
                    }}
                >
                    Login
                </Link>
            </div>
        </nav>
    );
};
export default Navbar;

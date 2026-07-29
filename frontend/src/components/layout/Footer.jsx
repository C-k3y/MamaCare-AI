import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const styles = {
        footer: {
            background: 'white',
            borderTop: '1px solid #edf2f7',
            padding: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: "'Inter', system-ui, sans-serif",
            color: '#718096',
            fontSize: '0.9rem',
            marginTop: 'auto'
        },
        logo: {
            fontSize: '1.25rem',
            fontWeight: '800',
            color: '#fb6f92',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        links: {
            display: 'flex',
            gap: '24px'
        },
        link: {
            color: '#718096',
            textDecoration: 'none',
            transition: 'color 0.2s'
        }
    };

    return (
        <footer style={styles.footer}>
            <div>
                <div style={styles.logo}>
                    <span>🩺</span> MamaCare AI
                </div>
                <p style={{ margin: '8px 0 0 0' }}>Empowering your pregnancy journey.</p>
            </div>
            
            <div style={styles.links}>
                <Link to="/privacy" style={styles.link} onMouseOver={e => e.target.style.color = '#fb6f92'} onMouseOut={e => e.target.style.color = '#718096'}>Privacy Policy</Link>
                <Link to="/terms" style={styles.link} onMouseOver={e => e.target.style.color = '#fb6f92'} onMouseOut={e => e.target.style.color = '#718096'}>Terms of Service</Link>
                <Link to="/contact" style={styles.link} onMouseOver={e => e.target.style.color = '#fb6f92'} onMouseOut={e => e.target.style.color = '#718096'}>Contact Us</Link>
            </div>
            
            <div>
                &copy; {new Date().getFullYear()} MamaCare AI. All rights reserved.
            </div>
        </footer>
    );
};
export default Footer;

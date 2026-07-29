import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const s = {
        page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fff0f4 0%, #ffe5ec 100%)', fontFamily: "'Inter', system-ui, sans-serif", padding: '24px', boxSizing: 'border-box' },
        card: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '28px', padding: '60px 48px', textAlign: 'center', boxShadow: '0 20px 60px rgba(251,111,146,0.12)', border: '1px solid rgba(255,255,255,0.7)', maxWidth: '480px', width: '100%' },
        emoji: { fontSize: '5rem', marginBottom: '16px', display: 'block' },
        code: { margin: '0 0 8px 0', fontSize: '5rem', fontWeight: '900', color: '#fb6f92', letterSpacing: '-0.04em', lineHeight: 1 },
        title: { margin: '0 0 12px 0', fontSize: '1.5rem', fontWeight: '700', color: '#1a202c' },
        desc: { margin: '0 0 36px 0', fontSize: '1rem', color: '#718096', lineHeight: '1.6' },
        btnHome: { display: 'inline-block', padding: '14px 32px', borderRadius: '16px', background: 'linear-gradient(135deg,#ff8fab,#fb6f92)', color: 'white', fontWeight: '700', fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 15px rgba(251,111,146,0.35)', marginRight: '12px' },
        btnBack: { display: 'inline-block', padding: '14px 28px', borderRadius: '16px', background: 'transparent', color: '#fb6f92', fontWeight: '700', fontSize: '1rem', textDecoration: 'none', border: '2px solid rgba(251,111,146,0.3)' }
    };

    return (
        <div style={s.page}>
            <div style={s.card}>
                <span style={s.emoji}>🩺</span>
                <h1 style={s.code}>404</h1>
                <h2 style={s.title}>Page Not Found</h2>
                <p style={s.desc}>Oops! It seems this page went into labor early. The page you're looking for doesn't exist or has been moved.</p>
                <div>
                    <Link to="/" style={s.btnHome}>Go Home</Link>
                    <a href="#" onClick={() => window.history.back()} style={s.btnBack}>Go Back</a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

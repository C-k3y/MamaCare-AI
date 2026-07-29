import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Home = () => {
    const styles = {
        page: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Inter', system-ui, sans-serif",
            background: 'linear-gradient(160deg, #fff0f4 0%, #ffe5ec 50%, #ffc2d1 100%)'
        },
        hero: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            padding: '140px 24px 60px', // 140px top = 70px navbar + 70px spacing
            position: 'relative',
            overflow: 'visible'
        },
        heroBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(251, 111, 146, 0.12)',
            border: '1px solid rgba(251, 111, 146, 0.3)',
            borderRadius: '100px',
            padding: '8px 18px',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#c05070',
            marginBottom: '28px'
        },
        heroTitle: {
            margin: '0 0 20px 0',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            color: '#1a202c',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            maxWidth: '720px'
        },
        heroTitleAccent: {
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        },
        heroSub: {
            margin: '0 0 40px 0',
            fontSize: '1.15rem',
            color: '#718096',
            lineHeight: '1.7',
            maxWidth: '560px'
        },
        heroCta: {
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center'
        },
        btnPrimary: {
            padding: '16px 36px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)',
            color: 'white',
            border: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(251, 111, 146, 0.4)',
            textDecoration: 'none',
            display: 'inline-block',
            fontFamily: "'Inter', system-ui, sans-serif",
            transition: 'transform 0.2s, box-shadow 0.2s'
        },
        btnSecondary: {
            padding: '16px 36px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.8)',
            color: '#fb6f92',
            border: '2px solid rgba(251, 111, 146, 0.3)',
            fontWeight: '700',
            fontSize: '1rem',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block',
            fontFamily: "'Inter', system-ui, sans-serif",
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.2s'
        },
        featuresSection: {
            padding: '80px 24px',
            maxWidth: '1100px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box'
        },
        featuresSectionTitle: {
            textAlign: 'center',
            margin: '0 0 12px 0',
            fontSize: '2rem',
            fontWeight: '800',
            color: '#1a202c'
        },
        featuresSectionSub: {
            textAlign: 'center',
            margin: '0 0 48px 0',
            color: '#718096',
            fontSize: '1rem'
        },
        featuresGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
        },
        featureCard: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '32px 28px',
            boxShadow: '0 8px 32px rgba(251, 111, 146, 0.07)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            transition: 'transform 0.2s, box-shadow 0.2s'
        },
        featureIcon: {
            fontSize: '2.5rem',
            marginBottom: '16px',
            display: 'block'
        },
        featureTitle: {
            margin: '0 0 8px 0',
            fontSize: '1.15rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        featureDesc: {
            margin: 0,
            fontSize: '0.95rem',
            color: '#718096',
            lineHeight: '1.6'
        },
        statsBanner: {
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            padding: '60px 24px',
            textAlign: 'center'
        },
        statsGrid: {
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            flexWrap: 'wrap',
            maxWidth: '800px',
            margin: '0 auto'
        },
        statItem: {
            color: 'white'
        },
        statValue: {
            margin: '0 0 4px 0',
            fontSize: '2.5rem',
            fontWeight: '900'
        },
        statLabel: {
            margin: 0,
            fontSize: '0.9rem',
            opacity: 0.85,
            fontWeight: '600'
        }
    };

    const features = [
        { icon: '🤰', title: 'Pregnancy Tracking', desc: 'Monitor your baby\'s growth week by week with personalized insights tailored to your journey.' },
        { icon: '🥗', title: 'Nutrition Planner', desc: 'Get AI-powered meal recommendations to ensure you and your baby receive optimal prenatal nutrition.' },
        { icon: '📅', title: 'Appointment Manager', desc: 'Easily schedule, track, and get reminders for all your prenatal checkups and specialist visits.' },
        { icon: '🩺', title: 'Symptom Checker', desc: 'Describe your symptoms and get instant AI-powered guidance on what might be happening.' },
        { icon: '🚨', title: 'Emergency SOS', desc: 'One-tap emergency alert that notifies services and your loved ones with your GPS location.' },
        { icon: '💬', title: 'AI Health Chat', desc: 'Ask any pregnancy-related question to our intelligent chatbot, available 24/7 for your peace of mind.' }
    ];

    return (
        <div style={styles.page}>
            <Navbar />
            <main>
                <section style={styles.hero}>
                    <div style={styles.heroBadge}>
                        <span>✨</span> AI-Powered Maternal Healthcare
                    </div>
                    <h1 style={styles.heroTitle}>
                        Your Pregnancy Journey,{' '}
                        <span style={styles.heroTitleAccent}>Guided by AI</span>
                    </h1>
                    <p style={styles.heroSub}>
                        MamaCare AI supports mothers from conception through postpartum with personalized health tracking, smart nutrition plans, and 24/7 AI assistance.
                    </p>
                    <div style={styles.heroCta}>
                        <Link
                            to="/register"
                            style={styles.btnPrimary}
                            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(251, 111, 146, 0.5)'; }}
                            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(251, 111, 146, 0.4)'; }}
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/about"
                            style={styles.btnSecondary}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Learn More
                        </Link>
                    </div>
                </section>

                <section style={styles.featuresSection}>
                    <h2 style={styles.featuresSectionTitle}>Everything You Need</h2>
                    <p style={styles.featuresSectionSub}>Comprehensive tools designed for a safe and informed pregnancy experience.</p>
                    <div style={styles.featuresGrid}>
                        {features.map((f, i) => (
                            <div
                                key={i}
                                style={styles.featureCard}
                                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(251, 111, 146, 0.14)'; }}
                                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(251, 111, 146, 0.07)'; }}
                            >
                                <span style={styles.featureIcon}>{f.icon}</span>
                                <h3 style={styles.featureTitle}>{f.title}</h3>
                                <p style={styles.featureDesc}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div style={styles.statsBanner}>
                    <div style={styles.statsGrid}>
                        <div style={styles.statItem}>
                            <p style={styles.statValue}>50K+</p>
                            <p style={styles.statLabel}>Mothers Supported</p>
                        </div>
                        <div style={styles.statItem}>
                            <p style={styles.statValue}>98%</p>
                            <p style={styles.statLabel}>Satisfaction Rate</p>
                        </div>
                        <div style={styles.statItem}>
                            <p style={styles.statValue}>24/7</p>
                            <p style={styles.statLabel}>AI Support</p>
                        </div>
                        <div style={styles.statItem}>
                            <p style={styles.statValue}>500+</p>
                            <p style={styles.statLabel}>Expert Partners</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;

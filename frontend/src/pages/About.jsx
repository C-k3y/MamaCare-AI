import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const About = () => {
    const styles = {
        page: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', system-ui, sans-serif", background: 'linear-gradient(160deg, #fff0f4 0%, #ffe5ec 60%, #ffc2d1 100%)' },
        hero: { textAlign: 'center', padding: '100px 24px 60px', maxWidth: '700px', margin: '0 auto' },
        heading: { margin: '0 0 16px 0', fontSize: '2.75rem', fontWeight: '900', color: '#1a202c', letterSpacing: '-0.03em' },
        accent: { background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
        sub: { margin: 0, fontSize: '1.1rem', color: '#718096', lineHeight: '1.7' },
        section: { maxWidth: '1100px', margin: '0 auto', padding: '60px 24px', width: '100%', boxSizing: 'border-box' },
        label: { display: 'inline-block', background: 'rgba(251,111,146,0.1)', color: '#fb6f92', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '6px 14px', borderRadius: '100px', marginBottom: '16px' },
        sectionTitle: { margin: '0 0 16px 0', fontSize: '1.75rem', fontWeight: '800', color: '#1a202c' },
        card: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(251,111,146,0.06)', border: '1px solid rgba(255,255,255,0.7)' },
        valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginTop: '24px' },
        teamGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '24px', marginTop: '24px' },
        teamAvatar: { width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg,#fb6f92 0%,#ff8fab 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 16px', boxShadow: '0 4px 15px rgba(251,111,146,0.3)' }
    };

    const values = [
        { icon: '💝', title: 'Mother-First', desc: 'Every decision centers on the health and wellbeing of mothers and their babies.' },
        { icon: '🔬', title: 'Science-Backed', desc: 'All guidance is grounded in evidence-based medicine and clinical research.' },
        { icon: '🔒', title: 'Privacy First', desc: 'Your health data is encrypted and never shared without your explicit consent.' }
    ];

    const team = [
        { initials: 'AO', name: 'Dr. Amara Osei', role: 'Chief Medical Officer' },
        { initials: 'LF', name: 'Lena Fischer', role: 'Lead AI Engineer' },
        { initials: 'SM', name: 'Samuel Mensah', role: 'Product Director' },
        { initials: 'YK', name: 'Yuki Kimura', role: 'UX Research Lead' }
    ];

    return (
        <div style={styles.page}>
            <Navbar />
            <main>
                <div style={styles.hero}>
                    <h1 style={styles.heading}>About <span style={styles.accent}>MamaCare AI</span></h1>
                    <p style={styles.sub}>We're on a mission to make quality maternal healthcare accessible to every mother, powered by compassion and cutting-edge AI.</p>
                </div>
                <div style={styles.section}>
                    <span style={styles.label}>Our Values</span>
                    <h2 style={styles.sectionTitle}>What Drives Us</h2>
                    <div style={styles.valuesGrid}>
                        {values.map((v, i) => (
                            <div key={i} style={{ ...styles.card, textAlign: 'center' }}>
                                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }}>{v.icon}</span>
                                <h3 style={{ margin: '0 0 8px 0', fontWeight: '700', color: '#1a202c' }}>{v.title}</h3>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '64px' }}>
                        <span style={styles.label}>Our Team</span>
                        <h2 style={styles.sectionTitle}>The People Behind MamaCare</h2>
                        <div style={styles.teamGrid}>
                            {team.map((m, i) => (
                                <div key={i} style={{ ...styles.card, textAlign: 'center' }}>
                                    <div style={styles.teamAvatar}>{m.initials}</div>
                                    <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: '#1a202c' }}>{m.name}</p>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#718096' }}>{m.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;

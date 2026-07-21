import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';

const symptoms = [
    { id: 'headache', label: 'Headache', icon: '🤕' },
    { id: 'nausea', label: 'Nausea', icon: '🤢' },
    { id: 'swelling', label: 'Swelling', icon: '🦵' },
    { id: 'backpain', label: 'Back Pain', icon: '🔙' },
    { id: 'fatigue', label: 'Fatigue', icon: '😴' },
    { id: 'dizziness', label: 'Dizziness', icon: '💫' },
    { id: 'cramps', label: 'Cramps', icon: '⚡' },
    { id: 'heartburn', label: 'Heartburn', icon: '🔥' }
];

const adviceMap = {
    headache: { severity: 'Moderate', advice: 'Stay hydrated, rest in a quiet room, and apply a cool cloth to your forehead. Consult your doctor if it persists more than 24 hours.', urgent: false },
    nausea: { severity: 'Mild', advice: 'Eat small, frequent meals. Try ginger tea or crackers. Avoid strong smells. This is normal in early pregnancy.', urgent: false },
    swelling: { severity: 'Moderate', advice: 'Elevate your feet when resting. Avoid prolonged standing. Sudden or severe swelling, especially in the face, warrants immediate medical attention.', urgent: true },
    backpain: { severity: 'Mild', advice: 'Gentle stretching and prenatal yoga can help. Use a supportive pillow when sleeping. Consider a warm compress.', urgent: false },
    fatigue: { severity: 'Mild', advice: 'Rest when you can. Ensure your iron levels are adequate. Stay hydrated and maintain a balanced diet.', urgent: false },
    dizziness: { severity: 'Moderate', advice: 'Avoid sudden movements. Sit or lie down when dizzy. Ensure you are eating regularly. Seek help if dizziness is severe.', urgent: true },
    cramps: { severity: 'Moderate', advice: 'Mild cramps can be normal. However, severe or persistent cramping, especially with bleeding, requires immediate medical evaluation.', urgent: true },
    heartburn: { severity: 'Mild', advice: 'Eat smaller meals, avoid spicy foods, and don\'t lie down immediately after eating. Sleeping with your head elevated can help.', urgent: false }
};

const SymptomChecker = () => {
    const [selected, setSelected] = useState([]);
    const [result, setResult] = useState(null);
    const [severity, setSeverity] = useState('mild');

    const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);

    const analyze = () => {
        if (selected.length === 0) return;
        const hasUrgent = selected.some(s => adviceMap[s]?.urgent);
        setResult({ urgent: hasUrgent, advice: selected.map(s => adviceMap[s]).filter(Boolean) });
    };

    const s = {
        layout: { display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f7 0%, #ffe5ec 100%)', fontFamily: "'Inter', system-ui, sans-serif" },
        main: { marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' },
        content: { padding: '32px', flex: 1, maxWidth: '860px' },
        heading: { margin: '0 0 4px 0', fontSize: '1.75rem', fontWeight: '800', color: '#1a202c' },
        sub: { margin: '0 0 32px 0', fontSize: '1rem', color: '#718096' },
        card: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '24px', padding: '28px', boxShadow: '0 8px 32px rgba(251,111,146,0.08)', border: '1px solid rgba(255,255,255,0.6)', marginBottom: '24px' },
        cardTitle: { margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: '700', color: '#1a202c' },
        sympGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '12px' },
        sympBtn: (active) => ({ padding: '16px', borderRadius: '16px', border: active ? '2px solid #fb6f92' : '2px solid #edf2f7', background: active ? 'rgba(251,111,146,0.08)' : 'white', cursor: 'pointer', textAlign: 'center', fontFamily: "'Inter', system-ui, sans-serif", transition: 'all 0.2s' }),
        sympIcon: { fontSize: '1.6rem', display: 'block', marginBottom: '8px' },
        sympLabel: { margin: 0, fontWeight: '600', fontSize: '0.9rem', color: '#2d3748' },
        analyzeBtn: { width: '100%', padding: '14px', borderRadius: '16px', background: selected.length > 0 ? 'linear-gradient(135deg,#ff8fab,#fb6f92)' : '#edf2f7', color: selected.length > 0 ? 'white' : '#a0aec0', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: selected.length > 0 ? 'pointer' : 'not-allowed', boxShadow: selected.length > 0 ? '0 4px 15px rgba(251,111,146,0.3)' : 'none', fontFamily: "'Inter', system-ui, sans-serif", marginTop: '4px' },
        urgentAlert: { background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.25)', borderRadius: '16px', padding: '16px 20px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' },
        adviceItem: { padding: '16px 0', borderBottom: '1px solid #edf2f7' }
    };

    return (
        <div style={s.layout}>
            <Sidebar />
            <div style={s.main}>
                <DashboardNavbar />
                <div style={s.content}>
                    <h1 style={s.heading}>Symptom Checker</h1>
                    <p style={s.sub}>Select your symptoms and get AI-powered guidance tailored to your pregnancy.</p>

                    <div style={s.card}>
                        <h2 style={s.cardTitle}>What are you experiencing?</h2>
                        <div style={s.sympGrid}>
                            {symptoms.map(sym => (
                                <button key={sym.id} style={s.sympBtn(selected.includes(sym.id))} onClick={() => toggle(sym.id)}>
                                    <span style={s.sympIcon}>{sym.icon}</span>
                                    <p style={{ ...s.sympLabel, color: selected.includes(sym.id) ? '#fb6f92' : '#2d3748' }}>{sym.label}</p>
                                </button>
                            ))}
                        </div>
                        <div style={{ marginTop: '24px' }}>
                            <button style={s.analyzeBtn} onClick={analyze}>
                                {selected.length > 0 ? `Analyze ${selected.length} Symptom${selected.length > 1 ? 's' : ''}` : 'Select symptoms to analyze'}
                            </button>
                        </div>
                    </div>

                    {result && (
                        <div style={s.card}>
                            <h2 style={s.cardTitle}>AI Analysis</h2>
                            {result.urgent && (
                                <div style={s.urgentAlert}>
                                    <span style={{ fontSize: '1.3rem' }}>⚠️</span>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: '#e53e3e' }}>Some symptoms may need medical attention</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#718096' }}>Please contact your healthcare provider or visit the nearest clinic if symptoms are severe.</p>
                                    </div>
                                </div>
                            )}
                            {result.advice.map((a, i) => {
                                const sym = symptoms.find(s => adviceMap[s.id] === a);
                                return (
                                    <div key={i} style={{ ...s.adviceItem, borderBottom: i < result.advice.length - 1 ? '1px solid #edf2f7' : 'none' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '1.1rem' }}>{sym?.icon}</span>
                                            <p style={{ margin: 0, fontWeight: '700', color: '#1a202c' }}>{sym?.label}</p>
                                            <span style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: '700', background: a.urgent ? 'rgba(229,62,62,0.1)' : 'rgba(56,161,105,0.1)', color: a.urgent ? '#e53e3e' : '#38a169' }}>{a.severity}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.92rem', color: '#718096', lineHeight: '1.6' }}>{a.advice}</p>
                                    </div>
                                );
                            })}
                            <p style={{ margin: '20px 0 0 0', fontSize: '0.82rem', color: '#a0aec0', fontStyle: 'italic' }}>⚕️ This is not a medical diagnosis. Always consult a qualified healthcare professional.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SymptomChecker;

import React, { useState } from 'react';

const MedicalHistory = ({ records = [] }) => {
    const [expanded, setExpanded] = useState(null);

    const defaultRecords = [
        {
            id: 1,
            date: '2026-06-10',
            doctor: 'Dr. Jane Smith',
            type: 'Prenatal Checkup',
            notes: 'Blood pressure normal. Baby heartbeat strong at 155 bpm. Growth on track for 12 weeks.',
            icon: '🩺'
        },
        {
            id: 2,
            date: '2026-05-05',
            doctor: 'Dr. Jane Smith',
            type: 'Ultrasound',
            notes: 'First trimester ultrasound completed. Nuchal translucency within normal range. No anomalies detected.',
            icon: '🔊'
        },
        {
            id: 3,
            date: '2026-04-15',
            doctor: 'Dr. Alan Patel',
            type: 'Blood Work',
            notes: 'CBC normal. Iron slightly low — prescribed prenatal iron supplement 65mg/day.',
            icon: '🩸'
        }
    ];

    const data = records.length > 0 ? records : defaultRecords;

    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        title: {
            margin: '0 0 20px 0',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        list: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        record: (isOpen) => ({
            background: isOpen ? '#f8fafc' : 'white',
            borderRadius: '16px',
            border: '1px solid #edf2f7',
            overflow: 'hidden',
            transition: 'background 0.2s'
        }),
        recordHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            cursor: 'pointer'
        },
        iconBox: {
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#ffe5ec',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.25rem',
            flexShrink: 0
        },
        meta: {
            flex: 1
        },
        type: {
            margin: '0 0 4px 0',
            fontSize: '1rem',
            fontWeight: '700',
            color: '#2d3748'
        },
        sub: {
            margin: 0,
            fontSize: '0.82rem',
            color: '#a0aec0',
            fontWeight: '500'
        },
        chevron: (isOpen) => ({
            fontSize: '1rem',
            color: '#a0aec0',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
        }),
        noteBox: {
            padding: '0 16px 16px 72px',
            fontSize: '0.9rem',
            color: '#4a5568',
            lineHeight: '1.5'
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Medical History</h3>
            <div style={styles.list}>
                {data.map(record => (
                    <div key={record.id} style={styles.record(expanded === record.id)}>
                        <div
                            style={styles.recordHeader}
                            onClick={() => setExpanded(expanded === record.id ? null : record.id)}
                        >
                            <div style={styles.iconBox}>{record.icon}</div>
                            <div style={styles.meta}>
                                <h4 style={styles.type}>{record.type}</h4>
                                <p style={styles.sub}>{record.doctor} · {record.date}</p>
                            </div>
                            <span style={styles.chevron(expanded === record.id)}>▼</span>
                        </div>
                        {expanded === record.id && (
                            <div style={styles.noteBox}>{record.notes}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MedicalHistory;

import React, { useState } from 'react';

const PregnancyInfo = ({
    lmpDate = '2026-04-01',
    dueDate = '2027-01-05',
    currentWeek = 15,
    bloodType = 'O+',
    gravida = 1,
    para = 0
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ lmpDate, dueDate, bloodType, gravida, para });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        // TODO: Connect to API
        setIsEditing(false);
    };

    const infoFields = [
        { label: 'Last Menstrual Period', name: 'lmpDate', type: 'date', value: formData.lmpDate },
        { label: 'Due Date (EDD)', name: 'dueDate', type: 'date', value: formData.dueDate },
        { label: 'Blood Type', name: 'bloodType', type: 'text', value: formData.bloodType },
        { label: 'Gravida (Pregnancies)', name: 'gravida', type: 'number', value: formData.gravida },
        { label: 'Para (Deliveries)', name: 'para', type: 'number', value: formData.para }
    ];

    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
        },
        title: {
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        editBtn: {
            padding: '8px 16px',
            borderRadius: '20px',
            background: isEditing ? 'transparent' : 'rgba(251, 111, 146, 0.1)',
            color: '#fb6f92',
            border: '2px solid rgba(251, 111, 146, 0.2)',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'all 0.2s'
        },
        weekBanner: {
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            borderRadius: '16px',
            padding: '16px 20px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
        },
        weekLabel: {
            margin: 0,
            fontSize: '0.85rem',
            fontWeight: '600',
            opacity: 0.9
        },
        weekNum: {
            margin: '4px 0 0 0',
            fontSize: '2rem',
            fontWeight: '800'
        },
        weekIcon: {
            fontSize: '2.5rem'
        },
        fieldsGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
        },
        fieldGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
        },
        label: {
            fontSize: '0.78rem',
            fontWeight: '700',
            color: '#718096',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        input: {
            padding: '12px 16px',
            borderRadius: '12px',
            border: isEditing ? '2px solid #fb6f92' : '2px solid #edf2f7',
            fontSize: '0.95rem',
            color: '#2d3748',
            fontWeight: '600',
            background: isEditing ? 'white' : '#f8fafc',
            outline: 'none',
            fontFamily: "'Inter', system-ui, sans-serif",
            transition: 'border-color 0.2s'
        },
        saveBtn: {
            marginTop: '20px',
            width: '100%',
            padding: '14px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            color: 'white',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(251, 111, 146, 0.3)',
            transition: 'transform 0.2s'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Pregnancy Information</h3>
                <button
                    style={styles.editBtn}
                    onClick={() => setIsEditing(prev => !prev)}
                >
                    {isEditing ? 'Cancel' : '✏️ Edit'}
                </button>
            </div>

            <div style={styles.weekBanner}>
                <div>
                    <p style={styles.weekLabel}>Current Gestational Age</p>
                    <p style={styles.weekNum}>Week {currentWeek}</p>
                </div>
                <span style={styles.weekIcon}>👶</span>
            </div>

            <div style={styles.fieldsGrid}>
                {infoFields.map(field => (
                    <div key={field.name} style={styles.fieldGroup}>
                        <label style={styles.label}>{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            disabled={!isEditing}
                            style={styles.input}
                        />
                    </div>
                ))}
            </div>

            {isEditing && (
                <button
                    style={styles.saveBtn}
                    onClick={handleSave}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    Save Changes
                </button>
            )}
        </div>
    );
};
export default PregnancyInfo;

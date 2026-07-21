import React, { useState } from 'react';

const UserProfile = ({
    name = 'Jane Doe',
    email = 'jane.doe@example.com',
    phone = '+1 234-567-8900',
    dob = '1995-04-20',
    avatarInitials = 'JD'
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name, email, phone, dob });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        // TODO: Connect to API
        setIsEditing(false);
    };

    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        avatarSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '32px',
            paddingBottom: '32px',
            borderBottom: '1px solid #edf2f7'
        },
        avatar: {
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.75rem',
            fontWeight: '800',
            boxShadow: '0 8px 20px rgba(251, 111, 146, 0.3)',
            flexShrink: 0
        },
        avatarInfo: {
            flex: 1
        },
        userName: {
            margin: '0 0 4px 0',
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#1a202c'
        },
        userEmail: {
            margin: 0,
            fontSize: '0.95rem',
            color: '#718096'
        },
        editBtn: {
            padding: '10px 20px',
            borderRadius: '20px',
            background: isEditing ? 'transparent' : 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            color: isEditing ? '#718096' : 'white',
            border: isEditing ? '2px solid #edf2f7' : 'none',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '0.9rem',
            boxShadow: isEditing ? 'none' : '0 4px 15px rgba(251, 111, 146, 0.3)',
            transition: 'all 0.2s'
        },
        fieldsGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
        },
        fieldGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
        },
        label: {
            fontSize: '0.8rem',
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
            marginTop: '24px',
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
            <div style={styles.avatarSection}>
                <div style={styles.avatar}>{avatarInitials}</div>
                <div style={styles.avatarInfo}>
                    <h2 style={styles.userName}>{formData.name}</h2>
                    <p style={styles.userEmail}>{formData.email}</p>
                </div>
                <button
                    style={styles.editBtn}
                    onClick={() => setIsEditing(prev => !prev)}
                >
                    {isEditing ? 'Cancel' : '✏️ Edit'}
                </button>
            </div>

            <div style={styles.fieldsGrid}>
                {[
                    { label: 'Full Name', name: 'name', type: 'text' },
                    { label: 'Email Address', name: 'email', type: 'email' },
                    { label: 'Phone Number', name: 'phone', type: 'tel' },
                    { label: 'Date of Birth', name: 'dob', type: 'date' }
                ].map(field => (
                    <div key={field.name} style={styles.fieldGroup}>
                        <label style={styles.label}>{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
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
export default UserProfile;

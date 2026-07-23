import React from 'react';

const EmergencyContacts = ({ contacts = [] }) => {
    const defaultContacts = [
        { id: 1, name: 'Dr. Jane Smith', role: 'Obstetrician', phone: '+1 234-567-8900' },
        { id: 2, name: 'National Emergency', role: 'Ambulance/Police', phone: '911' },
        { id: 3, name: 'John Doe', role: 'Husband / Partner', phone: '+1 987-654-3210' }
    ];

    const data = contacts.length > 0 ? contacts : defaultContacts;

    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            width: '100%',
            boxSizing: 'border-box'
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
        contactCard: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '16px',
            border: '1px solid #edf2f7'
        },
        info: {
            display: 'flex',
            flexDirection: 'column'
        },
        name: {
            margin: '0 0 4px 0',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#2d3748'
        },
        role: {
            margin: 0,
            fontSize: '0.85rem',
            color: '#718096'
        },
        callButton: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(56, 161, 105, 0.3)',
            transition: 'transform 0.2s',
            textDecoration: 'none'
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Emergency Contacts</h3>
            <div style={styles.list}>
                {data.map(contact => (
                    <div key={contact.id} style={styles.contactCard}>
                        <div style={styles.info}>
                            <h4 style={styles.name}>{contact.name}</h4>
                            <p style={styles.role}>{contact.role}</p>
                        </div>
                        <a 
                            href={`tel:${contact.phone}`}
                            style={styles.callButton}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default EmergencyContacts;

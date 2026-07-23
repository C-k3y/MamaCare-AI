import React from 'react';

const EmptyState = ({ title, description, icon }) => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center',
            fontFamily: "'Inter', system-ui, sans-serif",
            color: '#718096'
        },
        icon: {
            fontSize: '48px',
            marginBottom: '16px',
            color: '#e2e8f0'
        },
        title: {
            margin: '0 0 8px 0',
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#2d3748'
        },
        description: {
            margin: 0,
            fontSize: '0.95rem',
            maxWidth: '300px'
        }
    };

    return (
        <div style={styles.container}>
            {icon && <div style={styles.icon}>{icon}</div>}
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.description}>{description}</p>
        </div>
    );
};
export default EmptyState;

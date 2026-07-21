import React from 'react';

const ActivityTimeline = ({ activities = [] }) => {
    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(251, 111, 146, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            width: '100%',
            boxSizing: 'border-box'
        },
        title: {
            margin: '0 0 24px 0',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        timeline: {
            position: 'relative',
            paddingLeft: '24px'
        },
        line: {
            position: 'absolute',
            left: '6px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: '#edf2f7'
        },
        item: {
            position: 'relative',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column'
        },
        dot: {
            position: 'absolute',
            left: '-24px',
            top: '4px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: '#fb6f92',
            border: '3px solid white',
            boxShadow: '0 0 0 1px #edf2f7'
        },
        itemHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '4px'
        },
        itemTitle: {
            margin: 0,
            fontSize: '1rem',
            fontWeight: '600',
            color: '#2d3748'
        },
        itemTime: {
            fontSize: '0.8rem',
            color: '#a0aec0',
            fontWeight: '500'
        },
        itemDescription: {
            margin: 0,
            fontSize: '0.9rem',
            color: '#718096',
            lineHeight: '1.4'
        }
    };

    const dummyActivities = [
        { id: 1, title: 'Logged Breakfast', time: '8:30 AM', description: 'Oatmeal with berries and prenatal vitamins.' },
        { id: 2, title: 'Blood Pressure Check', time: '10:00 AM', description: '118/75 mmHg - Normal' },
        { id: 3, title: 'Completed Walk', time: '5:45 PM', description: '20 minutes light walking.' }
    ];

    const data = activities.length > 0 ? activities : dummyActivities;

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Recent Activity</h3>
            <div style={styles.timeline}>
                <div style={styles.line}></div>
                {data.map((item, index) => (
                    <div key={item.id} style={{...styles.item, marginBottom: index === data.length - 1 ? 0 : '24px'}}>
                        <div style={styles.dot}></div>
                        <div style={styles.itemHeader}>
                            <h4 style={styles.itemTitle}>{item.title}</h4>
                            <span style={styles.itemTime}>{item.time}</span>
                        </div>
                        {item.description && (
                            <p style={styles.itemDescription}>{item.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ActivityTimeline;

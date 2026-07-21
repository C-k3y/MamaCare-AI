import React from 'react';

const MealCard = ({ type = 'Breakfast', time = '8:00 AM', items = ['Oatmeal with berries', 'Glass of milk'], calories = 350, image }) => {
    const typeIcons = {
        Breakfast: '🍳',
        Lunch: '🥗',
        Dinner: '🍲',
        Snack: '🍎'
    };

    const styles = {
        container: {
            background: 'white',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            border: '1px solid #edf2f7',
            fontFamily: "'Inter', system-ui, sans-serif",
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            marginBottom: '16px'
        },
        imageBox: {
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: '#ffe5ec',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.8rem',
            overflow: 'hidden'
        },
        img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        content: {
            flex: 1
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '8px'
        },
        title: {
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#2d3748'
        },
        timeText: {
            margin: 0,
            fontSize: '0.85rem',
            color: '#a0aec0',
            fontWeight: '500'
        },
        itemsList: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
            fontSize: '0.9rem',
            color: '#718096',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        },
        caloriesBox: {
            background: '#f8fafc',
            padding: '8px 12px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #edf2f7'
        },
        calValue: {
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '800',
            color: '#fb6f92'
        },
        calLabel: {
            margin: 0,
            fontSize: '0.75rem',
            color: '#a0aec0',
            fontWeight: '600'
        }
    };

    return (
        <div 
            style={styles.container}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(251, 111, 146, 0.1)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
            }}
        >
            <div style={styles.imageBox}>
                {image ? <img src={image} alt={type} style={styles.img} /> : typeIcons[type] || '🍽️'}
            </div>
            
            <div style={styles.content}>
                <div style={styles.header}>
                    <h3 style={styles.title}>{type}</h3>
                    <span style={styles.timeText}>{time}</span>
                </div>
                <ul style={styles.itemsList}>
                    {items.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                    ))}
                </ul>
            </div>
            
            <div style={styles.caloriesBox}>
                <p style={styles.calValue}>{calories}</p>
                <p style={styles.calLabel}>kcal</p>
            </div>
        </div>
    );
};
export default MealCard;

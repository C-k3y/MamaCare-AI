import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import MealCard from '../components/nutrition/MealCard';
import NutritionChart from '../components/nutrition/NutritionChart';
import DailyCalories from '../components/nutrition/DailyCalories';
import WaterTracker from '../components/nutrition/WaterTracker';

const Nutrition = () => {
    const styles = {
        layout: {
            display: 'flex',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fff5f7 0%, #ffe5ec 100%)',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        main: {
            marginLeft: '280px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        },
        content: {
            padding: '32px',
            flex: 1
        },
        pageHeader: {
            marginBottom: '32px'
        },
        heading: {
            margin: '0 0 4px 0',
            fontSize: '1.75rem',
            fontWeight: '800',
            color: '#1a202c'
        },
        subheading: {
            margin: 0,
            fontSize: '1rem',
            color: '#718096'
        },
        gridLayout: {
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '24px',
            alignItems: 'start'
        },
        card: {
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(251, 111, 146, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            marginBottom: '24px'
        },
        sectionTitle: {
            margin: '0 0 20px 0',
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#2d3748'
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar activeTab="nutrition" />
            <div style={styles.main}>
                <DashboardNavbar />
                <div style={styles.content}>
                    <div style={styles.pageHeader}>
                        <h1 style={styles.heading}>Nutrition Tracker</h1>
                        <p style={styles.subheading}>Monitor your meals and stay on top of your prenatal nutrition goals.</p>
                    </div>

                    <div style={styles.gridLayout}>
                        <div>
                            <div style={styles.card}>
                                <h2 style={styles.sectionTitle}>Today's Meals</h2>
                                <MealCard type="Breakfast" time="8:00 AM" items={['Oatmeal with berries', 'Prenatal vitamins', 'Glass of milk']} calories={350} />
                                <MealCard type="Lunch" time="12:30 PM" items={['Grilled chicken salad', 'Brown rice', 'Fresh orange juice']} calories={520} />
                                <MealCard type="Snack" time="3:30 PM" items={['Apple slices with peanut butter']} calories={180} />
                                <MealCard type="Dinner" time="7:00 PM" items={['Steamed salmon', 'Quinoa', 'Roasted vegetables']} calories={620} />
                            </div>
                            <NutritionChart />
                        </div>
                        <div>
                            <DailyCalories />
                            <div style={{ marginTop: '24px' }}>
                                <WaterTracker />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nutrition;

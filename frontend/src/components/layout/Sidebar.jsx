import React from 'react';

const Sidebar = ({ activeTab = 'dashboard' }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'appointments', label: 'Appointments', icon: '📅' },
        { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
        { id: 'pregnancy', label: 'Pregnancy', icon: '👶' },
        { id: 'emergency', label: 'Emergency', icon: '🚨' },
        { id: 'profile', label: 'Profile', icon: '👩' }
    ];

    const styles = {
        sidebar: {
            width: '280px',
            height: '100vh',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(251, 111, 146, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 0',
            fontFamily: "'Inter', system-ui, sans-serif",
            position: 'fixed',
            left: 0,
            top: 0,
            boxSizing: 'border-box',
            boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
        },
        logo: {
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#fb6f92',
            padding: '0 32px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        menuList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '0 16px',
            flex: 1
        },
        menuItem: (isActive) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '14px 24px',
            borderRadius: '16px',
            cursor: 'pointer',
            textDecoration: 'none',
            fontWeight: isActive ? '700' : '600',
            color: isActive ? '#fb6f92' : '#718096',
            background: isActive ? 'rgba(251, 111, 146, 0.1)' : 'transparent',
            transition: 'all 0.2s ease',
            border: isActive ? '1px solid rgba(251, 111, 146, 0.2)' : '1px solid transparent'
        }),
        logoutBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '14px 40px',
            cursor: 'pointer',
            fontWeight: '600',
            color: '#e53e3e',
            background: 'transparent',
            border: 'none',
            fontSize: '1rem',
            outline: 'none',
            marginTop: 'auto'
        }
    };

    return (
        <aside style={styles.sidebar}>
            <div style={styles.logo}>
                <span>🩺</span> MamaCare
            </div>
            
            <nav style={styles.menuList}>
                {menuItems.map(item => (
                    <a 
                        key={item.id} 
                        href={`/${item.id}`} 
                        style={styles.menuItem(activeTab === item.id)}
                        onMouseOver={(e) => {
                            if (activeTab !== item.id) {
                                e.currentTarget.style.background = 'rgba(251, 111, 146, 0.05)';
                                e.currentTarget.style.color = '#fb6f92';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (activeTab !== item.id) {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#718096';
                            }
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                        {item.label}
                    </a>
                ))}
            </nav>

            <button style={styles.logoutBtn}>
                <span>🚪</span> Logout
            </button>
        </aside>
    );
};
export default Sidebar;

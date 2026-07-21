import React from 'react';

// DoctorLayout is used for the doctor-facing portal/dashboard.
// It shares a similar structure to DashboardLayout but uses a
// teal/blue color theme to visually distinguish it from the patient view.

const DoctorLayout = ({ children, pageTitle = 'Doctor Portal' }) => {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'patients', label: 'Patients', icon: '👩‍⚕️' },
        { id: 'appointments', label: 'Appointments', icon: '📅' },
        { id: 'messages', label: 'Messages', icon: '💬' },
        { id: 'reports', label: 'Reports', icon: '📋' }
    ];

    const styles = {
        wrapper: {
            display: 'flex',
            minHeight: '100vh',
            fontFamily: "'Inter', system-ui, sans-serif",
            background: '#f0f4f8'
        },
        sidebar: {
            width: '280px',
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #2b6cb0 0%, #2c5282 100%)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 0',
            position: 'fixed',
            left: 0,
            top: 0,
            boxSizing: 'border-box',
            boxShadow: '4px 0 24px rgba(0,0,0,0.1)'
        },
        logo: {
            fontSize: '1.4rem',
            fontWeight: '800',
            color: 'white',
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
            color: isActive ? 'white' : 'rgba(255,255,255,0.65)',
            background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
            transition: 'all 0.2s ease',
            border: '1px solid transparent'
        }),
        logoutBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '14px 40px',
            cursor: 'pointer',
            fontWeight: '600',
            color: 'rgba(255,255,255,0.6)',
            background: 'transparent',
            border: 'none',
            fontSize: '1rem',
            outline: 'none',
            marginTop: 'auto'
        },
        contentArea: {
            marginLeft: '280px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        },
        topbar: {
            height: '72px',
            background: 'white',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            position: 'sticky',
            top: 0,
            zIndex: 90
        },
        pageTitle: {
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        doctorBadge: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        avatar: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2b6cb0, #63b3ed)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
        },
        doctorName: {
            margin: 0,
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#2d3748'
        },
        main: {
            flex: 1,
            padding: '32px 40px',
            boxSizing: 'border-box'
        }
    };

    return (
        <div style={styles.wrapper}>
            {/* Doctor Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.logo}>
                    <span>🏥</span> MamaCare MD
                </div>
                <nav style={styles.menuList}>
                    {menuItems.map(item => (
                        <a
                            key={item.id}
                            href={`/doctor/${item.id}`}
                            style={styles.menuItem(false)}
                            onMouseOver={e => {
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                                e.currentTarget.style.background = 'transparent';
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

            {/* Main Content */}
            <div style={styles.contentArea}>
                <div style={styles.topbar}>
                    <h2 style={styles.pageTitle}>{pageTitle}</h2>
                    <div style={styles.doctorBadge}>
                        <div style={styles.avatar}>DR</div>
                        <p style={styles.doctorName}>Dr. Jane Smith</p>
                    </div>
                </div>
                <main style={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
};
export default DoctorLayout;

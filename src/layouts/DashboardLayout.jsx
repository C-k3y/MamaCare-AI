import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';

const DashboardLayout = ({ children, activeTab = 'dashboard', pageTitle = 'Dashboard' }) => {
    const styles = {
        wrapper: {
            display: 'flex',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fff0f3 0%, #fce4ec 60%, #f8f9fa 100%)',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        // Sidebar is fixed (width 280px) — see Sidebar.jsx
        contentArea: {
            marginLeft: '280px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        },
        main: {
            flex: 1,
            padding: '32px 40px',
            boxSizing: 'border-box'
        }
    };

    return (
        <div style={styles.wrapper}>
            <Sidebar activeTab={activeTab} />
            <div style={styles.contentArea}>
                <DashboardNavbar title={pageTitle} />
                <main style={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
};
export default DashboardLayout;

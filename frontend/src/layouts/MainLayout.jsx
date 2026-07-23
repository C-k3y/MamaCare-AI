import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = ({ children }) => {
    const styles = {
        wrapper: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #fff0f3 0%, #fce4ec 50%, #f3e5f5 100%)',
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        main: {
            flex: 1,
            paddingTop: '80px' // offset for fixed Navbar height
        }
    };

    return (
        <div style={styles.wrapper}>
            <Navbar />
            <main style={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    );
};
export default MainLayout;

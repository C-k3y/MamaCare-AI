import React from 'react';

const AuthLayout = ({ children }) => {
    const styles = {
        page: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #ffe5ec 0%, #ffc2d1 50%, #ffb3c6 100%)',
            fontFamily: "'Inter', system-ui, sans-serif",
            padding: '24px',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden'
        },
        // Decorative blurred blobs in the background
        blobTopRight: {
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(251, 111, 146, 0.3)',
            filter: 'blur(80px)',
            zIndex: 0
        },
        blobBottomLeft: {
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(255, 143, 171, 0.25)',
            filter: 'blur(60px)',
            zIndex: 0
        },
        contentWrapper: {
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '460px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
        },
        logo: {
            fontSize: '1.75rem',
            fontWeight: '800',
            color: '#c9184a',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            letterSpacing: '-0.02em'
        },
        tagline: {
            margin: 0,
            fontSize: '0.9rem',
            color: '#c9184a',
            opacity: 0.7,
            fontWeight: '500'
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.blobTopRight}></div>
            <div style={styles.blobBottomLeft}></div>

            <div style={styles.contentWrapper}>
                <div style={{ textAlign: 'center' }}>
                    <div style={styles.logo}>
                        <span>🩺</span> MamaCare AI
                    </div>
                    <p style={styles.tagline}>Your intelligent pregnancy companion</p>
                </div>

                {children}
            </div>
        </div>
    );
};
export default AuthLayout;

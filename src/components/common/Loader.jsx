import React from 'react';

const Loader = ({ fullScreen = false }) => {
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: fullScreen ? '100vh' : '100%',
            width: '100%',
            position: fullScreen ? 'fixed' : 'relative',
            top: 0,
            left: 0,
            background: fullScreen ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
            backdropFilter: fullScreen ? 'blur(4px)' : 'none',
            zIndex: fullScreen ? 9999 : 1
        },
        spinner: {
            width: '50px',
            height: '50px',
            border: '4px solid #ffe5ec',
            borderTop: '4px solid #fb6f92',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
            <div style={styles.spinner}></div>
        </div>
    );
};
export default Loader;

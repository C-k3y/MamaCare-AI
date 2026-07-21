import React from 'react';

const Spinner = ({ size = '24px', color = '#fb6f92' }) => {
    const styles = {
        spinner: {
            width: size,
            height: size,
            border: `3px solid rgba(0,0,0,0.1)`,
            borderTop: `3px solid ${color}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            display: 'inline-block'
        }
    };

    return (
        <>
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
            <div style={styles.spinner}></div>
        </>
    );
};
export default Spinner;

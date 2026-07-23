import React from 'react';

const HospitalMap = () => {
    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            width: '100%',
            boxSizing: 'border-box'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
        },
        title: {
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c'
        },
        badge: {
            padding: '6px 12px',
            borderRadius: '16px',
            background: '#e6fffa',
            color: '#319795',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase'
        },
        mapWrapper: {
            width: '100%',
            height: '250px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#edf2f7',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        mockMapBg: {
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'radial-gradient(#cbd5e0 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.5
        },
        hospitalPin: {
            position: 'absolute',
            fontSize: '24px',
            filter: 'drop-shadow(0 4px 6px rgba(229,62,62,0.4))',
            cursor: 'pointer',
            transition: 'transform 0.2s'
        },
        overlayBox: {
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            background: 'white',
            padding: '12px 16px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        hospitalName: {
            margin: '0 0 4px 0',
            fontSize: '0.95rem',
            fontWeight: '700',
            color: '#2d3748'
        },
        hospitalDist: {
            margin: 0,
            fontSize: '0.8rem',
            color: '#718096'
        },
        directionsBtn: {
            background: 'linear-gradient(135deg, #fb6f92 0%, #ff8fab 100%)',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Nearby Hospitals</h3>
                <span style={styles.badge}>3 Found</span>
            </div>
            
            <div style={styles.mapWrapper}>
                <div style={styles.mockMapBg}></div>
                
                {/* Mock pins */}
                <div 
                    style={{...styles.hospitalPin, top: '40%', left: '30%'}} 
                    title="City Hospital"
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >🏥</div>
                <div 
                    style={{...styles.hospitalPin, top: '20%', left: '70%'}} 
                    title="Maternity Ward"
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >🏥</div>
                <div 
                    style={{...styles.hospitalPin, top: '60%', left: '50%'}} 
                    title="General Clinic"
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >🏥</div>

                <div style={styles.overlayBox}>
                    <div>
                        <h4 style={styles.hospitalName}>City Maternity Hospital</h4>
                        <p style={styles.hospitalDist}>1.2 miles away • 5 mins ETA</p>
                    </div>
                    <button style={styles.directionsBtn}>Directions</button>
                </div>
            </div>
        </div>
    );
};
export default HospitalMap;

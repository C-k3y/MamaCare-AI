import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { appointmentApi } from '../api/appointmentApi';

const VideoConsultation = () => {
    const { id } = useParams(); // Appointment ID
    const navigate = useNavigate();
    
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [sessionStatus, setSessionStatus] = useState('joining');
    const [duration, setDuration] = useState(0);
    const [roomDetails, setRoomDetails] = useState(null);

    useEffect(() => {
        let interval;
        if (sessionStatus === 'in_progress') {
            interval = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [sessionStatus]);

    useEffect(() => {
        const join = async () => {
            try {
                const res = await appointmentApi.joinRoom(id);
                setRoomDetails(res.data);
                // Simulate a tiny delay for connecting to WebRTC server
                setTimeout(() => {
                    setSessionStatus('in_progress');
                }, 1500);
            } catch (err) {
                console.error("Failed to join room", err);
                alert("Failed to join the video room. It may not be ready.");
                navigate('/appointments');
            }
        };
        join();
    }, [id, navigate]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleEndCall = () => {
        setSessionStatus('ended');
        setTimeout(() => navigate('/appointments'), 2000);
    };

    const styles = {
        layout: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            background: '#1a202c',
            fontFamily: "'Inter', system-ui, sans-serif",
            color: 'white'
        },
        header: {
            padding: '20px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0,0,0,0.3)'
        },
        videoArea: {
            flex: 1,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px'
        },
        mainVideo: {
            width: '100%',
            height: '100%',
            background: '#2d3748',
            borderRadius: '24px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        },
        selfVideo: {
            position: 'absolute',
            bottom: '32px',
            right: '32px',
            width: '240px',
            height: '160px',
            background: '#4a5568',
            borderRadius: '16px',
            border: '3px solid white',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        controls: {
            padding: '32px',
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)'
        },
        btn: (type) => ({
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: type === 'end' ? '#e53e3e' : 'rgba(255,255,255,0.1)',
            color: 'white',
            backdropFilter: 'blur(12px)'
        })
    };

    if (sessionStatus === 'ended') {
        return (
            <div style={{ ...styles.layout, justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ marginBottom: '16px' }}>Consultation Ended</h1>
                <p style={{ color: '#a0aec0' }}>Returning to appointments...</p>
            </div>
        );
    }

    return (
        <div style={styles.layout}>
            <div style={styles.header}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Telemedicine Consultation</h2>
                    <p style={{ margin: '4px 0 0 0', color: '#a0aec0', fontSize: '0.9rem' }}>
                        {sessionStatus === 'joining' ? 'Connecting to secure room...' : `Session active · ${formatTime(duration)}`}
                    </p>
                </div>
                <div style={{ background: 'rgba(251,111,146,0.2)', color: '#fb6f92', padding: '8px 16px', borderRadius: '100px', fontWeight: '700', fontSize: '0.85rem' }}>
                    End-to-End Encrypted
                </div>
            </div>

            <div style={styles.videoArea}>
                <div style={styles.mainVideo}>
                    {sessionStatus === 'joining' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '60px', height: '60px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                            <p style={{ marginTop: '24px', fontWeight: '600' }}>Waiting for Doctor to join...</p>
                        </div>
                    ) : (
                        <div style={{ fontSize: '1.5rem', color: '#a0aec0' }}>Doctor's Video Stream (SDK Placeholder)</div>
                    )}
                    
                    <div style={styles.selfVideo}>
                        {isVideoOff ? (
                            <span style={{ fontSize: '2rem' }}>👤</span>
                        ) : (
                            <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Your Camera</span>
                        )}
                    </div>
                </div>
            </div>

            <div style={styles.controls}>
                <button 
                    style={{ ...styles.btn('toggle'), background: isMuted ? 'rgba(229,62,62,0.8)' : 'rgba(255,255,255,0.1)' }} 
                    onClick={() => setIsMuted(!isMuted)}
                >
                    {isMuted ? '🔇' : '🎤'}
                </button>
                <button 
                    style={{ ...styles.btn('toggle'), background: isVideoOff ? 'rgba(229,62,62,0.8)' : 'rgba(255,255,255,0.1)' }} 
                    onClick={() => setIsVideoOff(!isVideoOff)}
                >
                    {isVideoOff ? '🚫' : '📹'}
                </button>
                <button style={styles.btn('toggle')}>
                    💬
                </button>
                <button style={styles.btn('end')} onClick={handleEndCall}>
                    ☎️
                </button>
            </div>
        </div>
    );
};

export default VideoConsultation;

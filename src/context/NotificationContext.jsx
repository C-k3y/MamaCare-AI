import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((notification) => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const newNotification = { 
            id, 
            type: 'info', // success, error, warning, info
            duration: 5000, 
            ...notification 
        };
        
        setNotifications((prev) => [...prev, newNotification]);
        
        if (newNotification.duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, newNotification.duration);
        }
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    return (
        <NotificationContext.Provider value={{ 
            notifications, 
            addNotification, 
            removeNotification, 
            clearNotifications 
        }}>
            {children}
            <div style={{
                position: 'fixed',
                top: '24px',
                right: '24px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                pointerEvents: 'none',
            }}>
                {notifications.map((notif) => {
                    const bgColors = {
                        success: 'rgba(46, 204, 113, 0.85)',
                        error: 'rgba(231, 76, 60, 0.85)',
                        warning: 'rgba(241, 196, 15, 0.85)',
                        info: 'rgba(52, 152, 219, 0.85)',
                    };
                    const bgColor = bgColors[notif.type] || bgColors.info;
                    
                    return (
                        <div key={notif.id} style={{
                            pointerEvents: 'auto',
                            background: bgColor,
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            color: 'white',
                            padding: '16px 24px',
                            borderRadius: '16px',
                            boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            minWidth: '320px',
                            maxWidth: '420px',
                            animation: 'slideInToast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {notif.title && (
                                    <span style={{ fontWeight: '600', marginBottom: '6px', fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                                        {notif.title}
                                    </span>
                                )}
                                <span style={{ fontSize: '0.95rem', opacity: 0.95, lineHeight: '1.4' }}>
                                    {notif.message || notif.text || 'Notification'}
                                </span>
                            </div>
                            <button 
                                onClick={() => removeNotification(notif.id)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    marginLeft: '16px',
                                    opacity: 0.7,
                                    transition: 'opacity 0.2s',
                                    fontSize: '1.4rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    outline: 'none'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                                onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
                            >
                                &times;
                            </button>
                        </div>
                    );
                })}
                <style>
                    {`
                    @keyframes slideInToast {
                        from { transform: translateX(120%) scale(0.9); opacity: 0; }
                        to { transform: translateX(0) scale(1); opacity: 1; }
                    }
                    `}
                </style>
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);

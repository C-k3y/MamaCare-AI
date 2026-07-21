import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Failed to parse stored user", e);
                }
            } else {
                // Mock user data if none exists but is authenticated
                const mockUser = {
                    name: 'Guest User',
                    email: 'guest@mamacare.ai',
                    avatar: null
                };
                setUser(mockUser);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [isAuthenticated]);

    const updateUser = (userData) => {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                fontFamily: "'Inter', sans-serif"
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    padding: '40px 60px',
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.4)'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid rgba(138, 43, 226, 0.2)',
                        borderTop: '4px solid #8a2be2',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '20px'
                    }} />
                    <style>
                        {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                        `}
                    </style>
                    <h2 style={{
                        margin: 0,
                        color: '#2d3748',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        letterSpacing: '-0.02em'
                    }}>Loading Profile...</h2>
                </div>
            </div>
        );
    }

    return (
        <UserContext.Provider value={{ 
            user, 
            updateUser, 
            clearUser, 
            loading 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

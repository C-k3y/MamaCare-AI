import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES, ROLE_HOME } from '../constants/roles';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('userRole');
        
        if (storedToken && storedRole) {
            setToken(storedToken);
            setUserRole(storedRole);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (newToken, role) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('userRole', role);
        setToken(newToken);
        setUserRole(role);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user'); // clear user data as well
        setToken(null);
        setUserRole(null);
        setIsAuthenticated(false);
    };

    const getHomeRoute = () => {
        if (!userRole) return '/login';
        return ROLE_HOME[userRole] || '/dashboard';
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
                        border: '4px solid rgba(255, 105, 180, 0.2)',
                        borderTop: '4px solid #ff69b4',
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
                    }}>Authenticating...</h2>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            token, 
            userRole, 
            login, 
            logout, 
            loading,
            getHomeRoute,
            isPatient: userRole === ROLES.PATIENT,
            isDoctor: userRole === ROLES.DOCTOR,
            isAdmin: userRole === ROLES.ADMIN
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ restricted = false }) => {
    const { isAuthenticated, getHomeRoute } = useAuth();

    if (isAuthenticated && restricted) {
        return <Navigate to={getHomeRoute()} replace />;
    }

    return <Outlet />;
};

export default PublicRoute;

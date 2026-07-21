import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, userRole, getHomeRoute } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to={getHomeRoute()} replace />;
    }

    return <Outlet />;
};

export default RoleProtectedRoute;

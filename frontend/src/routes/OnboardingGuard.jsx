import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../api/userApi';
import MotherOnboarding from '../pages/MotherOnboarding';

const OnboardingGuard = () => {
    const { userRole, isAuthenticated } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated && userRole === 'mother') {
            userApi.getMotherProfile()
                .then(res => {
                    setProfile(res.data);
                })
                .catch(err => {
                    console.error("Failed to fetch mother profile", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, userRole]);

    if (loading) {
        return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>;
    }

    if (userRole === 'mother') {
        if (!profile || !profile.is_approved) {
            return <MotherOnboarding profile={profile} />;
        }
    }

    return <Outlet />;
};

export default OnboardingGuard;

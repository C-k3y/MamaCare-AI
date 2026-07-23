import API_ROUTES from '../constants/apiRoutes';

/**
 * Service for emergency requests
 */
export const emergencyService = {
    triggerEmergency: async (location, token) => {
        const res = await fetch(API_ROUTES.EMERGENCY.TRIGGER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ location })
        });
        if (!res.ok) throw new Error('Failed to trigger emergency alert');
        return await res.json();
    }
};

export default emergencyService;

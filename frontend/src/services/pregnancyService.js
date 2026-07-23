import API_ROUTES from '../constants/apiRoutes';

/**
 * Service for pregnancy tracking data
 */
export const pregnancyService = {
    getTrackerData: async (token) => {
        const res = await fetch(API_ROUTES.PREGNANCY.TRACKER, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch pregnancy data');
        return await res.json();
    },

    updateSymptoms: async (symptoms, token) => {
        const res = await fetch(API_ROUTES.PREGNANCY.SYMPTOMS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ symptoms })
        });
        if (!res.ok) throw new Error('Failed to update symptoms');
        return await res.json();
    }
};

export default pregnancyService;

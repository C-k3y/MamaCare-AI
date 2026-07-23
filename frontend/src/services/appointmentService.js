import API_ROUTES from '../constants/apiRoutes';

/**
 * Service for appointment-related requests
 */
export const appointmentService = {
    getUpcoming: async (token) => {
        const res = await fetch(API_ROUTES.APPOINTMENTS.UPCOMING, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch appointments');
        return await res.json();
    },
    
    bookAppointment: async (appointmentData, token) => {
        const res = await fetch(API_ROUTES.APPOINTMENTS.BOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(appointmentData)
        });
        if (!res.ok) throw new Error('Failed to book appointment');
        return await res.json();
    },

    cancelAppointment: async (id, token) => {
        const res = await fetch(API_ROUTES.APPOINTMENTS.CANCEL(id), {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to cancel appointment');
        return await res.json();
    }
};

export default appointmentService;

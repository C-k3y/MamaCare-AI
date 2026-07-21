import API_ROUTES from '../constants/apiRoutes';

/**
 * Service for fetching remote notifications
 */
export const notificationService = {
    getUnread: async (token) => {
        const res = await fetch(API_ROUTES.MESSAGES.UNREAD, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch notifications');
        return await res.json();
    }
};

export default notificationService;

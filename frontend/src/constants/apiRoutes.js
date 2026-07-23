/**
 * API Route Constants
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
        FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
        RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
        ME: `${API_BASE_URL}/auth/me`
    },
    USERS: {
        PROFILE: `${API_BASE_URL}/users/profile`,
        UPDATE_PROFILE: `${API_BASE_URL}/users/profile/update`,
        SETTINGS: `${API_BASE_URL}/users/settings`
    },
    APPOINTMENTS: {
        BASE: `${API_BASE_URL}/appointments`,
        UPCOMING: `${API_BASE_URL}/appointments/upcoming`,
        HISTORY: `${API_BASE_URL}/appointments/history`,
        BOOK: `${API_BASE_URL}/appointments/book`,
        CANCEL: (id) => `${API_BASE_URL}/appointments/${id}/cancel`
    },
    NUTRITION: {
        MEAL_PLANS: `${API_BASE_URL}/nutrition/meal-plans`,
        LOG: `${API_BASE_URL}/nutrition/log`,
        WATER: `${API_BASE_URL}/nutrition/water`
    },
    PREGNANCY: {
        TRACKER: `${API_BASE_URL}/pregnancy/tracker`,
        MILESTONES: `${API_BASE_URL}/pregnancy/milestones`,
        SYMPTOMS: `${API_BASE_URL}/pregnancy/symptoms`
    },
    EMERGENCY: {
        CONTACTS: `${API_BASE_URL}/emergency/contacts`,
        TRIGGER: `${API_BASE_URL}/emergency/trigger`
    },
    MESSAGES: {
        BASE: `${API_BASE_URL}/messages`,
        UNREAD: `${API_BASE_URL}/messages/unread`
    },
    REPORTS: {
        BASE: `${API_BASE_URL}/reports`,
        DOWNLOAD: (id) => `${API_BASE_URL}/reports/${id}/download`
    }
};

export default API_ROUTES;

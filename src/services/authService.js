import API_ROUTES from '../constants/apiRoutes';

/**
 * Service for authentication-related requests
 */
export const authService = {
    login: async (credentials) => {
        const res = await fetch(API_ROUTES.AUTH.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) throw new Error('Login failed');
        return await res.json();
    },
    
    register: async (userData) => {
        const res = await fetch(API_ROUTES.AUTH.REGISTER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!res.ok) throw new Error('Registration failed');
        return await res.json();
    }
};

export default authService;

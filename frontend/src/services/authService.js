import axiosInstance from '../api/axios';

/**
 * Service for authentication-related requests to the Django backend
 */
export const authService = {
    login: async (credentials) => {
        const res = await axiosInstance.post('/users/login/', credentials);
        return {
            token: res.data.access,
            refresh: res.data.refresh,
            role: res.data.user.role,
            user: res.data.user
        };
    },

    register: async (userData) => {
        // Mapping frontend payload to backend expected fields
        const payload = {
            username: userData.name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000), // Auto-generate simple username
            email: userData.email,
            password: userData.password,
            first_name: userData.name.split(' ')[0],
            last_name: userData.name.split(' ').slice(1).join(' '),
            role: userData.role || 'mother'
        };

        const res = await axiosInstance.post('/users/register/', payload);
        return {
            token: res.data.access,
            refresh: res.data.refresh,
            role: res.data.user.role,
            user: res.data.user
        };
    },

    logout: async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            try {
                await axiosInstance.post('/users/logout/', { refresh_token: refreshToken });
            } catch (error) {
                console.error("Logout failed on backend", error);
            }
        }
    }
};

export default authService;

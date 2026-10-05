import axiosInstance from '../api/axios';

/**
 * Service for authentication-related requests to the Django backend
 */
export const authService = {
    login: async (credentials) => {
        try {
            const res = await axiosInstance.post('/users/login/', credentials);
            return {
                token: res.data.access,
                refresh: res.data.refresh,
                role: res.data.user.role,
                user: res.data.user
            };
        } catch (error) {
            if (error.response && error.response.data) {
                const msg = error.response.data.detail || error.response.data.email?.[0] || error.response.data.password?.[0] || JSON.stringify(error.response.data);
                throw new Error(msg);
            }
            throw error;
        }
    },

    register: async (userData) => {
        const payload = {
            username: userData.name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
            email: userData.email,
            password: userData.password,
            first_name: userData.name.split(' ')[0],
            last_name: userData.name.split(' ').slice(1).join(' '),
            role: userData.role || 'mother'
        };

        try {
            const res = await axiosInstance.post('/users/register/', payload);
            return {
                token: res.data.access,
                refresh: res.data.refresh,
                role: res.data.user.role,
                user: res.data.user
            };
        } catch (error) {
            if (error.response && error.response.data) {
                const msg = error.response.data.detail || error.response.data.email?.[0] || error.response.data.password?.[0] || JSON.stringify(error.response.data);
                throw new Error(msg);
            }
            throw error;
        }
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

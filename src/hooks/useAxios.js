import { useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_ROUTES from '../constants/apiRoutes';

/**
 * Custom hook that creates an axios instance with request/response interceptors.
 * It automatically injects the auth token into requests and handles 401 errors.
 */
export const useAxios = () => {
    const { token, logout } = useAuth();

    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            // Fallback to a localhost URL if the env var isn't set
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Request Interceptor: Attach Token
        instance.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response Interceptor: Handle 401 Unauthorized globally
        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // Token expired or invalid, trigger logout flow
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }, [token, logout]);

    return axiosInstance;
};

export default useAxios;

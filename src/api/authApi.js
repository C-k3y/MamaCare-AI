import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const authApi = {
    login: (credentials) => axiosInstance.post(API_ROUTES.AUTH.LOGIN, credentials),
    register: (userData) => axiosInstance.post(API_ROUTES.AUTH.REGISTER, userData),
    forgotPassword: (email) => axiosInstance.post(API_ROUTES.AUTH.FORGOT_PASSWORD, { email }),
    resetPassword: (data) => axiosInstance.post(API_ROUTES.AUTH.RESET_PASSWORD, data),
    getMe: () => axiosInstance.get(API_ROUTES.AUTH.ME),
};

export default authApi;

import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const userApi = {
    getProfile: () => axiosInstance.get(API_ROUTES.USERS.PROFILE),
    updateProfile: (profileData) => axiosInstance.post(API_ROUTES.USERS.UPDATE_PROFILE, profileData),
    getSettings: () => axiosInstance.get(API_ROUTES.USERS.SETTINGS),
    updateSettings: (settings) => axiosInstance.post(API_ROUTES.USERS.SETTINGS, settings),
};

export default userApi;

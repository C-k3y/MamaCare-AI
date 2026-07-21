import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const emergencyApi = {
    trigger: (location) => axiosInstance.post(API_ROUTES.EMERGENCY.TRIGGER, { location }),
    getContacts: () => axiosInstance.get(API_ROUTES.EMERGENCY.CONTACTS),
};

export default emergencyApi;

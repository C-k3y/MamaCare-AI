import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const appointmentApi = {
    getUpcoming: () => axiosInstance.get(API_ROUTES.APPOINTMENTS.UPCOMING),
    getHistory: () => axiosInstance.get(API_ROUTES.APPOINTMENTS.HISTORY),
    book: (appointmentData) => axiosInstance.post(API_ROUTES.APPOINTMENTS.BOOK, appointmentData),
    cancel: (id) => axiosInstance.post(API_ROUTES.APPOINTMENTS.CANCEL(id)),
};

export default appointmentApi;

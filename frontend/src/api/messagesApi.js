import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const messagesApi = {
    getMessages: () => axiosInstance.get(`${API_ROUTES.MESSAGES.BASE}/`),
    getUnread: () => axiosInstance.get(`${API_ROUTES.MESSAGES.UNREAD}/`),
};

export default messagesApi;

import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const notificationApi = {
    getUnread: () => axiosInstance.get(API_ROUTES.MESSAGES.UNREAD),
};

export default notificationApi;

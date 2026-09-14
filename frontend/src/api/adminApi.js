import axiosInstance from './axios';

export const adminApi = {
    getAuditLogs: () => axiosInstance.get('/records/audit-logs/'),
    getAnalytics: () => axiosInstance.get('/users/admin/analytics/'),
};

export default adminApi;

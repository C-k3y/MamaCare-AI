import axiosInstance from './axios';

export const adminApi = {
    getAuditLogs: () => axiosInstance.get('/records/audit-logs/'),
    getAnalytics: () => axiosInstance.get('/users/admin/analytics/'),
    uploadProfilePicture: (formData) => axiosInstance.patch('/users/profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export default adminApi;

import axiosInstance from './axios';

export const adminApi = {
    getAuditLogs: () => axiosInstance.get('/records/audit-logs/'),
};

export default adminApi;

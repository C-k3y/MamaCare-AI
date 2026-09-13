import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const recordsApi = {
    // Pregnancy Records
    getPregnancies: () => axiosInstance.get(API_ROUTES.RECORDS.PREGNANCIES),
    createPregnancy: (data) => axiosInstance.post(API_ROUTES.RECORDS.PREGNANCIES, data),
    getPregnancy: (id) => axiosInstance.get(`${API_ROUTES.RECORDS.PREGNANCIES}${id}/`),
    updatePregnancy: (id, data) => axiosInstance.patch(`${API_ROUTES.RECORDS.PREGNANCIES}${id}/`, data),

    // Vitals Records
    getVitals: () => axiosInstance.get(API_ROUTES.RECORDS.VITALS),
    createVital: (data) => axiosInstance.post(API_ROUTES.RECORDS.VITALS, data),

    // Medical Documents
    getDocuments: () => axiosInstance.get(API_ROUTES.RECORDS.DOCUMENTS),
    uploadDocument: (data) => axiosInstance.post(API_ROUTES.RECORDS.DOCUMENTS, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
};

export default recordsApi;

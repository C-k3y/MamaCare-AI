import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const aiApi = {
    checkSymptoms: (message) => axiosInstance.post(`${API_ROUTES.MESSAGES.BASE}/symptom-check/`, { message }),
    generateMealPlan: (preferences) => axiosInstance.post(`${API_ROUTES.NUTRITION.MEAL_PLANS}/generate`, preferences),
    getRisks: () => axiosInstance.get('/risks/'),
};

export default aiApi;

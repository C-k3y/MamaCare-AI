import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const aiApi = {
    checkSymptoms: (symptoms) => axiosInstance.post(`${API_ROUTES.MESSAGES.BASE}/symptom-check`, { symptoms }),
    generateMealPlan: (preferences) => axiosInstance.post(`${API_ROUTES.NUTRITION.MEAL_PLANS}/generate`, preferences),
};

export default aiApi;

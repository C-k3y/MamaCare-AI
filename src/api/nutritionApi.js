import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const nutritionApi = {
    getMealPlans: () => axiosInstance.get(API_ROUTES.NUTRITION.MEAL_PLANS),
    logMeal: (mealData) => axiosInstance.post(API_ROUTES.NUTRITION.LOG, mealData),
    logWater: (amount) => axiosInstance.post(API_ROUTES.NUTRITION.WATER, { amount }),
};

export default nutritionApi;

import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const nutritionApi = {
    getMealPlans: () => axiosInstance.get(API_ROUTES.NUTRITION.MEAL_PLANS),
    getNutritionLogs: () => axiosInstance.get(API_ROUTES.NUTRITION.LOG),
    logMeal: (mealData) => axiosInstance.post(API_ROUTES.NUTRITION.LOG, mealData),
    getWaterLogs: () => axiosInstance.get(API_ROUTES.NUTRITION.WATER),
    logWater: (amount) => axiosInstance.post(API_ROUTES.NUTRITION.WATER, { amount_ml: amount }),
};

export default nutritionApi;

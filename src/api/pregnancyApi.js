import axiosInstance from './axios';
import { API_ROUTES } from '../constants/apiRoutes';

export const pregnancyApi = {
    getTrackerData: () => axiosInstance.get(API_ROUTES.PREGNANCY.TRACKER),
    updateSymptoms: (symptoms) => axiosInstance.post(API_ROUTES.PREGNANCY.SYMPTOMS, { symptoms }),
    getMilestones: () => axiosInstance.get(API_ROUTES.PREGNANCY.MILESTONES),
};

export default pregnancyApi;

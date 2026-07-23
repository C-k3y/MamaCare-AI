import API_ROUTES from '../constants/apiRoutes';

/**
 * Service for handling AI-related requests (symptom checking, chat, etc.)
 */
export const aiService = {
    checkSymptoms: async (symptoms, token) => {
        try {
            const response = await fetch(`${API_ROUTES.MESSAGES.BASE}/symptom-check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                body: JSON.stringify({ symptoms })
            });
            if (!response.ok) throw new Error('Failed to analyze symptoms');
            return await response.json();
        } catch (error) {
            console.error('AI Service Error:', error);
            throw error;
        }
    },
    
    generateMealPlan: async (preferences, token) => {
        try {
            const response = await fetch(`${API_ROUTES.NUTRITION.MEAL_PLANS}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                body: JSON.stringify(preferences)
            });
            if (!response.ok) throw new Error('Failed to generate meal plan');
            return await response.json();
        } catch (error) {
            console.error('AI Service Error:', error);
            throw error;
        }
    }
};

export default aiService;

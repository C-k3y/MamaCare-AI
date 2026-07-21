import appConfig from '../constants/appConfig';

/**
 * Utility for managing JWT tokens in local storage
 */
export const tokenManager = {
    getToken: () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(appConfig.storageKeys.authToken);
    },

    setToken: (token) => {
        if (typeof window !== 'undefined' && token) {
            localStorage.setItem(appConfig.storageKeys.authToken, token);
        }
    },

    removeToken: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(appConfig.storageKeys.authToken);
        }
    },

    // Optional: Decode JWT to check expiration (requires atob)
    isTokenValid: (token) => {
        if (!token) return false;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const { exp } = JSON.parse(jsonPayload);
            if (Date.now() >= exp * 1000) {
                return false;
            }
            return true;
        } catch (e) {
            return false; // If it can't be decoded, assume invalid
        }
    }
};

export default tokenManager;

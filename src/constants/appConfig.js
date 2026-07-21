/**
 * Global application configuration constants.
 */
const appConfig = {
    appName: 'MamaCare AI',
    version: '1.0.0',

    /** Storage keys for localStorage/sessionStorage */
    storageKeys: {
        authToken: 'mamacare_auth_token',
        user: 'mamacare_user',
        theme: 'mamacare_theme',
    },

    /** Default redirect paths */
    routes: {
        home: '/',
        login: '/login',
        dashboard: '/dashboard',
        unauthorized: '/login',
    },

    /** Token expiry in milliseconds (7 days) */
    tokenExpiry: 7 * 24 * 60 * 60 * 1000,
};

export default appConfig;

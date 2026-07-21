// ─── MOCK MODE ──────────────────────────────────────────────────────────────
// No backend is running yet. These mocks simulate API responses locally so the
// frontend can be developed and tested end-to-end.
// When a real backend is ready, delete the mock functions below and uncomment
// the real fetch calls.
// ────────────────────────────────────────────────────────────────────────────

const mockDelay = (ms = 800) => new Promise((res) => setTimeout(res, ms));

/**
 * Service for authentication-related requests
 */
export const authService = {
    login: async (credentials) => {
        await mockDelay();
        // Simulate a successful login for any non-empty credentials
        if (!credentials.email || !credentials.password) {
            throw new Error('Email and password are required.');
        }
        return {
            token: 'mock-jwt-token-' + Date.now(),
            role: 'patient',
            user: { name: credentials.email.split('@')[0], email: credentials.email, role: 'patient' }
        };

        /* ── Real implementation (uncomment when backend is ready) ──
        const res = await fetch(API_ROUTES.AUTH.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) throw new Error('Login failed');
        return await res.json();
        */
    },

    register: async (userData) => {
        await mockDelay();
        // Simulate a successful registration for any valid payload
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error('All fields are required.');
        }
        return {
            token: 'mock-jwt-token-' + Date.now(),
            role: 'patient',
            user: { name: userData.name, email: userData.email, role: 'patient' }
        };

        /* ── Real implementation (uncomment when backend is ready) ──
        const res = await fetch(API_ROUTES.AUTH.REGISTER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!res.ok) throw new Error('Registration failed');
        return await res.json();
        */
    }
};

export default authService;


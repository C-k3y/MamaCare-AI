import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            userRole: null,
            isAuthenticated: false,
            setAuth: (token, role) => set({ 
                token, 
                userRole: role, 
                isAuthenticated: true 
            }),
            logout: () => set({ 
                token: null, 
                userRole: null, 
                isAuthenticated: false 
            }),
        }),
        {
            name: 'auth-storage', // unique name
        }
    )
);

export default useAuthStore;

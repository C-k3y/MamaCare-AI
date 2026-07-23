import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
    persist(
        (set) => ({
            profile: null,
            
            setProfile: (profileData) => set({ profile: profileData }),
            
            updateProfile: (updates) => set((state) => ({
                profile: state.profile ? { ...state.profile, ...updates } : updates
            })),
            
            clearProfile: () => set({ profile: null })
        }),
        {
            name: 'user-storage',
        }
    )
);

export default useUserStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePregnancyStore = create(
    persist(
        (set) => ({
            currentWeek: 1,
            dueDate: null,
            symptoms: [],
            
            setPregnancyData: (data) => set({ ...data }),
            
            addSymptom: (symptom) => set((state) => ({
                symptoms: [...state.symptoms, symptom]
            })),
            
            clearData: () => set({
                currentWeek: 1,
                dueDate: null,
                symptoms: []
            })
        }),
        {
            name: 'pregnancy-storage',
        }
    )
);

export default usePregnancyStore;

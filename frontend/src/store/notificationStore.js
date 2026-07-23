import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
    notifications: [],
    
    addNotification: (notification) => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const newNotification = { 
            id, 
            type: 'info', 
            duration: 5000, 
            ...notification 
        };
        
        set((state) => ({
            notifications: [...state.notifications, newNotification]
        }));
        
        if (newNotification.duration > 0) {
            setTimeout(() => {
                set((state) => ({
                    notifications: state.notifications.filter((n) => n.id !== id)
                }));
            }, newNotification.duration);
        }
    },
    
    removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
    })),
    
    clearNotifications: () => set({ notifications: [] })
}));

export default useNotificationStore;

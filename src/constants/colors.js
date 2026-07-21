/**
 * Application Color Tokens (Premium Glassmorphism Palette)
 * Used for inline styling across components
 */
export const COLORS = {
    // Brand Colors
    primary: {
        main: '#8a2be2', // Blueviolet
        light: '#9b5de5',
        dark: '#5e17eb',
        gradient: 'linear-gradient(135deg, #8a2be2 0%, #ff69b4 100%)',
        transparent: 'rgba(138, 43, 226, 0.15)'
    },
    secondary: {
        main: '#ff69b4', // HotPink
        light: '#ff85c1',
        dark: '#d1478e',
        gradient: 'linear-gradient(135deg, #ff69b4 0%, #ffb6c1 100%)',
        transparent: 'rgba(255, 105, 180, 0.15)'
    },
    
    // UI Colors
    background: {
        main: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Default Light
        dark: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)', // Default Dark
        card: 'rgba(255, 255, 255, 0.65)',
        cardDark: 'rgba(26, 32, 44, 0.65)',
    },
    
    // Typography
    text: {
        primary: '#2d3748',
        secondary: '#4a5568',
        muted: '#718096',
        inverse: '#ffffff'
    },
    
    // Semantic Colors (Success, Error, Warning, Info)
    semantic: {
        success: '#10b981',
        successLight: 'rgba(16, 185, 129, 0.15)',
        error: '#ef4444',
        errorLight: 'rgba(239, 68, 68, 0.15)',
        warning: '#f59e0b',
        warningLight: 'rgba(245, 158, 11, 0.15)',
        info: '#3b82f6',
        infoLight: 'rgba(59, 130, 246, 0.15)'
    },
    
    // Glassmorphism specific values
    glass: {
        background: 'rgba(255, 255, 255, 0.65)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        backdropFilter: 'blur(12px)',
        
        // Dark mode variations
        backgroundDark: 'rgba(17, 25, 40, 0.75)',
        borderDark: '1px solid rgba(255, 255, 255, 0.125)',
        boxShadowDark: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    }
};

export default COLORS;

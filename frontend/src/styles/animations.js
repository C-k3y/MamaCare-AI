/**
 * Inline style friendly animations and keyframe strings
 * Note: To use keyframes, you must inject them using a <style> tag in the component
 */

export const KEYFRAMES = {
    spin: `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `,
    fadeIn: `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `,
    slideUp: `
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `,
    pulse: `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `
};

// Reusable transition properties for inline styles
export const transitions = {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
    bounce: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

export default { KEYFRAMES, transitions };

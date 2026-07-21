import { COLORS } from '../constants/colors';

/**
 * Standardized spacing and layout variables for inline styles
 */

export const spacing = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
};

export const typography = {
    sizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        h3: '1.5rem',
        h2: '1.875rem',
        h1: '2.25rem'
    },
    weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
    }
};

export const radii = {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    round: '50%'
};

export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
};

// Re-export colors from constants so they can be imported from here as well
export { COLORS };

export default { spacing, typography, radii, shadows, COLORS };

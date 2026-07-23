/**
 * General helper functions
 */

// Capitalize first letter of a string
export const capitalize = (str) => {
    if (typeof str !== 'string' || !str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Truncate string with ellipsis
export const truncate = (str, length = 50) => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
};

// Generate a random string/ID
export const generateId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export default { capitalize, truncate, generateId };

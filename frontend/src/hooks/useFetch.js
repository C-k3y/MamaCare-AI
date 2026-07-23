import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * A robust fetch hook for making authenticated API requests without relying on axios.
 * Handles loading states, error parsing, and JWT injection.
 */
export const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    const executeFetch = useCallback(async (fetchOptions = {}) => {
        setLoading(true);
        setError(null);
        try {
            const headers = {
                'Content-Type': 'application/json',
                ...options.headers,
                ...fetchOptions.headers,
            };

            // Inject auth token if available
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                ...options,
                ...fetchOptions,
                headers,
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || `Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            setError(err.message || 'An unexpected error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url, token, options]);

    // Optional auto-fetch on mount if `immediate` is true
    useEffect(() => {
        if (options.immediate) {
            executeFetch();
        }
    }, [executeFetch, options.immediate]);

    return { data, loading, error, executeFetch };
};

export default useFetch;

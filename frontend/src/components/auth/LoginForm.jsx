import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await authService.login(formData);
            const token = data.token || data.access_token;
            const role = data.role || data.user?.role || 'mother';
            login(token, role, data.refresh);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    // Define all styles inside this object for inline usage
    const styles = {
        page: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #ffe5ec 0%, #ffc2d1 100%)',
            padding: '20px',
            boxSizing: 'border-box'
        },
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: '0 10px 40px rgba(251, 111, 146, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            maxWidth: '400px',
            width: '100%',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            textAlign: 'center',
            boxSizing: 'border-box'
        },
        title: {
            margin: '0 0 24px 0',
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1a202c',
            letterSpacing: '-0.02em'
        },
        formGroup: {
            textAlign: 'left',
            marginBottom: '20px'
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#4a5568'
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            fontSize: '0.95rem',
            outline: 'none',
            color: '#2d3748',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box'
        },
        button: {
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(251, 111, 146, 0.3)',
            marginBottom: '24px',
            marginTop: '8px'
        },
        footerText: {
            fontSize: '0.9rem',
            color: '#718096',
            margin: '0 0 8px 0'
        },
        link: {
            color: '#fb6f92',
            fontWeight: '600',
            textDecoration: 'none'
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Login</h1>
                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input type="email" id="email" name="email" style={styles.input} value={formData.email} onChange={handleChange} required />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Password:</label>
                        <input type="password" id="password" name="password" style={styles.input} value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" style={styles.button} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                </form>
                <p style={styles.footerText}>
                    Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
                </p>
                <p style={styles.footerText}>
                    <Link to="/forgot-password" style={styles.link}>Forgot your password?</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
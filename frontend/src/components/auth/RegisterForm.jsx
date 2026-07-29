import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

const RegisterForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    // Inline styles matching the app's premium glassmorphism theme
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
            maxWidth: '450px',
            width: '100%',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            textAlign: 'center',
            boxSizing: 'border-box'
        },
        title: {
            margin: '0 0 8px 0',
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1a202c',
            letterSpacing: '-0.02em'
        },
        description: {
            margin: '0 0 24px 0',
            fontSize: '0.95rem',
            color: '#718096',
            lineHeight: '1.5'
        },
        formGroup: {
            textAlign: 'left',
            marginBottom: '16px'
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
            background: loading
                ? 'linear-gradient(135deg, #ffb3c6 0%, #fca5b8 100%)'
                : 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(251, 111, 146, 0.3)',
            marginBottom: '24px',
            marginTop: '8px',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s'
        },
        errorMsg: {
            background: 'rgba(254, 202, 202, 0.6)',
            border: '1px solid #fca5a5',
            color: '#b91c1c',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '16px',
            fontSize: '0.875rem',
            textAlign: 'left'
        },
        successMsg: {
            background: 'rgba(187, 247, 208, 0.6)',
            border: '1px solid #86efac',
            color: '#15803d',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '16px',
            fontSize: '0.875rem',
            textAlign: 'left'
        },
        footerText: {
            fontSize: '0.9rem',
            color: '#718096',
            margin: '0'
        },
        link: {
            color: '#fb6f92',
            fontWeight: '600',
            textDecoration: 'none'
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.fullName.trim()) {
            setError("Full name is required.");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const data = await authService.register({
                name: formData.fullName,
                email: formData.email,
                password: formData.password
            });
            const token = data.token || data.access_token;
            const role = data.role || data.user?.role || 'patient';
            login(token, role);
            setSuccess('Account created successfully! Redirecting…');
            setTimeout(() => navigate('/dashboard'), 1200);
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Create Account</h1>
                <p style={styles.description}>Join Mamacare AI and start your journey.</p>
                <form onSubmit={handleSubmit}>
                    {error && <div style={styles.errorMsg}>{error}</div>}
                    {success && <div style={styles.successMsg}>{success}</div>}
                    <div style={styles.formGroup}>
                        <label htmlFor="fullName" style={styles.label}>Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            style={styles.input}
                            placeholder="Jane Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            style={styles.input}
                            placeholder="jane@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            style={styles.input}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            style={styles.input}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Creating account…' : 'Register'}
                    </button>
                </form>
                <p style={styles.footerText}>
                    Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;

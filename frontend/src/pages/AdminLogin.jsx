import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await authService.providerLogin(formData);
            const token = data.token || data.access_token;
            const role = data.role || data.user?.role || 'mother';
            
            // Check if the user is actually an admin or doctor
            if (role !== 'admin' && role !== 'doctor') {
                throw new Error('Access denied. Providers only.');
            }

            login(token, role, data.refresh, data.user);
            navigate('/dashboard'); // RoleProtectedRoute will redirect them to /admin or /doctor
        } catch (err) {
            setError(err.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    const colors = {
        primary: '#6b21a8',
        primaryLight: '#f3e8ff',
        bg: '#f8fafc',
        white: '#ffffff',
        text: '#1e293b',
        textLight: '#64748b',
        border: '#e2e8f0',
        danger: '#ef4444'
    };

    const styles = {
        page: {
            display: 'flex',
            minHeight: '100vh',
            fontFamily: "'Inter', system-ui, sans-serif",
            backgroundColor: colors.bg
        },
        leftSide: {
            flex: 1,
            background: `linear-gradient(135deg, ${colors.primary} 0%, #4c1d95 100%)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: colors.white,
            padding: '40px',
            textAlign: 'center'
        },
        rightSide: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            backgroundColor: colors.bg
        },
        container: {
            background: colors.white,
            borderRadius: '24px',
            padding: '48px 40px',
            boxShadow: '0 10px 40px rgba(107,33,168, 0.05)',
            border: `1px solid ${colors.border}`,
            maxWidth: '440px',
            width: '100%',
            textAlign: 'center',
            boxSizing: 'border-box'
        },
        title: {
            margin: '0 0 8px 0',
            fontSize: '1.75rem',
            fontWeight: '800',
            color: colors.text
        },
        subtitle: {
            margin: '0 0 32px 0',
            color: colors.textLight,
            fontSize: '0.95rem'
        },
        formGroup: {
            textAlign: 'left',
            marginBottom: '20px'
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: colors.text
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            fontSize: '0.95rem',
            outline: 'none',
            color: colors.text,
            backgroundColor: colors.white,
            boxSizing: 'border-box'
        },
        button: {
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            background: colors.primary,
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(107,33,168,0.2)',
            marginTop: '12px'
        },
        error: {
            color: colors.danger,
            fontSize: '0.9rem',
            marginBottom: '16px',
            padding: '12px',
            background: '#fee2e2',
            borderRadius: '8px',
            fontWeight: '500'
        }
    };

    return (
        <div style={styles.page}>
            {/* Split Screen Design for Provider Login */}
            <div style={styles.leftSide}>
                <div style={{width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', backdropFilter: 'blur(10px)'}}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                </div>
                <h1 style={{margin: '0 0 16px 0', fontSize: '2.5rem', fontWeight: '800'}}>Provider Portal</h1>
                <p style={{margin: 0, fontSize: '1.1rem', opacity: 0.9, maxWidth: '400px', lineHeight: '1.6'}}>Secure access for MamaCare AI healthcare providers, doctors, and administrators.</p>
            </div>
            
            <div style={styles.rightSide}>
                <div style={styles.container}>
                    <h2 style={styles.title}>Provider Login</h2>
                    <p style={styles.subtitle}>Sign in to access your dashboard</p>
                    
                    <form onSubmit={handleSubmit}>
                        {error && <div style={styles.error}>{error}</div>}
                        
                        <div style={styles.formGroup}>
                            <label htmlFor="email" style={styles.label}>Provider Email</label>
                            <input type="email" id="email" name="email" style={styles.input} value={formData.email} onChange={handleChange} required placeholder="dr.smith@mamacare.ai" />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label htmlFor="password" style={styles.label}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    name="password" 
                                    style={{...styles.input, paddingRight: '45px'}} 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="••••••••"
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: colors.textLight, padding: '4px', fontSize: '0.8rem', fontWeight: '600'}}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        
                        <button type="submit" style={styles.button} disabled={loading}>
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>
                    
                    <p style={{marginTop: '24px', fontSize: '0.85rem', color: colors.textLight}}>
                        <Link to="/login" style={{color: colors.primary, textDecoration: 'none', fontWeight: '600'}}>← Back to Patient Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

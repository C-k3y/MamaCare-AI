import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import { useAuth } from '../context/AuthContext';

const MotherOnboarding = ({ profile, onComplete }) => {
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    
    // Check if they already submitted but are waiting for approval
    const isPending = profile && profile.phone_number && !profile.is_approved;

    const [formData, setFormData] = useState({
        phone_number: profile?.phone_number || '',
        date_of_birth: profile?.date_of_birth || '',
        address: profile?.address || '',
        emergency_contact_name: profile?.emergency_contact_name || '',
        emergency_contact_phone: profile?.emergency_contact_phone || '',
        blood_group: profile?.blood_group || ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await userApi.updateMotherProfile(formData);
            alert('Profile submitted successfully! Awaiting doctor approval.');
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Failed to submit profile.');
        } finally {
            setLoading(false);
        }
    };

    const s = {
        page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyItems: 'center', background: 'linear-gradient(135deg, #ffe5ec 0%, #ffc2d1 100%)', padding: '40px 20px', fontFamily: "'Inter', sans-serif" },
        card: { background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '40px', maxWidth: '600px', width: '100%', margin: '0 auto', boxShadow: '0 10px 40px rgba(251, 111, 146, 0.1)' },
        title: { fontSize: '2rem', fontWeight: '800', color: '#1a202c', margin: '0 0 8px 0', textAlign: 'center' },
        subtitle: { color: '#718096', textAlign: 'center', marginBottom: '32px', fontSize: '1.1rem' },
        formGroup: { marginBottom: '20px' },
        label: { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568', fontSize: '0.9rem' },
        input: { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' },
        grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
        btn: { width: '100%', padding: '16px', borderRadius: '12px', background: 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)', color: 'white', border: 'none', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', marginTop: '16px', boxShadow: '0 4px 15px rgba(251,111,146,0.3)' },
        logoutBtn: { width: '100%', padding: '16px', borderRadius: '12px', background: 'transparent', color: '#718096', border: '1px solid #e2e8f0', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', marginTop: '12px' }
    };

    if (isPending) {
        return (
            <div style={s.page}>
                <div style={{...s.card, textAlign: 'center'}}>
                    <div style={{width: '80px', height: '80px', borderRadius: '50%', background: '#ffe5ec', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto'}}>
                        <span style={{fontSize: '32px'}}>⏳</span>
                    </div>
                    <h1 style={s.title}>Awaiting Doctor Approval</h1>
                    <p style={{...s.subtitle, marginBottom: '24px'}}>Your profile has been submitted successfully! A doctor must verify your registration before you can access the dashboard. Please check back later.</p>
                    <button style={s.logoutBtn} onClick={() => { logout(); }}>Sign Out</button>
                </div>
            </div>
        );
    }

    return (
        <div style={s.page}>
            <div style={s.card}>
                <h1 style={s.title}>Complete Your Profile</h1>
                <p style={s.subtitle}>Welcome {user?.first_name}! Please fill in your details to continue.</p>
                
                <form onSubmit={handleSubmit}>
                    <div style={s.grid}>
                        <div style={s.formGroup}>
                            <label style={s.label}>Phone Number</label>
                            <input required type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} style={s.input} placeholder="+1 234 567 8900" />
                        </div>
                        <div style={s.formGroup}>
                            <label style={s.label}>Date of Birth</label>
                            <input required type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} style={s.input} />
                        </div>
                    </div>
                    
                    <div style={s.formGroup}>
                        <label style={s.label}>Home Address</label>
                        <input required type="text" name="address" value={formData.address} onChange={handleChange} style={s.input} placeholder="123 Wellness Ave, City" />
                    </div>

                    <div style={s.grid}>
                        <div style={s.formGroup}>
                            <label style={s.label}>Blood Group</label>
                            <select required name="blood_group" value={formData.blood_group} onChange={handleChange} style={s.input}>
                                <option value="">Select Blood Group...</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                    </div>

                    <h3 style={{margin: '32px 0 16px 0', fontSize: '1.2rem', color: '#1a202c'}}>Emergency Contact</h3>
                    
                    <div style={s.grid}>
                        <div style={s.formGroup}>
                            <label style={s.label}>Contact Name</label>
                            <input required type="text" name="emergency_contact_name" value={formData.emergency_contact_name} onChange={handleChange} style={s.input} placeholder="John Doe" />
                        </div>
                        <div style={s.formGroup}>
                            <label style={s.label}>Contact Phone</label>
                            <input required type="tel" name="emergency_contact_phone" value={formData.emergency_contact_phone} onChange={handleChange} style={s.input} placeholder="+1 987 654 3210" />
                        </div>
                    </div>

                    <button type="submit" style={s.btn} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Profile for Approval'}
                    </button>
                    <button type="button" style={s.logoutBtn} onClick={() => { logout(); }}>Cancel & Sign Out</button>
                </form>
            </div>
        </div>
    );
};

export default MotherOnboarding;

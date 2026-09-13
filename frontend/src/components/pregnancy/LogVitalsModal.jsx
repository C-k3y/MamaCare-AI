import React, { useState } from 'react';
import { recordsApi } from '../../api/recordsApi';

const LogVitalsModal = ({ isOpen, onClose, pregnancyId, onVitalsLogged }) => {
    const [formData, setFormData] = useState({
        blood_pressure_systolic: '',
        blood_pressure_diastolic: '',
        weight_kg: '',
        blood_glucose_mg_dl: '',
        fetal_movement_count: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const styles = {
        overlay: {
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
        },
        modal: {
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        },
        header: {
            margin: '0 0 20px 0', fontSize: '1.5rem', color: '#1a202c'
        },
        formGroup: {
            marginBottom: '16px', textAlign: 'left'
        },
        label: {
            display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4a5568', fontWeight: '600'
        },
        input: {
            width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box'
        },
        twoCol: {
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'
        },
        buttonRow: {
            display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px'
        },
        cancelBtn: {
            padding: '12px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: '600'
        },
        submitBtn: {
            padding: '12px 24px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)', color: 'white', cursor: 'pointer', fontWeight: '600'
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const payload = {
                pregnancy: pregnancyId,
                blood_pressure_systolic: formData.blood_pressure_systolic ? parseInt(formData.blood_pressure_systolic) : null,
                blood_pressure_diastolic: formData.blood_pressure_diastolic ? parseInt(formData.blood_pressure_diastolic) : null,
                weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
                blood_glucose_mg_dl: formData.blood_glucose_mg_dl ? parseInt(formData.blood_glucose_mg_dl) : null,
                fetal_movement_count: formData.fetal_movement_count ? parseInt(formData.fetal_movement_count) : null,
            };
            await recordsApi.createVital(payload);
            onVitalsLogged();
            onClose();
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to log vitals.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.header}>Log Daily Vitals</h2>
                {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.twoCol}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Systolic BP (mmHg)</label>
                            <input name="blood_pressure_systolic" type="number" style={styles.input} value={formData.blood_pressure_systolic} onChange={handleChange} placeholder="120" />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Diastolic BP (mmHg)</label>
                            <input name="blood_pressure_diastolic" type="number" style={styles.input} value={formData.blood_pressure_diastolic} onChange={handleChange} placeholder="80" />
                        </div>
                    </div>
                    <div style={styles.twoCol}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Weight (kg)</label>
                            <input name="weight_kg" type="number" step="0.1" style={styles.input} value={formData.weight_kg} onChange={handleChange} placeholder="65.5" />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Blood Glucose (mg/dL)</label>
                            <input name="blood_glucose_mg_dl" type="number" style={styles.input} value={formData.blood_glucose_mg_dl} onChange={handleChange} placeholder="90" />
                        </div>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Fetal Movement (Kicks in 1hr)</label>
                        <input name="fetal_movement_count" type="number" style={styles.input} value={formData.fetal_movement_count} onChange={handleChange} placeholder="10" />
                    </div>
                    
                    <div style={styles.buttonRow}>
                        <button type="button" onClick={onClose} style={styles.cancelBtn} disabled={loading}>Cancel</button>
                        <button type="submit" style={styles.submitBtn} disabled={loading}>{loading ? 'Saving...' : 'Save Vitals'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogVitalsModal;

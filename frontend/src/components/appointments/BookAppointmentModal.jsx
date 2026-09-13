import React, { useState, useEffect } from 'react';
import { appointmentApi } from '../../api/appointmentApi';

const BookAppointmentModal = ({ isOpen, onClose, onBooked }) => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        doctor: '',
        date_time: '',
        type: 'video',
        reason: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // In a real app we'd fetch a list of doctors or availabilities
            // For now, we assume there's at least one doctor (ID 2 usually if mother is 1)
            // Let's just fetch availabilities to get doctors
            appointmentApi.getAvailability().then(res => {
                // mock extraction
                setDoctors(res.data || []);
            }).catch(() => {});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const styles = {
        overlay: {
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        },
        modal: {
            background: 'white', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '500px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        },
        title: { margin: '0 0 20px 0', fontSize: '1.5rem', color: '#1a202c' },
        input: { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '16px', boxSizing: 'border-box' },
        label: { display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' },
        btnRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' },
        cancelBtn: { padding: '12px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' },
        submitBtn: { padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#fb6f92', color: 'white', fontWeight: '600', cursor: 'pointer' }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await appointmentApi.book({
                doctor: formData.doctor || 2, // fallback to doc id 2 if empty
                date_time: formData.date_time,
                type: formData.type,
                reason: formData.reason
            });
            onBooked();
            onClose();
        } catch (err) {
            console.error("Failed to book", err);
            alert("Booking failed. Please ensure all fields are correct.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.title}>Book Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <label style={styles.label}>Select Doctor (ID)</label>
                    <input 
                        type="number" 
                        style={styles.input} 
                        value={formData.doctor} 
                        onChange={e => setFormData({...formData, doctor: e.target.value})} 
                        placeholder="Enter Doctor ID (e.g. 2)" 
                        required
                    />
                    
                    <label style={styles.label}>Date & Time</label>
                    <input 
                        type="datetime-local" 
                        style={styles.input} 
                        value={formData.date_time} 
                        onChange={e => setFormData({...formData, date_time: e.target.value})} 
                        required 
                    />

                    <label style={styles.label}>Consultation Type</label>
                    <select style={styles.input} value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="video">Telemedicine (Video)</option>
                        <option value="in_person">In-Person Clinic</option>
                    </select>

                    <label style={styles.label}>Reason for Visit</label>
                    <textarea 
                        style={{...styles.input, minHeight: '80px'}} 
                        value={formData.reason} 
                        onChange={e => setFormData({...formData, reason: e.target.value})} 
                        placeholder="e.g. Routine checkup, experiencing pain..."
                    />

                    <div style={styles.btnRow}>
                        <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
                        <button type="submit" style={styles.submitBtn} disabled={loading}>
                            {loading ? 'Booking...' : 'Confirm Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookAppointmentModal;

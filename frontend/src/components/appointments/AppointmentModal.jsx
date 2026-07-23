import React from 'react';
import './AppoinmentModal.css';

const AppointmentModal = ({
    isOpen,
    onClose,
    appointment,
    onCancel,
    onReschedule,
    onConfirmTelehealth
}) => {
    if (!isOpen || !appointment) return null;

    const { doctorName, specialty, date, time, reason, status } = appointment;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="modal-header">
                    <h2 className="modal-title">Appointment Details</h2>
                    <span className={`status-badge ${status.toLowerCase()}`}>
                        {status}
                    </span>
                </div>

                <div className="modal-body">
                    <div className="doctor-info-block">
                        <div className="doctor-avatar-large">{doctorName.charAt(0)}</div>
                        <div>
                            <h3 className="doctor-name">{doctorName}</h3>
                            <p className="doctor-specialty">{specialty}</p>
                        </div>
                    </div>

                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="label">Date</span>
                            <span className="value">{date}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Time</span>
                            <span className="value">{time}</span>
                        </div>
                        <div className="detail-item full-width">
                            <span className="label">Reason</span>
                            <span className="value value-multiline">{reason}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    {status === 'Upcoming' && (
                        <>
                            <button
                                className="btn-secondary"
                                onClick={() => onCancel(appointment.id)}
                            >
                                Cancel Appointment
                            </button>
                            <button
                                className="btn-primary"
                                onClick={() => onConfirmTelehealth(appointment.id)}
                            >
                                Confirm Telehealth
                            </button>
                        </>
                    )}

                    {status === 'Completed' && (
                        <button
                            className="btn-secondary"
                            onClick={() => onReschedule(appointment.id)}
                        >
                            Reschedule
                        </button>
                    )}

                    {status === 'Cancelled' && (
                        <button
                            className="btn-secondary"
                            onClick={() => onReschedule(appointment.id)}
                        >
                            Book Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;

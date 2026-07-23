import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ name, specialty, rating, reviewsCount, avatarUrl, nextAvailable }) => {
    return (
        <div className="doctor-card">
            <div className="card-top">
                <div className="doc-avatar">
                    <img src={avatarUrl} alt="{name}" />
                </div>
                <div className="doc-info">
                    <h3>{name}</h3>
                    <p>{specialty}</p>
                    <p>{rating} ({reviewsCount})</p>
                </div>
            </div>

            <div className="card-middle">
                <div className="next-available">
                    <p>Next available: {nextAvailable}</p>
                </div>
            </div>

            <div className="card-bottom">
                <button className="btn-primary">Book Appointment</button>
            </div>
        </div>
    );
};

export default DoctorCard;

import React from 'react';
import './AppointmentCard.css';

const AppointmentCard = ({
  doctorName = "Dr. Jane Doe",
  specialty = "Obstetrician & Gynecologist",
  date = "Oct 24, 2026",
  time = "10:30 AM",
  status = "Upcoming",
  imageUrl
}) => {
  return (
    <div className="appointment-card">
      <div className="card-header">
        <div className="doctor-info">
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150"}
            alt={doctorName}
            className="doctor-avatar"
          />
          <div>
            <h3 className="doctor-name">{doctorName}</h3>
            <p className="doctor-specialty">{specialty}</p>
          </div>
        </div>
        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
      </div>

      <div className="card-body">
        <div className="datetime">
          <div className="datetime-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {date}
          </div>
          <div className="datetime-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {time}
          </div>
        </div>
      </div>

      <div className="card-footer">
        <button className="btn-secondary">Reschedule</button>
        <button className="btn-primary">View Details</button>
      </div>
    </div>
  );
};

export default AppointmentCard;

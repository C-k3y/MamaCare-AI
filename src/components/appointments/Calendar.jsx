import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css"; // Importing our custom styles

const Calendar = ({ onDateSelect }) => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
        if (onDateSelect) {
            onDateSelect(newDate);
        }
    };

    return (
        <div className="calendar-container">
            <ReactCalendar 
                onChange={onChange} 
                value={date}
                className="custom-calendar"
            />
        </div>
    );
};

export default Calendar;

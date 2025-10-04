// components/AvailabilityCalendar.js
import React, { useState } from 'react';

const AvailabilityCalendar = ({ apartmentId }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Mock data - in real app, this would come from backend
  const bookedDates = [
    '2024-01-15', '2024-01-16', '2024-01-17',
    '2024-01-25', '2024-01-26'
  ];

  const isDateBooked = (date) => {
    return bookedDates.includes(date.toISOString().split('T')[0]);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`prev-${i}`} className="calendar-day empty"></div>);
    }
    
    // Current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const isBooked = isDateBooked(date);
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isBooked ? 'booked' : ''} ${isToday ? 'today' : ''}`}
        >
          <span>{day}</span>
          {isBooked && <div className="booked-indicator">Booked</div>}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="availability-calendar">
      <h3>Availability Calendar</h3>
      <div className="calendar-header">
        <button 
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="btn-calendar-nav"
        >
          ←
        </button>
        <h4>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
        <button 
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="btn-calendar-nav"
        >
          →
        </button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-weekday">Sun</div>
        <div className="calendar-weekday">Mon</div>
        <div className="calendar-weekday">Tue</div>
        <div className="calendar-weekday">Wed</div>
        <div className="calendar-weekday">Thu</div>
        <div className="calendar-weekday">Fri</div>
        <div className="calendar-weekday">Sat</div>
        {renderCalendar()}
      </div>
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color booked"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
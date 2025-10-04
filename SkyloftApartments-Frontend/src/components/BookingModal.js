// components/BookingModal.js
import React, { useState } from 'react';

const BookingModal = ({ apartment, isOpen, onClose }) => {
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const renderStep = () => {
    switch (bookingStep) {
      case 1:
        return (
          <div className="booking-step">
            <h3>Select Dates</h3>
            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                name="checkIn"
                value={bookingData.checkIn}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                name="checkOut"
                value={bookingData.checkOut}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Number of Guests</label>
              <select 
                name="guests" 
                value={bookingData.guests} 
                onChange={handleInputChange}
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="booking-step">
            <h3>Guest Information</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={bookingData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={bookingData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="booking-step">
            <h3>Confirm Booking</h3>
            <div className="booking-summary">
              <h4>Booking Details</h4>
              <p><strong>Apartment:</strong> {apartment?.name}</p>
              <p><strong>Check-in:</strong> {bookingData.checkIn}</p>
              <p><strong>Check-out:</strong> {bookingData.checkOut}</p>
              <p><strong>Guests:</strong> {bookingData.guests}</p>
              <p><strong>Total:</strong> $XXX.XX</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Book {apartment?.name}</h2>
        
        <div className="booking-progress">
          <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>1</div>
          <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>2</div>
          <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {renderStep()}

        <div className="booking-actions">
          {bookingStep > 1 && (
            <button 
              className="btn btn-secondary"
              onClick={() => setBookingStep(bookingStep - 1)}
            >
              Back
            </button>
          )}
          {bookingStep < 3 ? (
            <button 
              className="btn btn-primary"
              onClick={() => setBookingStep(bookingStep + 1)}
            >
              Continue
            </button>
          ) : (
            <button className="btn btn-primary">
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
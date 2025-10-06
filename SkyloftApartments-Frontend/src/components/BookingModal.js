// components/BookingModal.js
import React, { useState } from 'react';
import { bookingService, guestService, apartmentService } from '../services/api';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const checkAvailability = async () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      setError('Please select both check-in and check-out dates.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const available = await apartmentService.checkAvailability(
        apartment.apartmentID,
        bookingData.checkIn,
        bookingData.checkOut
      );
      setIsAvailable(available);
      setAvailabilityChecked(true);
      
      if (available) {
        setBookingStep(2);
      } else {
        setError('Selected dates are not available. Please choose different dates.');
      }
    } catch (err) {
      setError('Failed to check availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (checkIn, checkOut, basePrice) => {
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return nights * basePrice;
  };

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create guest first
      const nameParts = bookingData.name.split(' ');
      const guest = await guestService.createGuest({
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' ') || 'Guest',
        email: bookingData.email,
        phone: bookingData.phone
      });

      // Create booking
      const totalAmount = calculateTotal(bookingData.checkIn, bookingData.checkOut, apartment.basePrice);
      
      const booking = await bookingService.createBooking({
        apartmentID: apartment.apartmentID,
        guestID: guest.guestID,
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
        numberOfGuests: parseInt(bookingData.guests),
        totalAmount: totalAmount,
        status: "Confirmed",
        paymentStatus: "Pending", // You can integrate payment later
        specialRequests: `Booking for ${bookingData.guests} guests`
      });

      alert(`Booking confirmed! Your reference number is: ${booking.bookingReference}`);
      onClose();
      resetForm();
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBookingStep(1);
    setBookingData({
      checkIn: '',
      checkOut: '',
      guests: 1,
      name: '',
      email: '',
      phone: ''
    });
    setAvailabilityChecked(false);
    setIsAvailable(true);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
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
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                name="checkOut"
                value={bookingData.checkOut}
                onChange={handleInputChange}
                min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
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
            
            {availabilityChecked && !isAvailable && (
              <div className="availability-error">
                <p>❌ These dates are not available. Please select different dates.</p>
              </div>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="booking-step">
            <h3>Guest Information</h3>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={bookingData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
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
        const nights = Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24));
        const total = nights * apartment.basePrice;
        
        return (
          <div className="booking-step">
            <h3>Confirm Booking</h3>
            <div className="booking-summary">
              <h4>Booking Details</h4>
              <p><strong>Apartment:</strong> {apartment.name}</p>
              <p><strong>Check-in:</strong> {new Date(bookingData.checkIn).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(bookingData.checkOut).toLocaleDateString()}</p>
              <p><strong>Nights:</strong> {nights}</p>
              <p><strong>Guests:</strong> {bookingData.guests}</p>
              <p><strong>Total:</strong> ${total.toFixed(2)}</p>
              <p><strong>Guest:</strong> {bookingData.name}</p>
              <p><strong>Email:</strong> {bookingData.email}</p>
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
        <button className="modal-close" onClick={handleClose}>×</button>
        <h2>Book {apartment.name}</h2>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

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
              disabled={loading}
            >
              Back
            </button>
          )}
          
          {bookingStep === 1 ? (
            <button 
              className="btn btn-primary"
              onClick={checkAvailability}
              disabled={loading || !bookingData.checkIn || !bookingData.checkOut}
            >
              {loading ? 'Checking...' : 'Check Availability'}
            </button>
          ) : bookingStep < 3 ? (
            <button 
              className="btn btn-primary"
              onClick={() => setBookingStep(bookingStep + 1)}
              disabled={loading || !bookingData.name || !bookingData.email}
            >
              Continue
            </button>
          ) : (
            <button 
              className="btn btn-primary"
              onClick={handleConfirmBooking}
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
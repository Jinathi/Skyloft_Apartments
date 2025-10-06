// pages/ApartmentDetail.js
import React, { useState, useEffect } from 'react';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import BookingModal from '../components/BookingModal';
import { apartmentService } from '../services/api';

const ApartmentDetail = ({ apartmentId, onBack }) => {
  const [apartment, setApartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadApartment();
  }, [apartmentId]);

  const loadApartment = async () => {
    try {
      setLoading(true);
      setError(null);
      const apartmentData = await apartmentService.getApartment(apartmentId);
      setApartment(apartmentData);
    } catch (err) {
      console.error('Error loading apartment:', err);
      setError('Failed to load apartment details.');
    } finally {
      setLoading(false);
    }
  };

  const getApartmentImages = (apartmentId) => {
    const images = {
      1: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3"
      ],
      2: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3"
      ]
    };
    return images[apartmentId] || images[1];
  };

  const getApartmentFeatures = (apartment) => {
    const features = [
      `${apartment.bedrooms} Bedrooms`,
      `${apartment.bathrooms} Bathrooms`,
      `Up to ${apartment.maxGuests} Guests`,
      `${apartment.sizeSqFt} sq. ft.`
    ];
    
    if (apartment.apartmentAmenities) {
      apartment.apartmentAmenities.forEach(aa => {
        if (aa.amenity) {
          features.push(aa.amenity.name);
        }
      });
    }
    
    return features;
  };

  if (loading) {
    return (
      <div className="apartment-detail">
        <div className="container">
          <button className="btn btn-secondary back-button" onClick={onBack}>
            ← Back to Apartments
          </button>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading apartment details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="apartment-detail">
        <div className="container">
          <button className="btn btn-secondary back-button" onClick={onBack}>
            ← Back to Apartments
          </button>
          <div className="error-container">
            <div className="error-message">
              <h2>Oops! Something went wrong</h2>
              <p>{error}</p>
              <button className="btn btn-primary" onClick={loadApartment}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="apartment-detail">
        <div className="container">
          <button className="btn btn-secondary back-button" onClick={onBack}>
            ← Back to Apartments
          </button>
          <div className="error-message">
            <h2>Apartment not found</h2>
            <p>Please select an apartment from the homepage.</p>
          </div>
        </div>
      </div>
    );
  }

  const images = getApartmentImages(apartment.apartmentID);
  const features = getApartmentFeatures(apartment);

  return (
    <div className="apartment-detail">
      <div className="container">
        <button className="btn btn-secondary back-button" onClick={onBack}>
          ← Back to Apartments
        </button>

        <div className="image-gallery">
          <div className="main-image">
            <img src={images[currentImageIndex]} alt={apartment.name} />
          </div>
          <div className="image-thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${apartment.name} ${index + 1}`}
                className={index === currentImageIndex ? 'active' : ''}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="apartment-detail-content">
          <div className="detail-main">
            <h1>{apartment.name}</h1>
            <p className="apartment-price-large">${apartment.basePrice}/night</p>
            <p className="apartment-description">{apartment.description}</p>

            <div className="detail-features">
              <h3>Features & Amenities</h3>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-check">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="apartment-specs">
              <h3>Details</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Guests</span>
                  <span className="spec-value">{apartment.maxGuests}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Bedrooms</span>
                  <span className="spec-value">{apartment.bedrooms}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Bathrooms</span>
                  <span className="spec-value">{apartment.bathrooms}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Size</span>
                  <span className="spec-value">{apartment.sizeSqFt} sq. ft.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="booking-widget">
              <h3>Book This Apartment</h3>
              <p className="widget-price">${apartment.basePrice}/night</p>
              
              <AvailabilityCalendar apartmentId={apartment.apartmentID} />
              
              <button 
                className="btn btn-primary full-width"
                onClick={() => setIsModalOpen(true)}
              >
                Check Availability & Book
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        apartment={apartment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ApartmentDetail;
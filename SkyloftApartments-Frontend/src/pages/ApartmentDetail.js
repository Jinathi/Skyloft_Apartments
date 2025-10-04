// pages/ApartmentDetail.js
import React, { useState } from 'react';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import BookingModal from '../components/BookingModal';

const ApartmentDetail = ({ apartment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock apartment data - in real app, this would come from props or API
  const apartmentData = apartment || {
    id: 1,
    name: "Sky View Apartment",
    description: "Experience luxury living in this beautifully designed 2-bedroom apartment featuring panoramic city views and modern amenities.",
    price: "$120/night",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3"
    ],
    features: [
      "2 Spacious Bedrooms",
      "Modern Fully-Equipped Kitchen",
      "Living Room with City View",
      "2 Bathrooms",
      "Air Conditioning",
      "Free High-Speed WiFi",
      "Smart TV",
      "Pool Access",
      "Free Parking"
    ],
    details: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="apartment-detail">
      <div className="container">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img 
              src={apartmentData.images[currentImageIndex]} 
              alt={apartmentData.name} 
            />
          </div>
          <div className="image-thumbnails">
            {apartmentData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${apartmentData.name} ${index + 1}`}
                className={index === currentImageIndex ? 'active' : ''}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="apartment-detail-content">
          <div className="detail-main">
            <h1>{apartmentData.name}</h1>
            <p className="apartment-price-large">{apartmentData.price}</p>
            <p className="apartment-description">{apartmentData.description}</p>

            <div className="detail-features">
              <h3>Features & Amenities</h3>
              <div className="features-grid">
                {apartmentData.features.map((feature, index) => (
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
                  <span className="spec-value">{apartmentData.details.guests}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Bedrooms</span>
                  <span className="spec-value">{apartmentData.details.bedrooms}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Beds</span>
                  <span className="spec-value">{apartmentData.details.beds}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Bathrooms</span>
                  <span className="spec-value">{apartmentData.details.bathrooms}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="booking-widget">
              <h3>Book This Apartment</h3>
              <p className="widget-price">{apartmentData.price}</p>
              
              <AvailabilityCalendar apartmentId={apartmentData.id} />
              
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
        apartment={apartmentData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ApartmentDetail;
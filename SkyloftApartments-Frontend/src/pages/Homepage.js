// pages/Homepage.js
import React, { useState } from 'react';
import BookingModal from '../components/BookingModal';

const Homepage = ({ setCurrentPage, setSelectedApartment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartmentLocal] = useState(null);

  const apartments = [
    {
      id: 1,
      name: "Sky View Apartment",
      description: "Luxurious 2-bedroom apartment with panoramic city views, modern kitchen, and exclusive pool access.",
      price: "$120/night",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3",
      features: ["2 Bedrooms", "Modern Kitchen", "City View", "Pool Access", "Free WiFi"]
    },
    {
      id: 2,
      name: "Garden Suite Apartment",
      description: "Spacious apartment featuring a private garden area, two comfortable bedrooms, and full kitchen amenities.",
      price: "$110/night",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3",
      features: ["2 Bedrooms", "Private Garden", "Garden View", "Pool Access", "Free Parking"]
    }
  ];

  const handleBookNow = (apartment) => {
    setSelectedApartmentLocal(apartment);
    setSelectedApartment(apartment);
    setIsModalOpen(true);
  };

  const handleViewDetails = (apartment) => {
    setSelectedApartment(apartment);
    setCurrentPage('apartment');
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Experience Luxury Living</h1>
          <p>Premium apartment rentals with stunning views and world-class amenities</p>
          <button className="btn btn-primary">Explore Apartments</button>
        </div>
      </section>

      <section className="apartments-section">
        <div className="container">
          <h2>Our Apartments</h2>
          <p className="section-subtitle">Choose from our exclusive collection of luxury apartments</p>
          
          <div className="apartments-grid">
            {apartments.map(apartment => (
              <div key={apartment.id} className="card apartment-card">
                <img src={apartment.image} alt={apartment.name} className="apartment-image" />
                <div className="apartment-content">
                  <h3>{apartment.name}</h3>
                  <p className="apartment-price">{apartment.price}</p>
                  <p className="apartment-description">{apartment.description}</p>
                  
                  <div className="apartment-features">
                    {apartment.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  
                  <div className="apartment-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleBookNow(apartment)}
                    >
                      Book Now
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleViewDetails(apartment)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="amenities-section">
        <div className="container">
          <h2>Premium Amenities</h2>
          <div className="amenities-grid">
            <div className="amenity-item">
              <div className="amenity-icon">🏊</div>
              <h4>Infinity Pool</h4>
              <p>Stunning pool with panoramic views</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">🍳</div>
              <h4>Full Kitchen</h4>
              <p>Modern kitchen with all appliances</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">🌄</div>
              <h4>Scenic Views</h4>
              <p>Breathtaking city and mountain views</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">🛜</div>
              <h4>High-Speed WiFi</h4>
              <p>Complimentary high-speed internet</p>
            </div>
          </div>
        </div>
      </section>

      <BookingModal 
        apartment={selectedApartment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Homepage;
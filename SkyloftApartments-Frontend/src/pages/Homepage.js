// pages/Homepage.js
import React, { useState, useEffect } from 'react';
import BookingModal from '../components/BookingModal';
import { apartmentService } from '../services/api'; // Import the API service

const Homepage = ({ setCurrentPage, onViewDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load apartments from backend when component mounts
  useEffect(() => {
    loadApartments();
  }, []);

  const loadApartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const apartmentsData = await apartmentService.getApartments();
      
      // Transform backend data to match frontend structure
      const transformedApartments = apartmentsData.map(apartment => ({
        id: apartment.apartmentID,
        name: apartment.name,
        description: apartment.description,
        price: `$${apartment.basePrice}/night`,
        image: getApartmentImage(apartment.apartmentID), // Helper function for images
        features: getApartmentFeatures(apartment), // Extract features from amenities
        details: {
          guests: apartment.maxGuests,
          bedrooms: apartment.bedrooms,
          bathrooms: apartment.bathrooms
        }
      }));
      
      setApartments(transformedApartments);
    } catch (err) {
      console.error('Error loading apartments:', err);
      setError('Failed to load apartments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get apartment image based on ID
  const getApartmentImage = (apartmentId) => {
    const images = {
      1: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3",
      2: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3"
    };
    return images[apartmentId] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3";
  };

  // Helper function to extract features from apartment data
  const getApartmentFeatures = (apartment) => {
    const baseFeatures = [
      `${apartment.bedrooms} Bedrooms`,
      `${apartment.bathrooms} Bathrooms`,
      `Up to ${apartment.maxGuests} Guests`
    ];
    
    // You can also extract from apartmentAmenities if needed
    if (apartment.apartmentAmenities) {
      apartment.apartmentAmenities.forEach(aa => {
        if (aa.amenity) {
          baseFeatures.push(aa.amenity.name);
        }
      });
    }
    
    return baseFeatures.slice(0, 6); // Limit to 6 features
  };

  const handleBookNow = (apartment) => {
    setSelectedApartment(apartment);
    setIsModalOpen(true);
  };

  const handleViewDetails = (apartmentId) => {
    onViewDetails(apartmentId);
  };

  const handleRetry = () => {
    loadApartments();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading luxury apartments...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="error-container">
        <div className="container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          
          {apartments.length === 0 ? (
            <div className="no-apartments">
              <p>No apartments available at the moment.</p>
            </div>
          ) : (
            <div className="apartments-grid">
              {apartments.map(apartment => (
                <div key={apartment.id} className="card apartment-card">
                  <img src={apartment.image} alt={apartment.name} className="apartment-image" />
                  <div className="apartment-content">
                    <h3>{apartment.name}</h3>
                    <p className="apartment-price">{apartment.price}</p>
                    <p className="apartment-description">{apartment.description}</p>
                    
                    <div className="apartment-features">
                      {apartment.features.slice(0, 4).map((feature, index) => (
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
                        onClick={() => handleViewDetails(apartment.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
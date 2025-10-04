// pages/Information.js
import React from 'react';

const Information = () => {
  const faqs = [
    {
      question: "What is the check-in and check-out time?",
      answer: "Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability."
    },
    {
      question: "Is parking available?",
      answer: "Yes, we provide complimentary parking for one vehicle per apartment. Additional parking may be available upon request."
    },
    {
      question: "Are pets allowed?",
      answer: "We're sorry, but pets are not allowed in the apartments to maintain a comfortable environment for all guests."
    },
    {
      question: "Is smoking allowed in the apartments?",
      answer: "All our apartments are non-smoking. Designated smoking areas are available outside the building."
    },
    {
      question: "What amenities are included?",
      answer: "All apartments include fully-equipped kitchens, air conditioning, high-speed WiFi, smart TVs, linens, towels, and access to the swimming pool."
    }
  ];

  const policies = [
    {
      title: "Cancellation Policy",
      description: "Free cancellation up to 7 days before check-in. Cancellations within 7 days will be charged 50% of the total booking amount."
    },
    {
      title: "Security Deposit",
      description: "A security deposit of $200 is required upon check-in and will be refunded within 7 days after check-out, provided no damages are found."
    },
    {
      title: "House Rules",
      description: "Please respect the peaceful environment. Quiet hours are from 10:00 PM to 7:00 AM. Maximum occupancy must not exceed the booked capacity."
    }
  ];

  return (
    <div className="information-page">
      <div className="container">
        <div className="page-header">
          <h1>Information</h1>
          <p>Everything you need to know about your stay at Skyloft Apartments</p>
        </div>

        <section className="info-section">
          <h2>About Skyloft Apartments</h2>
          <p>
            Skyloft Apartments offers luxury apartment rentals in the heart of the city, 
            combining modern comfort with breathtaking views. Each apartment is meticulously 
            designed to provide a memorable stay with premium amenities and personalized service.
          </p>
          
          <div className="highlight-grid">
            <div className="highlight-item">
              <h3>🏠 Two Unique Apartments</h3>
              <p>Choose between our Sky View Apartment with panoramic city views or the Garden Suite with private outdoor space.</p>
            </div>
            <div className="highlight-item">
              <h3>🛌 Comfort & Privacy</h3>
              <p>Each apartment features two bedrooms, ensuring comfort and privacy for families or groups.</p>
            </div>
            <div className="highlight-item">
              <h3>🏊 Premium Amenities</h3>
              <p>Enjoy access to our infinity pool, modern kitchens, and all the comforts of home.</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>Policies & Guidelines</h2>
          <div className="policies-grid">
            {policies.map((policy, index) => (
              <div key={index} className="policy-card">
                <h3>{policy.title}</h3>
                <p>{policy.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2>Location & Directions</h2>
          <p>
            Skyloft Apartments is conveniently located in Kandy, Sri Lanka, 
            offering easy access to local attractions, dining, and shopping.
          </p>
          <div className="location-details">
            <p><strong>Address:</strong> 123 Skyline Drive, Kandy, Sri Lanka</p>
            <p><strong>Airport Distance:</strong> Approximately 2 hours from Bandaranaike International Airport</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Information;
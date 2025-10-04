// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h3>Skyloft Apartments</h3>
            <p>Luxury apartment rentals with stunning views and premium amenities in the heart of the city.</p>
          </div>
          <div>
            <h4>Contact Info</h4>
            <p>Email: info@skyloftapartments.com</p>
            <p>Phone: +94 77 123 4567</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#information">Information</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Skyloft Apartments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
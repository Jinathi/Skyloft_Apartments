// components/Header.js
import React from 'react';

const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <a 
            href="#home" 
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
            }}
          >
            Skyloft Apartments
          </a>
          <ul className="nav-links">
            <li>
              <a 
                href="#home" 
                className={currentPage === 'home' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('home');
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#information"
                className={currentPage === 'information' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('information');
                }}
              >
                Information
              </a>
            </li>
            <li>
              <a 
                href="#contact"
                className={currentPage === 'contact' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('contact');
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
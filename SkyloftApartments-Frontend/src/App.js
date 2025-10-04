// App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import ApartmentDetail from './pages/ApartmentDetail';
import Contact from './pages/Contact';
import Information from './pages/Information';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedApartment, setSelectedApartment] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'apartment':
        return <ApartmentDetail apartment={selectedApartment} />;
      case 'contact':
        return <Contact />;
      case 'information':
        return <Information />;
      default:
        return <Homepage setCurrentPage={setCurrentPage} setSelectedApartment={setSelectedApartment} />;
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
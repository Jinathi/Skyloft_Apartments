// App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import ApartmentDetail from './pages/ApartmentDetail';
import Contact from './pages/Contact';
import Information from './pages/Information';

// App.js
// Remove the hardcoded apartments array from App.js
// The apartments will now be loaded from the backend in Homepage.js

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedApartment, setSelectedApartment] = useState(null);

  const handleViewDetails = (apartmentId) => {
    // Note: We'll need to load the specific apartment in ApartmentDetail.js
    setSelectedApartment({ id: apartmentId }); // Just pass the ID
    setCurrentPage('apartment');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'apartment':
        return <ApartmentDetail apartmentId={selectedApartment?.id} onBack={() => setCurrentPage('home')} />;
      case 'contact':
        return <Contact onBack={() => setCurrentPage('home')} />;
      case 'information':
        return <Information onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <Homepage 
            setCurrentPage={setCurrentPage} 
            onViewDetails={handleViewDetails}
          />
        );
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
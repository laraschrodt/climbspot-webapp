import React from 'react';
import Navbar from '../components/general/Navbar/Navbar';
import Footer from '../components/general/Footer/Footer';
import LocationDetails from '../components/locationDetails/LocationDetails';

const LocationDetailsPage: React.FC = () => {
  return (
    <div className="bg-[#f8fcef] min-h-screen">
      <Navbar />
      <LocationDetails />
      <Footer />
    </div>
  );
};

export default LocationDetailsPage;

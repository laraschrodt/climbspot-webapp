import React from 'react';
import Navbar from '../components/general/Navbar/Navbar';
import Footer from '../components/general/Footer/Footer';
import LocationDetails from '../components/locationDetails/LocationDetails';

/**
 * LocationDetailsPage-Komponente
 *
 * Seite zur Darstellung detaillierter Informationen eines einzelnen Kletterortes.
 * Setzt sich zusammen aus globaler Navigationsleiste (`Navbar`),
 * der Detailansicht des Ortes (`LocationDetails`) und dem Footer.
 *
 * Eingebunden im Routing als Detailseite eines Ortes.
 */

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

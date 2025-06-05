import React from "react";
import Navbar from "../components/general/Navbar/Navbar";
import Footer from "../components/general/Footer/Footer";
import LocationDetails from "../components/locationDetails/LocationInfo";

function LocationDetailsPage() {
  return (
    <div>
      <Navbar />
      <LocationDetails />
      <Footer />
    </div>
  );
}

export default LocationDetailsPage;

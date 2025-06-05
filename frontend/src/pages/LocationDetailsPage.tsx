import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/general/Navbar";
import Footer from "../components/general/Footer/Footer";
import LocationDetails from "../components/locationDetails/LocationDetails";

const LocationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <LocationDetails locationName={id!} />
      </main>
      <Footer />
    </>
  );
};

export default LocationDetailsPage;
import { Navbar } from "../components/general/Navbar";
import Filter from "../components/locationSearch/Filter";
import Footer from "../components/general/Footer/Footer";
import Map from "../components/locationSearch/Map";

function LocationMap() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <Filter />

      <Map />

      <Footer />
    </div>
  );
}

export default LocationMap;

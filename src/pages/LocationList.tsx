import Footer from "../components/general/Footer/Footer";
import { Navbar } from "../components/general/Navbar";
import Filter from "../components/locationSearch/Filter";
import LocationGallery from "../components/locationSearch/LocationGallery";

function LocationList() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Filter />
      </div>
      <LocationGallery />
      <Footer />
    </div>
  );
}

export default LocationList;

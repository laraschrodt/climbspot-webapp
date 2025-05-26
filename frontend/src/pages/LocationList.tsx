import { Navbar } from "../components/general/Navbar";
import Footer from "../components/general/Footer/Footer";
import Filter from "../components/locationSearch/Filter";
import AddLocation from "../components/locationSearch/AddLocation";
import LocationGallery from "../components/locationSearch/LocationGallery";

function LocationList() {

  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Filter />
        <AddLocation />
      </div>
      <LocationGallery />
      <Footer />
    </div>
  );
}

export default LocationList;

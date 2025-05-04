/* LocationMap.tsx */
import { Navbar } from "../components/general/Navbar";
import FilterSidebar from "../components/locationSearch/FilterSidebar";
import Map from "../components/locationSearch/Map";
import Footer from "../components/general/Footer/Footer";

function LocationMap() {
  return (
    /* jetzt korrekt mit className */
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Filter liegt IMMER über der Karte */}
      <FilterSidebar />

      {/* Map füllt den verbleibenden Platz */}
      <Map />

      <Footer />
    </div>
  );
}

export default LocationMap;

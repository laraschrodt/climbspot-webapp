/* LocationMap.tsx */
import { Navbar } from "../components/general/Navbar";
import Filter from "../components/locationSearch/Filter";
import Map from "../components/locationSearch/map";
import Footer from "../components/general/Footer/Footer";

function LocationMap() {
  return (
    /* jetzt korrekt mit className */
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Filter liegt IMMER über der Karte */}
      <Filter />

      {/* Map füllt den verbleibenden Platz */}
      <Map />

      <Footer />
    </div>
  );
}

export default LocationMap;

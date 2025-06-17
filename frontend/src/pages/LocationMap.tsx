import { useState } from "react";
import { Navbar } from "../components/general/Navbar";
import Filter, { FilterCriteria } from "../components/locationSearch/Filter";
import Footer from "../components/general/Footer/Footer";
import Map from "../components/locationSearch/Map";


/**
 * LocationMap-Komponente
 *
 * Seite zur Anzeige von Kletterorten auf einer interaktiven Karte.
 * Nutzer können Filterkriterien setzen, welche an die Map-Komponente übergeben werden.
 *
 * Besteht aus globaler Navigationsleiste (`Navbar`), Filterkomponente, Karte und Footer.
 */

function LocationMap() {
  const [filter, setFilter] = useState<FilterCriteria | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Filter onApply={setFilter} />
      <Map filter={filter} />
      <Footer />
    </div>
  );
}

export default LocationMap;

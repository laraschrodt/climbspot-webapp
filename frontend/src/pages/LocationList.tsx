import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/general/Navbar";
import Footer from "../components/general/Footer/Footer";
import Filter, { FilterCriteria } from "../components/locationSearch/Filter";
import LocationGallery from "../components/locationSearch/LocationGallery";
import { Location } from "../models/Location";


/**
 * LocationList-Komponente
 *
 * Zeigt eine Liste aller Kletterorte mit Filterfunktion an.
 * Lädt alle Orte beim Initial-Render vom Backend und ermöglicht Nutzern,
 * die Liste durch verschiedene Kriterien wie Kletterart, Schwierigkeit,
 * Standort, Kletterzeit und weitere Attribute einzuschränken.
 *
 * Besteht aus globaler Navigationsleiste, Filterkomponente, Galerie der Orte und Footer.
 * Die Filterlogik wird lokal verwaltet und filtert die geladenen Daten.
 */

const LocationList: React.FC = () => {
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get<Location[]>("/api/locations/all");
        setAllLocations(response.data);
        setFilteredLocations(response.data);
      } catch (error) {
        console.error("Fehler beim Laden der Locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleFilter = (criteria: FilterCriteria) => {
    const result = allLocations.filter((loc) => {
      if (criteria.kletterart && loc.kletterart !== criteria.kletterart) {
        return false;
      }

      const diff =
        typeof loc.schwierigkeit === "string"
          ? parseFloat(loc.schwierigkeit)
          : loc.schwierigkeit;
      if (criteria.maxDifficulty && diff > criteria.maxDifficulty) {
        return false;
      }

      if (criteria.standort) {
        const target = `${loc.region}, ${loc.land}`.toLowerCase();
        if (!target.includes(criteria.standort.toLowerCase())) {
          return false;
        }
      }

      if (criteria.kletterzeit && loc.kletterzeit) {
        const hours = parseFloat(loc.kletterzeit);
        if (hours > criteria.kletterzeit) {
          return false;
        }
      }

      if (
        criteria.kletterlaenge &&
        loc.kletterlaenge_m! > criteria.kletterlaenge
      ) {
        return false;
      }

      if (
        criteria.kinderfreundlich !== null &&
        loc.kinderfreundlich !== criteria.kinderfreundlich
      ) {
        return false;
      }

      return true;
    });

    setFilteredLocations(result);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Filter onApply={handleFilter} />
      </div>
      <LocationGallery locations={filteredLocations} />
      <Footer />
    </div>
  );
};

export default LocationList;

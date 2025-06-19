import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocationCard from "../../locationSearch/LocationCard";
import axios from "axios";
import { Location } from "../../../models/Location";

/**
 * Erweiterung des `Location`-Modells um ein `rating`-Feld.
 * Wird verwendet für die Anzeige populärer Orte.
 */
// FIXME: Sterne-Rating wird nicht angezeigt (Logik aus LocationList übernehmen)
interface PopularLocation extends Location {
  rating: number;
}

/**
 * Kontext:
 * Wird im `HomePage`-Layout verwendet, um Nutzern beliebte Locations
 * zu präsentieren und sie zur Erkundung anzuregen.
 *
 * Funktion:
 * - Ruft beim Laden der Seite beliebte Orte über `/api/locations/popular` ab.
 * - Zeigt eine Liste von `LocationCard`-Komponenten als Grid.
 * - Jeder Ort ist anklickbar und führt zur Detailansicht.
 *
 * Hinweis:
 * Die Rating-Logik in `LocationCard` sollte geprüft werden, da Sterne evtl. nicht korrekt dargestellt werden.
 */
const PopularLocations: React.FC = () => {
  const [popularSpots, setPopularSpots] = useState<PopularLocation[]>([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await axios.get<PopularLocation[]>(
          "/api/locations/popular"
        );
        setPopularSpots(response.data);
      } catch (err) {
        console.error("Fehler beim Laden der populären Orte:", err);
      }
    };
    fetchPopular();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 mt-8 text-2xl font-bold">Popular Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {popularSpots.map((spot) => (
          <Link
            to={`/details/${spot.ort_id}`}
            key={spot.ort_id}
            className="block"
          >
            <LocationCard
              name={spot.name}
              location={`${spot.region}, ${spot.land}`}
              difficulty={spot.schwierigkeit.toString()}
              rating={spot.rating}
              imageUrl={spot.picture_url ?? ""}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularLocations;

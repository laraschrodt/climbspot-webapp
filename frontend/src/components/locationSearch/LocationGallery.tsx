import React from "react";
import { Link } from "react-router-dom";
import LocationCard from "./LocationCard";
import { Location } from "../../models/Location";

interface LocationGalleryProps {
  locations: Location[];
}

/**
 * Komponente zur Darstellung einer Galerie von Kletterlocations.
 *
 * Berechnet den Bewertungsdurchschnitt aus `bewertungen`, falls vorhanden.
 * Fällt auf `rating` zurück, wenn das Backend bereits den Durchschnitt liefert.
 */
const LocationGallery: React.FC<LocationGalleryProps> = ({ locations }) => {
  const calcAverage = (arr: { sterne: number }[] = []) =>
    arr.length === 0
      ? 0
      : Math.round(arr.reduce((sum, x) => sum + x.sterne, 0) / arr.length);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 mt-8 text-2xl font-bold">Locations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {locations.map((spot) => {
          const average =
            spot.rating !== undefined
              ? spot.rating // schon berechnet
              : calcAverage(spot.bewertungen); // aus Einzelwerten

          return (
            <Link
              to={`/details/${spot.ort_id}`}
              key={spot.ort_id}
              className="block"
            >
              <LocationCard
                name={spot.name}
                location={`${spot.region}, ${spot.land}`}
                difficulty={(spot.schwierigkeit ?? 0).toString()}
                rating={average}
                imageUrl={spot.picture_url ?? ""}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LocationGallery;

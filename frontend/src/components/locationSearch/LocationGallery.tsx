import React from "react";
import { Link } from "react-router-dom";
import LocationCard from "./LocationCard";
import { Location } from "../../models/Location";

interface LocationGalleryProps {
  locations: Location[];
}

const LocationGallery: React.FC<LocationGalleryProps> = ({ locations }) => {
  const calculateAverageRating = (bewertungen: { sterne: number }[] = []) => {
    if (bewertungen.length === 0) return 0;
    const sum = bewertungen.reduce((a, b) => a + b.sterne, 0);
    return Math.round(sum / bewertungen.length);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 mt-8 text-2xl font-bold">Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {locations.map((spot) => (
          <Link
            to={`/details/${spot.ort_id}`}
            key={spot.ort_id}
            className="block"
          >
            <LocationCard
              name={spot.name}
              location={`${spot.region}, ${spot.land}`}
              difficulty={spot.schwierigkeit.toString()}
              rating={calculateAverageRating(spot.rating)}
              imageUrl={spot.picture_url ?? ""}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LocationGallery;

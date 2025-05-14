import React from "react";
import LocationCard from "./LocationCard";

// Beispiel-Daten (kannst du später durch echte ersetzen)
const spots = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Kletterspot ${i + 1}`,
  location: `Ort ${i + 1}`,
  difficulty: ["Leicht", "Mittel", "Schwer"][i % 3],
  rating: (i % 5) + 1,
  imageUrl: "https://hansens-esszimmer.de/cms/wp-content/uploads/2021/04/placeholder-2.png",
}));

const LocationGallery: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 mt-8 text-2xl font-bold">Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {spots.map((spot) => (
          <LocationCard
            key={spot.id}
            name={spot.name}
            location={spot.location}
            difficulty={spot.difficulty}
            rating={spot.rating}
            imageUrl={spot.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationGallery;

// src/components/home/PopularLocations.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocationCard from "../../locationSearch/LocationCard";
import axios from "axios";
import { Location } from "../../../models/Location";

interface PopularLocation extends Location {
  rating: number;
}

const PopularLocations: React.FC = () => {
  const [popularSpots, setPopularSpots] = useState<PopularLocation[]>([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await axios.get<PopularLocation[]>("/api/locations/popular");
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
            to={`/details/${spot.name}`}
            key={spot.name}
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

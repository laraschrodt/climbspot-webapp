import { useEffect, useState } from "react";
import LocationCard from "../../locationSearch/LocationCard";
import axios from "axios";

interface Spot {
  id: string;
  name: string;
  location: string;
  difficulty: string;
  rating: number;
  imageUrl: string;
}

const PopularLocations = () => {
  const [popularSpots, setPopularSpots] = useState<Spot[]>([]);

  useEffect(() => {
    const fetchPopularLocations = async () => {
      try {
        const response = await axios.get("/api/locations/popular");
        setPopularSpots(response.data);
      } catch (error) {
        console.error("Fehler beim Laden der populären Orte:", error);
      }
    };

    fetchPopularLocations();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 mt-8 text-2xl font-bold">Popular Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {popularSpots.map((spot) => (
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

export default PopularLocations;

import LocationCard from "../../locationSearch/LocationCard";

/* Bereich für die beliebtesten Locations im Home Menü */
const PopularLocations = () => {
  // Beispielhafte Daten – später durch echte Daten aus API/Props ersetzbar
  const popularSpots = [
    {
      id: 1,
      name: "Kletterhalle Nord",
      location: "München",
      difficulty: "Mittel",
      rating: 4,
      imageUrl: "https://hansens-esszimmer.de/cms/wp-content/uploads/2021/04/placeholder-2.png",
    },
    {
      id: 2,
      name: "Boulder Base",
      location: "Berlin",
      difficulty: "Schwer",
      rating: 5,
      imageUrl: "https://hansens-esszimmer.de/cms/wp-content/uploads/2021/04/placeholder-2.png",
    },
    {
      id: 3,
      name: "Bloc City",
      location: "Hamburg",
      difficulty: "Leicht",
      rating: 3,
      imageUrl: "https://hansens-esszimmer.de/cms/wp-content/uploads/2021/04/placeholder-2.png",
    },
    // weitere Spots ...
  ];

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

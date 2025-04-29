import { LocationCard } from "./LocationCard";

/* Bereich für die beliebtesten Locations im Home Menü */
const PopularLocations = () => {
  return (
    <div className="container mx-auto p-4 allei">
      <h1 className="mb-8 mt-8">Popular Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <LocationCard />
        <LocationCard />
        <LocationCard />
        <LocationCard />
        <LocationCard />
        <LocationCard />
      </div>
    </div>
  );
};

export default PopularLocations;

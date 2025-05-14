import React from "react";
import Rating from "./Rating";

interface LocationCardProps {
  name: string;
  location: string;
  difficulty: string;
  rating: number;
  imageUrl?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  location,
  difficulty,
  rating,
  imageUrl = "https://hansens-esszimmer.de/cms/wp-content/uploads/2021/04/placeholder-2.png",
}) => {
  return (
    <div className="card bg-base-100 shadow-sm w-full">
      <figure>
        <img src={imageUrl} alt={name} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-sm text-gray-600">{location}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-medium">Schwierigkeit: {difficulty}</span>
          <Rating value={rating} />
        </div>
      </div>
    </div>
  );
};

export default LocationCard;

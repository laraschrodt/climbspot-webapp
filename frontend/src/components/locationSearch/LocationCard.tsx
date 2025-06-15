import React from "react";
import Rating from "./Rating";

interface LocationCardProps {
  name: string;
  location: string;
  difficulty: number | string;
  rating: number;
  imageUrl: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  location,
  difficulty,
  rating,
  imageUrl,
}) => {
  return (
<div className="card bg-white shadow-sm w-full min-h-[420px] flex flex-col">
  <figure>
    <img src={imageUrl} alt={name} className="h-48 w-full object-cover" />
  </figure>
  <div className="card-body flex flex-col flex-1">
    <h2 className="card-title">{name}</h2>
    <p className="text-sm text-gray-600">{location}</p>
    <div className="flex justify-between items-center mt-2">
      <span className="text-sm font-medium">
        Schwierigkeit: {difficulty}
      </span>
      <Rating value={rating} />
    </div>
  </div>
</div>
  );
};

export default LocationCard;

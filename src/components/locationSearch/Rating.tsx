import React from "react";

interface RatingProps {
  value: number;
}

const Rating: React.FC<RatingProps> = ({ value }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`mask mask-star ${i <= value ? "bg-yellow-400" : "bg-gray-300"}`}
          aria-label={`${i} star`}
          aria-current={i === value ? "true" : undefined}
        />
      ))}
    </div>
  );
};

export default Rating;

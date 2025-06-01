import React from "react";
import Favorites from "./Favorites";
import Review from "./Reviews";

interface Review {
  location: string;
  rating: number;
  comment: string;
}

interface Props {
  favorites: string[];
  reviews: Review[];
}

const ProfileDetails: React.FC<Props> = () => {
  return (
    <div className="space-y-8">
      <Favorites />
      <Review />
    </div>
  );
};

export default ProfileDetails;

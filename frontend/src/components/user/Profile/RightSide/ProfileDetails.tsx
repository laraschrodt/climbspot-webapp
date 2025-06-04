import React from "react";
import Favorites from "./Favorites";
import Review from "./Ratings";

interface Review {
  location: string;
  rating: number;
  comment: string;
}

interface Props {
  favorites: string[];
  reviews: Review[];
}

const ProfileDetails: React.FC<Props> = ({ favorites, reviews }) => {
  return (
    <div className="space-y-8">
      <Favorites favorites={favorites} />
      <Review reviews={reviews} />
    </div>
  );
};

export default ProfileDetails;

import React from "react";
import Favorites from "./Favorites";
import Review from "./Reviews";
import MyLocations from "./MyLocations";

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
      <MyLocations />
    </div>
  );
};

export default ProfileDetails;

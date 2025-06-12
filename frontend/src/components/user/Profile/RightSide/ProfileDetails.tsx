import React from "react";
import Favorites from "./Favorites";
import Review from "./Ratings";
import MyLocations from "./MyLocations";

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

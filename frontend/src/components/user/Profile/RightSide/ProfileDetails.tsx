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

/**
 * ProfileDetails-Komponente
 *
 * Stellt den rechten Bereich der `ProfilePage` dar.
 * Bündelt die Anzeige der Nutzer-Favoriten, abgegebenen Bewertungen und selbst erstellten Orte.
 *
 * Die benötigten Daten (`favorites` und `reviews`) werden vom Parent übergeben.
 * Einzelne Unterkomponenten wie `MyLocations` laden ihre Inhalte eigenständig.
 *
 */

const ProfileDetails: React.FC<Props> = ({ favorites, reviews }) => {
  return (
    <div className="space-y-8">
      {/* FIXME: favorites und reviews */}
      <Favorites favorites={favorites} />
      <Review reviews={reviews} />
      <MyLocations />
    </div>
  );
};

export default ProfileDetails;

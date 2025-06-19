import React from "react";
import Favorites from "./Favorites";
import Review from "./Reviews";
import MyLocations from "./MyLocations";
import UserAdministration from "./UserAdministration";
import ProtectedComponent from "../../../../routes/ProtectedComponent";
import CreateAdmin from "./CreateAdmin";

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
 * Stellt den rechten Bereich der `ProfilePage` dar.
 * Bündelt die Anzeige der Nutzer-Favoriten, abgegebenen Bewertungen und selbst erstellten Orte.
 *
 * Die benötigten Daten (`favorites` und `reviews`) werden vom Parent übergeben.
 * Einzelne Unterkomponenten wie `MyLocations` laden ihre Inhalte eigenständig.
 * Admins können hier Benutzer verwalten und Admin-Accounts anlegen.
 *
 */

const ProfileDetails: React.FC<Props> = ({ favorites, reviews }) => {
  return (
    <div className="space-y-8">
      {/* FIXME: favorites und reviews */}
      <Favorites favorites={favorites} />

      <Review reviews={reviews} />

      <MyLocations />

      <ProtectedComponent roles={["admin"]}>
        <UserAdministration />
      </ProtectedComponent>

      <ProtectedComponent roles={["admin"]}>
        <CreateAdmin />
      </ProtectedComponent>
    </div>
  );
};

export default ProfileDetails;

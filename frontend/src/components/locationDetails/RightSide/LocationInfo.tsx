import React from "react";
import { Location } from "../../../models/Location";
import Description from "./LocationInfo/Description";
import AccessInfo from "./LocationInfo/AccessInfo";
import SpecialNotes from "./LocationInfo/SpecialNotes";

interface Props {
    /** Location-Objekt mit allen Details, die angezeigt werden sollen */
  location: Location;
}


/**
 * Komponente zur Darstellung umfassender Informationen einer Location.
 *
 * Kontext:
 * Wird typischerweise in der rechten Seitenleiste der Location-Detailseite
 * verwendet, um die verschiedenen Informationsbereiche übersichtlich anzuzeigen.
 *
 * Funktion:
 * - Bindet die Unterkomponenten `Description`, `AccessInfo` und `SpecialNotes` ein.
 * - Stellt diese in einem responsiven Layout dar.
 */
const LocationInfo: React.FC<Props> = ({ location }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-[-50px] p-4 gap-6">
        <div className="md:w-2/3 space-y-6">
          <Description location={location} />
          <AccessInfo location={location} />
          <SpecialNotes location={location} />
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;

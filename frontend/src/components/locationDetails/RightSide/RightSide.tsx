import React from "react";
import { Location } from "../../../types/Location";
import LocationInfo from "./LocationInfo";

/**
 * Rechte Spalte der Detailansicht.
 *
 * Kontext:
 * Wird in `LocationDetails.tsx` genutzt.
 *
 * Funktion:
 * - Beinhaltet die `LocationInfo`-Komponente, die alle Infos zum Kletterspot anzeigt.
 *
 * Props:
 * - `location`: Vollständiges Location-Objekt mit Beschreibung, Zugang, Besonderheiten etc.
 */

interface RightSidebarProps {
  location: Location;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ location }) => {
  return (
    <div className="w-full md:w-2/3">
      <div className="text-xl font-semibold mt-8">
        <LocationInfo location={location} />
      </div>
    </div>
  );
};

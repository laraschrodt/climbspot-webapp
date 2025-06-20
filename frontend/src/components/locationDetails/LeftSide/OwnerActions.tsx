import React from "react";
import { Link } from "react-router-dom";
import ProtectedComponent from "../../../routes/ProtectedComponent";
import DeleteLocationButton from "./DeleteLocationButton";

/**
 * Zeigt Buttons zum Bearbeiten und Löschen, wenn der Benutzer der Eigentümer ist.
 *
 * Kontext:
 * Wird in `LeftSide.tsx` angezeigt, wenn `isOwner === true`.
 *
 * Funktion:
 * - Verlinkt zur Bearbeitungsseite.
 * - Zeigt `DeleteLocationButton` zum Löschen.
 *
 * Props:
 * - `locationId`: ID des aktuellen Ortes.
 */

interface OwnerActionsProps {
  locationId: string;
}

export const OwnerActions: React.FC<OwnerActionsProps> = ({ locationId }) => {
  return (
    <ProtectedComponent roles={["user", "admin"]}>
      <div className="flex gap-4">
        <Link to={`/edit-location/${locationId}`} className="btn btn-secondary">
          Bearbeiten
        </Link>
        <DeleteLocationButton locationId={locationId} />
      </div>
    </ProtectedComponent>
  );
};

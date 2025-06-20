import React from "react";

/**
 * Button zum Hinzufügen oder Entfernen eines Ortes aus den Favoriten.
 *
 * Kontext:
 * Teil von `LeftSide.tsx`, unterhalb des Bewertungsbereichs.
 *
 * Funktion:
 * - Zeigt statusabhängig "Zu Favoriten hinzufügen" oder "Vom Favoriten entfernen".
 * - Löst `onToggle` aus, um den Favoritenstatus per API zu ändern.
 *
 * Props:
 * - `isFavorited`: Aktueller Status (boolean).
 * - `onToggle`: Callback zum Umschalten.
 */

interface FavoriteButtonProps {
  isFavorited: boolean;
  onToggle: () => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorited,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className="w-full btn btn-primary"
    >
      {isFavorited
        ? "Vom Favoriten entfernen"
        : "Zu Favoriten hinzufügen"}
    </button>
  );
};

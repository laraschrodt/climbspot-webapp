import React from "react";

/**
 * Öffnet eine Google-Maps-Route zum Ort via ÖPNV.
 *
 * Kontext:
 * Wird in `LeftSide.tsx` angezeigt.
 *
 * Funktion:
 * - Baut eine URL für Google Maps basierend auf Längen- und Breitengrad.
 * - Öffnet Route im neuen Tab.
 *
 * Props:
 * - `lat`, `long`: Koordinaten der Location.
 */

interface TransitButtonProps {
  lat: number;
  long: number;
}

export const TransitButton: React.FC<TransitButtonProps> = ({ lat, long }) => {
  const url = `https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=${lat},${long}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-600 hover:underline"
    >
      ÖPNV Route
    </a>
  );
};


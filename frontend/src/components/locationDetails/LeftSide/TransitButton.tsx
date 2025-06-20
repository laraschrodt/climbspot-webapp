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
  const handleClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}&travelmode=transit`;
    window.open(url, "_blank");
  };

  return (
    <button className="btn btn-secondary w-full" onClick={handleClick}>
      ÖPNV - Route zu Google Maps
    </button>
  );
};

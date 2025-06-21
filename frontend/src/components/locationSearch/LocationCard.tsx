import React from "react";
import Rating from "./Rating";

/**
 * Props für die `LocationCard`-Komponente.
 *
 * @property name – Name der Location.
 * @property location – Ort, Region oder Beschreibung des Standorts.
 * @property difficulty – Schwierigkeitsgrad (Zahl oder Text).
 * @property rating – Durchschnittliche Bewertung (z.B. von 1 bis 5).
 * @property imageUrl – Pfad oder URL zum Bild der Location.
 */

interface LocationCardProps {
  name: string;
  location: string;
  difficulty: number | string;
  rating: number;
  imageUrl: string;
}

/**
 * Visuelle Karte zur Darstellung einer einzelnen Kletterlocation.
 *
 * Kontext:
 * Wird auf Übersichtsseiten wie Karte oder Liste verwendet, um
 * eine Location kompakt mit Bild, Name, Schwierigkeit und Bewertung anzuzeigen.
 *
 * Funktion:
 * - Zeigt ein Bild, den Namen und Ort der Location.
 * - Zeigt Schwierigkeitsgrad und eine Sternebewertung.
 * - Nutzt TailwindCSS für responsives Design und einheitlichen Stil.
 */

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  location,
  difficulty,
  rating,
  imageUrl,
}) => {
  return (
    <div className="card bg-white shadow-sm w-full min-h-[420px] flex flex-col">
      <figure>
        <img src={imageUrl} alt={name} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body flex flex-col flex-1">
        <h2 className="card-title">{name}</h2>
        <p className="text-sm text-gray-600">{location}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-medium">
            Schwierigkeit: {difficulty}
          </span>
          <Rating value={rating} />
        </div>
      </div>
    </div>
  );
};

export default LocationCard;

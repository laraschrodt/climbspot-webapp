import React from "react";

/**
 * Props für die `Rating`-Komponente.
 * 
 * @property value - Bewertungswert zwischen 0 und 5.
 */

interface RatingProps {
  value: number;
}


/**
 * Zeigt eine einfache Sternebewertung basierend auf dem Wert (`value`) an.
 *
 * Kontext:
 * Wird z. B. in `LocationCard` verwendet, um die durchschnittliche Bewertung einer Location visuell darzustellen.
 *
 * Funktion:
 * - Rendered 5 Sterne (maskierte Icons) in einer Reihe.
 * - Die Anzahl gelber Sterne entspricht dem Bewertungswert (`value`).
 * - Verwendet TailwindCSS-Klassen für das Styling (Sternefarbe, Größe).
 *
 * Hinweise:
 * - Unterstützt aktuell nur volle Sterne (kein Halb-Stern).
 * - Für ARIA-Zugänglichkeit werden die Sterne mit passenden Labels versehen.
 */

const Rating: React.FC<RatingProps> = ({ value }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`mask mask-star w-4 h-4 ${i <= value ? "bg-yellow-400" : "bg-gray-300"}`}
          aria-label={`${i} star`}
          aria-current={i === value ? "true" : undefined}
        />
      ))}
    </div>
  );
};

export default Rating;

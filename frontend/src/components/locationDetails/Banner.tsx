import React from "react";

/**
 * Banner-Komponente für die Location-Detailseite.
 *
 * Kontext:
 * Wird oben auf der Detailansicht angezeigt, mit einem großen Bild und Titelinformationen.
 *
 * Funktion:
 * - Zeigt den Namen der Location, einen Untertitel und das Hintergrundbild.
 * - Macht das Layout für die Location-Überschrift wiederverwendbar.
 *
 * Props:
 * - `title`: Name des Spots.
 * - `subtitle`: Unterzeile mit erklärendem Text.
 * - `imageUrl`: Bild-URL für den Header-Hintergrund.
 */

interface BannerProps {
  title: string;
  imageUrl: string;
  subtitle?: string;
}

export const Banner: React.FC<BannerProps> = ({ title, imageUrl, subtitle }) => {
  return (
    <div
      className="w-full h-128 bg-cover bg-center text-white text-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h1 className="text-4xl font-bold">{title}</h1>
      {subtitle && (
        <p className="text-lg max-w-xl px-4 mt-2">{subtitle}</p>
      )}
    </div>
  );
};
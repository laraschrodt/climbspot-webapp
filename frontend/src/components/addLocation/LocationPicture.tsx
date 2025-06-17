import React from "react";
import { Camera } from "react-feather";
import placeholderLocation from "../../assets/images/placeholder-location.png";

interface LocationPictureProps {
    /** Aktuelle Bild-URL oder leer für Platzhalterbild */
  imageUrl: string;
      /** Callback, wenn der Benutzer ein neues Bild auswählt */
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


/**
 * Komponente zur Anzeige und Auswahl eines Location-Bildes.
 *
 * Kontext:
 * Wird z. B. im Formular zur Erstellung oder Bearbeitung einer Location verwendet,
 * um ein Bild hochzuladen oder anzuzeigen.
 *
 * Funktion:
 * - Zeigt entweder das gewählte Bild oder ein Platzhalterbild an.
 * - Ermöglicht dem Benutzer die Auswahl eines neuen Bildes über eine versteckte Datei-Eingabe.
 * - Löst bei Änderung das übergebene `onImageChange`-Event aus.
 */
const LocationPicture: React.FC<LocationPictureProps> = ({
  imageUrl,
  onImageChange,
}) => (
  <div className="relative w-48 h-48">
    <img
      src={imageUrl || placeholderLocation}
      alt="Location"
      className="w-48 h-48 rounded-lg border-2 border-gray-300 object-cover"
    />
    <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full border cursor-pointer">
      <Camera size={20} />
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onImageChange}
      />
    </label>
  </div>
);

export default LocationPicture;

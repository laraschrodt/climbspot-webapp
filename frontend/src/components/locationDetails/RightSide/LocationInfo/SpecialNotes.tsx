import React from 'react';
import { Location } from '../../../../models/Location';

interface Props {
    /** Location-Objekt mit speziellen Zusatzinformationen */
  location: Location;
}



/**
 * Komponente zur Anzeige spezieller Zusatzinformationen einer Location.
 *
 * Kontext:
 * Wird in der rechten Seitenleiste der Location-Detailansicht verwendet,
 * um wichtige Details zur Ausrüstung, Kletterlänge, Zeit, Art und
 * Kinderfreundlichkeit übersichtlich darzustellen.
 *
 * Funktion:
 * - Zeigt Ausrüstung, Kletterlänge (in Metern), Kletterzeit, Kletterart
 *   sowie Kinderfreundlichkeit als Ja/Nein an.
 * - Layout als responsive Grid mit zwei Spalten.
 */
const SpecialNotes: React.FC<Props> = ({ location }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm">
    <p><strong>Ausrüstung:</strong> {location.ausruestung}</p>
    <p><strong>Kletterlänge:</strong> {location.kletterlaenge_m} m</p>
    <p><strong>Kletterzeit:</strong> {location.kletterzeit}</p>
    <p><strong>Kletterart:</strong> {location.kletterart}</p>
    <p><strong>Kinderfreundlichkeit:</strong> {location.kinderfreundlich ? "Ja" : "Nein"}</p>
  </div>
);

export default SpecialNotes;

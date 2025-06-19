import React from 'react';
import { Location } from '../../../../models/Location';

interface Props {
    /** Location-Objekt, dessen Beschreibung angezeigt wird */
  location: Location;
}


/**
 * Komponente zur Anzeige der Beschreibung einer Location.
 *
 * Kontext:
 * Wird in der rechten Seitenleiste der Location-Detailansicht verwendet,
 * um den charakteristischen Text bzw. die Beschreibung der Kletterlocation
 * darzustellen.
 *
 * Funktion:
 * - Zeigt eine Überschrift "Beschreibung".
 * - Gibt den Text aus `location.charakter` formatiert mit Zeilenumbrüchen wieder.
 * - Wenn keine Beschreibung vorhanden ist, wird ein Platzhaltertext angezeigt.
 */

const Description: React.FC<Props> = ({ location }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Beschreibung</h3>
    <p className="text-gray-700 whitespace-pre-line">
      {location.charakter ?? "Keine Beschreibung vorhanden."}
    </p>
  </div>
);

export default Description;
import React from 'react';
import { Location } from '../../../../models/Location';

interface Props {
  location: Location;
}

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

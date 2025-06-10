import React from 'react';
import { Location } from '../../../../models/Location';

interface Props {
  location: Location;
}

const Description: React.FC<Props> = ({ location }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Beschreibung</h3>
    <p className="text-gray-700 whitespace-pre-line">
      {location.charakter ?? "Keine Beschreibung vorhanden."}
    </p>
  </div>
);

export default Description;
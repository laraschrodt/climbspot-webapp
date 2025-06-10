import React from 'react';
import { Location } from '../../../../models/Location';

interface Props {
  location: Location;
}

const AccessInfo: React.FC<Props> = ({ location }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm">
    <p><strong>Koordinaten:</strong> {location.lat}, {location.long}</p>
    <p><strong>Gebirge:</strong> {location.gebirge}</p>
    <p><strong>Berg:</strong> {location.berg}</p>
    <p><strong>Talort:</strong> {location.talort}</p>
    <p><strong>Berghöhe:</strong> {location.hoehe_einstieg_m} m</p>
  </div>
);

export default AccessInfo;

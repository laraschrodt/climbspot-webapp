import React from 'react';
import { Location } from '../../../../models/Location';

interface Props {
  location: Location;
}

const GeneralInfo: React.FC<Props> = ({ location }) => (
  <div className="bg-white rounded-xl shadow-md p-4 mb-4 md:mb-0">
    <img
      src={location.picture_url ?? ""}
      alt={location.name}
      className="rounded-xl w-full h-48 object-cover mb-4"
    />
    <h2 className="text-xl font-bold">{location.name}</h2>
    <p className="text-sm text-gray-600">
      {location.region}, {location.land}
    </p>
    <p className="text-sm text-gray-600">
      Schwierigkeit: {location.schwierigkeit}
    </p>
  </div>
);

export default GeneralInfo;

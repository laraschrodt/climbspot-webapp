import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Location } from "../../models/Location";

const LocationDetails: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { locationId } = useParams<{ locationId: string }>();

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await fetch(`/api/locations/details/${locationId}`);
        if (!response.ok) {
          throw new Error("Standort nicht gefunden");
        }
        const data = await response.json();
        setLocation(data);
      } finally {
        setLoading(false);
      }
    };

    if (locationId) {
      fetchLocationDetails();
    }
  }, [locationId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!location) {
    return <p>Kein Standort gefunden.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div
        className="bg-cover bg-center h-64"
        style={{ backgroundImage: `url(${location.picture_url})` }}
      ></div>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-[-50px] p-4">
        <div className="md:w-1/3 bg-white rounded-xl shadow-md p-4 mb-4 md:mb-0">
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

        <div className="md:w-2/3 md:pl-8 space-y-4">
          <h3 className="text-lg font-semibold mb-2">Beschreibung</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {location.charakter ?? "Keine Beschreibung vorhanden."}
          </p>

          <h3 className="text-lg font-semibold">Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm">
            <p>
              <strong>Koordinaten:</strong> {location.lat}, {location.long}
            </p>
            <p>
              <strong>Charakter:</strong> {location.charakter}
            </p>
            <p>
              <strong>Gebirge:</strong> {location.gebirge}
            </p>
            <p>
              <strong>Berg:</strong> {location.berg}
            </p>
            <p>
              <strong>Berghöhe:</strong> {location.hoehe_einstieg_m} m
            </p>
            <p>
              <strong>Talort:</strong> {location.talort}
            </p>
            <p>
              <strong>Ausrüstung:</strong> {location.ausruestung}
            </p>
            <p>
              <strong>Kletterlänge:</strong> {location.kletterlaenge_m} m
            </p>
            <p>
              <strong>Kletterzeit:</strong> {location.kletterzeit}
            </p>
            <p>
              <strong>Kletterart:</strong> {location.kletterart}
            </p>
            <p>
              <strong>Kinderfreundlichkeit:</strong>{" "}
              {location.kinderfreundlich ? "Ja" : "Nein"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;

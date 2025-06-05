import React, { useEffect, useState } from "react";
import axios from "axios";
import LocationInfo from "./LocationInfo";

export interface Location {
  ort_id: string;
  name: string;
  schwierigkeit: string;
  koordinaten: string;
  charakter: string;
  land: string;
  region: string;
  gebirge: string;
  berg: string;
  berghoehe_m: number;
  talort: string;
  ausruestung: string;
  kletterlaenge_m: number;
  kletterzeit: string;
  kletterart: string;
  kinderfreundlichkeit: string;
  absicherung: string;
  picture_url: string;
  beschreibung?: string;
  averageRating?: number;
  isFavorite?: boolean;
}

interface Props {
  locationName: string;  
}

const LocationDetails: React.FC<Props> = ({ locationName }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("API-Request: /api/details/id/$" + encodeURIComponent(locationName));  // Log vor dem Request
        const response = await axios.get(
          `/api/details/id/${encodeURIComponent(locationName)}`
        );
        const data: Location = response.data;

        if (data.name === "Unbekannter Ort") {
          setError(true);
        } else {
          setError(false);
        }

        setLocation(data);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [locationName]);

  if (loading) return <div>Lade Daten...</div>;

  if (error)
    return (
      <div>
        <p>Die Details konnten nicht geladen werden.</p>
        {location && <LocationInfo location={location} />}
      </div>
    );

  if (!location) return <div>Keine Daten gefunden.</div>;

  return (
    <div>
      <LocationInfo location={location} />
    </div>
  );
};

export default LocationDetails; 
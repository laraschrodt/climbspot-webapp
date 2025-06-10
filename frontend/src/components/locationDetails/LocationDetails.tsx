import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Reviews from './LeftSide/Reviews';
import LocationInfo from './RightSide/LocationInfo';
import { Location } from '../../models/Location';

/*
// Berechnungslogik für Sterne
const calculateAverageRating = (bewertungen: { sterne: number }[] = []) => {
  if (bewertungen.length === 0) return 0;
  const sum = bewertungen.reduce((a, b) => a + b.sterne, 0);
  return Math.round(sum / bewertungen.length);
};

const StarRating: React.FC<{ rating: number, onClick: (rating: number) => void }> = ({ rating, onClick }) => {
  const stars = [1, 2, 3, 4, 5];
  
  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= rating ? "yellow" : "gray"} // Gelb für volle Sterne und Grau für leere Sterne
          className="w-7 h-7 cursor-pointer"
          onClick={() => onClick(star)} // onClick-Handler für die Sterne
        >
          <path
            fillRule="evenodd"
            d="M10 15l-3.293 1.735.629-3.672L4 8.387l3.737-.577L10 4l1.263 3.81L15 8.387l-3.336 4.676.629 3.672L10 15z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};
*/

const LocationDetails: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const { locationId } = useParams<{ locationId: string }>();
  const [rating, setRating] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/locations/details/${locationId}`);
        if (!res.ok) throw new Error('Standort nicht gefunden');
        const data = await res.json();

        console.log("Backend Antwort:", data);

        setLocation(data);
        setIsFavorited(data.isFavorited ?? false);
        // setRating(calculateAverageRating(data.bewertungen));
      } finally {
        setLoading(false);
      }
    };

    if (locationId) fetchData();
  }, [locationId]);

  // Bewertung senden
  const handleStarClick = async (newRating: number) => {
    const token = localStorage.getItem("token");
    if (!token || !locationId) {
      console.warn("Nicht eingeloggt oder Location fehlt");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/locations/${locationId}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ sterne: newRating }),
      });

      if (res.ok) {
        setRating(newRating);
      } else {
        const text = await res.text();
        console.error("Fehler beim Speichern der Bewertung:", text);
      }
    } catch (error) {
      console.error("Netzwerkfehler:", error);
    }
  };

  // Favoritenstatus ändern
  const handleFavoriteToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token || !locationId) {
      console.warn("Nicht eingeloggt oder Location fehlt");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/locations/favorite/${locationId}`, {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setIsFavorited(!isFavorited);
      } else {
        const text = await res.text();
        console.error("Fehler beim Aktualisieren des Favoritenstatus:", text);
      }
    } catch (error) {
      console.error('Fehler:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Banner mit Bild und Text */}
      <div
        className="w-full h-128 bg-cover bg-center text-white text-center flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${location?.picture_url})` }}
      >
        <h1 className="text-4xl font-bold">{location?.name}</h1>
        {/* Untertitel ändern */}
        <p className="text-lg max-w-xl px-4">
          Erfahre mehr über diesen Kletterspot – Bewertungen, Beschreibung und Besonderheiten.
        </p>
      </div>

      {/* Zwei-Spalten-Layout: Reviews und Buttons links, LocationInfo rechts */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4 py-8">
        {/* Spalte 1 - LeftSide: Reviews und Buttons */}
        <div className="w-full md:w-1/3 space-y-6">
          <div>
            {/* Reviews */}
            <Reviews />
          </div>

          <div className="space-y-4">
            {/* Sterne-Bewertung */}
            {/* <StarRating rating={rating} onClick={handleStarClick} /> */}
            {/* Favoriten-Button */}
            <button onClick={handleFavoriteToggle} className="w-full btn btn-primary">
              {isFavorited ? 'Vom Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
            </button>
            {/* ÖPNV-Button */}
            {location?.lat && location?.long && (
              <button
                className="btn btn-secondary w-full"
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.long}&travelmode=transit`;
                  window.open(url, "_blank");
                }}
              >
                ÖPNV - Route zu Google Maps
              </button>
            )}
          </div>
        </div>

        {/* Spalte 2 - RightSide: LocationInfo */}
        <div className="w-full md:w-2/3">
          <div className="text-xl font-semibold mt-8">
            {location && <LocationInfo location={location} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;

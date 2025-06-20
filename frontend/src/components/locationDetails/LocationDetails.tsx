import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Reviews from "./LeftSide/Reviews";
import LocationInfo from "./RightSide/LocationInfo";
import { useUserSession } from "../../auth/UseUserSession";
import ProtectedComponent from "../../routes/ProtectedComponent";
import DeleteLocationButton from "./LeftSide/DeleteLocationButton";
import { buildOpnvUrl } from "../../utils/opnv";

interface LocationData {
  ort_id: string;
  name: string;
  region: string;
  land: string;
  picture_url: string;
  lat: number;
  long: number;
  schwierigkeit: string;
  isOwner?: boolean;
}

const LocationDetails: React.FC = () => {
  const { user } = useUserSession();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const { locationId } = useParams<{ locationId: string }>();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers: Record<string, string> = {};
        if (user) {
          headers["x-user-id"] = user.userId;
        }

        const res = await fetch(`/api/locations/details/${locationId}`, {
          headers,
        });

        if (!res.ok) throw new Error("Standort nicht gefunden");

        const data = await res.json();
        setLocation(data);
        setIsOwner(data.isOwner ?? false);
      } finally {
        setLoading(false);
      }
    };

    if (locationId) fetchData();
  }, [locationId, user]);

  const handleFavoriteToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token || !locationId) {
      console.warn("Nicht eingeloggt oder Location fehlt");
      return;
    }

    try {
      const res = await fetch(`/api/locations/favorite/${locationId}`, {
        method: isFavorited ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setIsFavorited(!isFavorited);
      } else {
        const text = await res.text();
        console.error("Fehler beim Aktualisieren des Favoritenstatus:", text);
      }
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div
        className="w-full h-128 bg-cover bg-center text-white text-center flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${location?.picture_url})` }}
      >
        <h1 className="text-4xl font-bold">{location?.name}</h1>
        <p className="text-lg max-w-xl px-4">
          Erfahre mehr über diesen Kletterspot – Bewertungen, Beschreibung und Besonderheiten.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4 py-8">
        <div className="w-full md:w-1/3 space-y-6">
          {isOwner && (
            <ProtectedComponent roles={["user", "admin"]}>
              <div className="flex gap-4">
                <Link to={`/edit-location/${locationId}`} className="btn btn-secondary">
                  Bearbeiten
                </Link>
                <DeleteLocationButton locationId={locationId!} />
              </div>
            </ProtectedComponent>
          )}

          <Reviews />

          <div className="space-y-4">
            <button onClick={handleFavoriteToggle} className="w-full btn btn-primary">
              {isFavorited ? "Vom Favoriten entfernen" : "Zu Favoriten hinzufügen"}
            </button>

            {location?.lat && location?.long && (
              <button
                className="btn btn-secondary w-full"
                onClick={() => {
                  const url = buildOpnvUrl(location.lat.toString(), location.long.toString());
                  window.open(url, "_blank");
                }}
              >
                ÖPNV - Route zu Google Maps
              </button>
            )}
          </div>
        </div>

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

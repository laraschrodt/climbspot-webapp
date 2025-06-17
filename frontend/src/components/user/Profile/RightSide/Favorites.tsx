import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocationCard from "../../../locationSearch/LocationCard";
import axios from "axios";
import { Location } from "../../../../models/Location";

interface FavoriteLocation extends Location {
  rating?: { sterne: number }[];
}


/**
 * Favorites-Komponente
 *
 * Zeigt alle vom Nutzer gespeicherten Favoritenorte an.
 * Wird im rechten Bereich der `ProfilePage` eingebunden.
 *
 * Lädt die Favoritenliste nach dem Initial-Render vom Server
 * (basierend auf dem eingeloggten Nutzer) und zeigt die Orte in einer Grid-Darstellung.
 * Jeder Ort wird über eine `LocationCard` visualisiert und verlinkt zur Detailseite.
 */

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<FavoriteLocation[]>(
          "/api/profile/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites(response.data);
      } catch (err) {
        console.error("Fehler beim Laden der Favoriten:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const calculateAverageRating = (bewertungen: { sterne: number }[] = []) => {
    if (bewertungen.length === 0) return 0;
    const sum = bewertungen.reduce((acc, b) => acc + b.sterne, 0);
    return Math.round(sum / bewertungen.length);
  };

  if (loading) {
    return (
      <section className="container mx-auto p-4">
        <p>Lade Favoriten…</p>
      </section>
    );
  }

  if (favorites.length === 0) {
    return (
      <section className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl ml-0 my-4">
        <h2 className="text-xl font-semibold mb-4">Favoriten</h2>
        <p className="italic text-gray-500">Keine Favoriten vorhanden.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto max-w-5xl p-4">
      <h2 className="mb-8 mt-8 text-2xl font-bold">Favoriten</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((spot) => (
          <Link
            to={`/details/${spot.ort_id}`}
            key={spot.ort_id}
            className="block"
          >
            <LocationCard
              name={spot.name}
              location={`${spot.region}, ${spot.land}`}
              difficulty={spot.schwierigkeit.toString()}
              rating={calculateAverageRating(spot.rating)}
              imageUrl={spot.picture_url ?? ""}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Favorites;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocationCard from "../../../locationSearch/LocationCard";
import { useUserSession } from "../../../../auth/UseUserSession";
import { Location } from "../../../../models/Location";
import profilbildPlaceholder from "../../../../assets/images/profilbildPlaceholder.png";

interface MyLocation extends Location {
  bewertungen?: { sterne: number }[];
}

/**
 * MyLocations-Komponente
 *
 * Zeigt alle Orte an, die vom aktuell eingeloggten Nutzer selbst erstellt wurden.
 * Eingebunden im rechten Bereich der `ProfilePage`.
 *
 * Die Komponente lädt die Daten bei Initialisierung vom Server und zeigt sie in einer Grid-Ansicht.
 * Jede Location wird mit einer `LocationCard` dargestellt und ist zur Detailseite verlinkt.
 *
 * Bewertungsdurchschnitt wird lokal aus den abgegebenen Einzelbewertungen berechnet.
 */

const MyLocations: React.FC = () => {
  const { user } = useUserSession();
  const [locations, setLocations] = useState<MyLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/profile/get-my-locations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message ?? "Laden fehlgeschlagen");
        setLocations(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  const calcAvgRating = (arr: { sterne: number }[] = []) =>
    arr.length
      ? Math.round(arr.reduce((s, r) => s + r.sterne, 0) / arr.length)
      : 0;

  if (loading) {
    return (
      <section className="container mx-auto p-4">
        <p>Lade eigene Locations…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto p-4">
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  if (locations.length === 0) {
    return (
      <section className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl ml-0 my-4">
        <h2 className="text-xl font-semibold mb-4">Meine Locations</h2>
        <p className="italic text-gray-500">
          Du hast noch keine Locations angelegt.
        </p>
      </section>
    );
  }

  return (
<section className="container mx-auto max-w-5xl p-4">
      <h2 className="mb-8 mt-8 text-2xl font-bold">Meine Locations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((loc) => (
          <Link
            to={`/details/${loc.ort_id}`}
            key={loc.ort_id}
            className="block"
          >
            <LocationCard
              name={loc.name}
              location={`${loc.region}, ${loc.land}`}
              difficulty={loc.schwierigkeit.toString()}
              rating={
                typeof loc.rating === "number"
                  ? loc.rating
                  : calcAvgRating(loc.bewertungen)
              }
              imageUrl={loc.picture_url ?? profilbildPlaceholder}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MyLocations;

/**
 * Lädt und zeigt die Bewertungen des aktuell eingeloggten Nutzers an.
 * Jede Bewertung enthält eine Sternebewertung, einen Kommentar sowie Angaben zum bewerteten Ort.
 *
 * Die Daten werden beim Initial-Render vom Backend geladen.
 *
 * Eingebunden im rechten Bereich der `ProfilePage`.
 * Backend-Endpunkt ist noch in Planung (siehe TODO).
 */

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  sterne: number;
  kommentar: string;
  erstellt_am: string;
  orte: {
    name: string;
    picture_url: string | null;
  };
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/profile/reviews", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = Array.isArray(response?.data) ? response.data : [];
        setReviews(data);
      } catch (error) {
        console.error("Fehler beim Laden der Bewertungen:", error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchReviews, 0);
  }, []);

  if (loading) {
    return <div>Lade Bewertungen ...</div>;
  }

  return (
    <section className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl ml-0 my-4">
      <h2 className="text-xl font-semibold mb-4">Bewertungen</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">Keine Bewertungen vorhanden.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((rev, idx) => (
            <li key={idx} className="flex items-start space-x-4 border-b pb-4">
              {rev.orte?.picture_url ? (
                <img
                  src={rev.orte.picture_url}
                  alt={rev.orte.name || "Ort"}
                  className="w-14 h-14 object-cover rounded-full border"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-200 border flex items-center justify-center text-gray-400 text-xs">
                  Kein Bild
                </div>
              )}
              <div>
                <div className="flex items-center flex-wrap gap-2">
                  <h3 className="text-md font-bold">
                    {rev.orte?.name || "Unbekannter Ort"}
                  </h3>
                  <div className="flex">
                    {Array(rev.sterne)
                      .fill(0)
                      .map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    erstellt am{" "}
                    {new Date(rev.erstellt_am).toLocaleDateString("de-DE")}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{rev.kommentar}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Reviews;

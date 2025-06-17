/**
 * Reviews-Komponente
 *
 * Lädt und zeigt die Bewertungen des aktuell eingeloggten Nutzers an.
 * Jede Bewertung enthält eine Sternebewertung, einen Kommentar sowie Angaben zum bewerteten Ort.
 * 
 * Die Daten werden beim Initial-Render vom Backend geladen.
 * 
 * Eingebunden im rechten Bereich der `ProfilePage`.
 * Backend-Endpunkt ist noch in Planung (siehe TODO).
 */

// TODO: Ratings anzeigen lassen (am besten erst wenn alle normalen Locations schon implementiert sind)
/**
 * Backend hierfür steht noch nicht.
 * HTTP-Request an /profile/favorites in @file: backend/src/routes/profile.routes.ts
 * und @file: backend/src/controllers/profile.controller.ts bzw.
 * @file: backend/src/services/profile.service.ts, un die Logik zu implementieren.
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
        const response = await axios.get<Review[]>("/api/profile/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Fehler beim Laden der Bewertungen:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
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
              {rev.orte?.picture_url && (
                <img
                  src={rev.orte.picture_url}
                  alt={rev.orte.name || "Ort"}
                  className="w-14 h-14 object-cover rounded-full border"
                />
              )}
              <div>
                <div className="flex items-center space-x-2">
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
                  <span className="text-sm text-gray-400 ml-2">
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

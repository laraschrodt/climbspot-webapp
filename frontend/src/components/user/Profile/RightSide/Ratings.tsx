import React from "react";


/**
 * Review-Komponente
 *
 * Zeigt eine Liste von Nutzerbewertungen an, bestehend aus Standortname, Bewertung und Kommentar.
 * Eingebunden im rechten Bereich der `ProfilePage`.
 *
 * Backend-Schnittstelle für Bewertungen ist noch nicht implementiert (TODO).
 * Aktuell werden die `reviews` als Props übergeben und direkt angezeigt.
 */

// TODO: Ratings anzeigen lassen (am besten erst wenn alle normalen Locations schon implementiert sind)
/**
 * Backend hierfür steht noch nicht.
 * HTTP-Request an /profile/favorites in @file: backend/src/routes/profile.routes.ts
 * und @file: backend/src/controllers/profile.controller.ts bzw.
 * @file: backend/src/services/profile.service.ts, un die Logik zu implementieren.
 */

interface Review {
  location: string;
  rating: number;
  comment: string;
}

interface Props {
  reviews: Review[];
}

const Review: React.FC<Props> = ({ reviews }) => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="mb-8 mt-8 text-2xl font-bold">Bewertungen</h2>
      <ul className="space-y-2 text-gray-700">
        {reviews.length > 0 ? (
          reviews.map((rev, idx) => (
            <li key={idx}>
              <p>
                <strong>{rev.location}</strong>: {rev.rating}/5 ★
              </p>
              <p className="text-gray-600 italic">{rev.comment}</p>
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">Keine Bewertungen vorhanden.</li>
        )}
      </ul>
    </section>
  );
};

export default Review;

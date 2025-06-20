import React from "react";
import { Review } from "../../../types/Review";

/**
 * Komponente zur Anzeige von Nutzerbewertungen für eine Location.
 *
 * Kontext:
 * Wird typischerweise in der Detailansicht einer Location angezeigt,
 * um Feedback und Kommentare von Nutzern sichtbar zu machen.
 *
 * Funktion:
 * - Zeigt eine Liste von statischen Beispielbewertungen (Mock-Daten).
 * - Jede Bewertung enthält Autor, Datum und Text.
 * - Falls keine Bewertungen vorhanden sind, wird eine entsprechende Meldung angezeigt.
 *
 */

type Props = {
  reviews: Review[];
};

const Reviews: React.FC<Props> = ({ reviews }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Bewertungen</h2>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 border-b pb-2">
            <p className="text-sm text-gray-500">
              {new Date(review.erstellt_am).toLocaleDateString("de-DE")} – Nutzer-ID: {review.benutzer_id}
            </p>
            <p>⭐ {review.sterne}</p>
            <p>{review.kommentar}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Noch keine Bewertungen vorhanden.</p>
      )}
    </div>
  );
};

export default Reviews;

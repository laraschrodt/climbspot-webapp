import React from "react";
import { Review } from "../../../types/Review";

type Props = {
  reviews: Review[];
};

/**
 * Die Reviews-Komponente zeigt eine Liste von Bewertungen für einen bestimmten Ort an.
 * Jede Bewertung enthält Sterne, ein Erstellungsdatum und einen Kommentar.
 * Falls keine Bewertungen vorhanden sind, wird ein entsprechender Hinweis angezeigt.
 *
 * Props:
 * - reviews: Ein Array von Review-Objekten, die angezeigt werden sollen.
 */
const Reviews: React.FC<Props> = ({ reviews }) => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl my-4">
      <h2 className="text-xl font-semibold mb-4">Bewertungen</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">Noch keine Bewertungen vorhanden.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((rev) => (
            <li
              key={rev.id}
              className="flex items-start space-x-4 border-b pb-2"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
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

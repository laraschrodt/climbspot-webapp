import React, { useEffect, useState } from "react";
import ProfileApi from "../../../../api/ProfileApi";


// TODO: Ratings anzeigen lassen (am besten erst wenn alle normalen Locations schon implementiert sind)
/**
 * Backend hierfür steht noch nicht.
 * HTTP-Request an /profile/favorites in @file: backend/src/routes/profile.routes.ts
 * und @file: backend/src/controllers/profile.controller.ts bzw.
 * @file: backend/src/services/profile.service.ts, un die Logik zu implementieren.
 */

interface Review {
  sterne: number;
  kommentar: string;
  erstellt_am: string;
  orte: {
    name: string;
    picture_url: string;
  };
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    ProfileApi.getUserReviews()
      .then((data) => {
        console.log("Bewertungen:", data);
        setReviews(data);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Bewertungen:", err);
      });
  }, []);

  if (reviews.length === 0) {
    return <p className="text-gray-500 italic">Keine Bewertungen vorhanden.</p>;
  }

  return (
    <section className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Bewertungen</h2>
      <ul className="space-y-4">
        {reviews.map((rev, idx) => (
          <li key={idx} className="flex items-start space-x-4 border-b pb-4">
            <img
              src={rev.orte.picture_url}
              alt="Ort"
              className="w-16 h-16 object-cover rounded-full border"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-md font-bold">{rev.orte.name}</h3>
                <div className="flex">
                  {Array(rev.sterne)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                </div>
                <span className="text-sm text-gray-400 ml-2">
                  erstellt am {new Date(rev.erstellt_am).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 mt-1">{rev.kommentar}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Reviews;








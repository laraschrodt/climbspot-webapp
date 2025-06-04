import React, { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  sterne: number;
  kommentar: string;
  erstellt_am: string;
  orte: {
    name: string;
    picture_url: string;
  };
  benutzer: {
    benutzername: string;
    profilbild_url: string;
  };
}


const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/profile/all-reviews", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(response.data);
      } catch (err) {
        console.error("Fehler beim Laden der Bewertungen:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <p>Lade Bewertungen…</p>;
  }

  if (reviews.length === 0) {
    return <p className="italic text-gray-500">Keine Bewertungen vorhanden.</p>;
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
                <h3 className="text-md font-bold">{rev.benutzer.benutzername}</h3>
                <div className="flex">
                  {Array(rev.sterne)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                </div>
                <span className="text-sm text-gray-400 ml-2">
                  erstellt am {new Date(rev.erstellt_am).toLocaleDateString("de-DE")}
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



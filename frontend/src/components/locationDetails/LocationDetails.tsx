import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Reviews from "./LeftSide/Reviews";
import LocationInfo from "./RightSide/LocationInfo";
import { Location } from "../../models/Location";
import { useUserSession } from "../../auth/UseUserSession";
import ProtectedComponent from "../../routes/ProtectedComponent";
import DeleteLocationButton from "./LeftSide/DeleteLocationButton";

<<<<<<< HEAD

/**
 * Detailseite für eine einzelne Kletterlocation.
 *
 * Kontext:
 * Wird aufgerufen über `/details/:locationId` und zeigt umfassende Informationen
 * zu einem spezifischen Ort an – inklusive Bildbanner, Beschreibung, Zugang, Bewertungen und Aktionen.
 *
 * Funktion:
 * - Holt alle relevanten Daten zur Location über `/api/locations/details/:locationId`.
 * - Zeigt ein großes Header-Bild mit Titel.
 * - Zwei-Spalten-Layout:
 *   - Links: Reviews, Favoriten-Button, ÖPNV-Link, Bearbeiten/Löschen (wenn Eigentümer).
 *   - Rechts: Detaillierte Infos über die Location (`LocationInfo`).
 * - Ermöglicht Favorisieren der Location (POST/DELETE `/api/locations/favorite/:locationId`).
 *
 * Besondere Hinweise:
 * - Nutzt `ProtectedComponent`, um Bearbeiten/Löschen nur für den Eigentümer anzuzeigen.
 * - Aktuell sind Bewertungen nur als Platzhalter (Mock).
 * - Sollte langfristig in kleinere Teilkomponenten ausgelagert werden.
 */

=======
type Review = {
  id: string;
  benutzer_id: string;
  ort_id: string;
  sterne: number;
  kommentar: string;
  erstellt_am: string;
};

>>>>>>> 3c90f8b (Bewertungen implementiert)
const LocationDetails: React.FC = () => {
  const { user } = useUserSession();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(0);
  const { locationId } = useParams<{ locationId: string }>();
<<<<<<< HEAD
  const [isOwner, setIsOwner] = useState<boolean>(false);
=======
  console.log("Frontend: locationId =", locationId);
>>>>>>> 3c90f8b (Bewertungen implementiert)

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
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
=======
        const res = await fetch(`/api/locations/details/${locationId}`);
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Standort nicht gefunden");
        }
        const data = await res.json();
        setLocation(data);
        setAllReviews(data.bewertungen || []);
      } catch (err) {
        console.error("Fehler beim Laden des Standorts:", err);
        setLocation(null);
>>>>>>> 3c90f8b (Bewertungen implementiert)
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    if (locationId) fetchData();
  }, [locationId, user]);
=======
    if (locationId) {
      fetchData();
    }
  }, [locationId]);
>>>>>>> 3c90f8b (Bewertungen implementiert)

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

  const handleReviewSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log("Token vor POST:", token); // Debug


    if (!token) {
      alert("Bitte einloggen, um eine Bewertung abzugeben.");
      return;
    }

    try {
      console.log("Sende Bewertung:", {
        sterne: reviewStars,
        kommentar: reviewText,
      });

      const res = await fetch(`/api/locations/reviews/${locationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ sterne: reviewStars, kommentar: reviewText }),
      });

      if (res.ok) {
        const updated = await res.json();
        setUserReview(updated);
        setReviewText(updated.kommentar);
        setReviewStars(updated.sterne);
        
        const updatedLocation = await fetch(`/api/locations/details/${locationId}`).then((r) => r.json());
        setAllReviews(updatedLocation.bewertungen || []);

      } else {
        const msg = await res.text();
        console.error("Bewertung nicht gespeichert:", msg);
      }
    } catch (err) {
      console.error("Fehler beim Speichern der Bewertung:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    // FIXME: Aufteilen in Components weil das zu unübersichtlich ist
    <div>
      {/* Banner mit Bild und Text */}
      <div
        className="w-full h-128 bg-cover bg-center text-white text-center flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${location?.picture_url})` }}
      >
        <h1 className="text-4xl font-bold">{location?.name}</h1>
        <p className="text-lg max-w-xl px-4">
          Erfahre mehr über diesen Kletterspot – Bewertungen, Beschreibung und
          Besonderheiten.
        </p>
      </div>

      {/* Zwei-Spalten-Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4 py-8">
        {/* Linke Spalte */}
        <div className="w-full md:w-1/3 space-y-6">
<<<<<<< HEAD
          {isOwner && (
            <ProtectedComponent roles={["user"]}>
              <div className="flex gap-4">
                <Link
                  to={`/edit-location/${locationId}`}
                  className="btn btn-secondary"
                >
                  Bearbeiten
                </Link>

                <DeleteLocationButton locationId={locationId!} />
              </div>
            </ProtectedComponent>
          )}

          <div>
            {/* Reviews */}
            <Reviews />
          </div>
          <div className="space-y-4">
            {/* Sterne-Bewertung */}
            {/* <StarRating rating={rating} onClick={handleStarClick} /> */}
            {/* Favoriten-Button */}
            <button
              onClick={handleFavoriteToggle}
              className="w-full btn btn-primary"
            >
              {isFavorited
                ? "Vom Favoriten entfernen"
                : "Zu Favoriten hinzufügen"}
=======
          {/* Bewertungen */}
          <div className="bg-white border rounded shadow p-4 max-h-64 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Bewertungen</h2>
            {allReviews.length > 0 ? (
              allReviews.map((review) => (
                <div key={review.id} className="border-b py-2">
                  <div>
                    {[...Array(review.sterne)].map((_, i) => (
                      <span key={i} style={{ color: "gold" }}>★</span>
                    ))}
                  </div>
                  <p className="text-sm italic">{review.kommentar}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Noch keine Bewertungen.</p>
            )}
          </div>

          {/* Eigene Bewertung */}
          <div className="bg-white border rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Deine Bewertung</h3>
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setReviewStars(star)}
                  style={{ cursor: "pointer", color: star <= reviewStars ? "gold" : "gray", fontSize: "20px" }}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Was möchtest du sagen?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleReviewSubmit}
            >
              {userReview ? "Bewertung aktualisieren" : "Bewertung abgeben"}
            </button>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button onClick={handleFavoriteToggle} className="w-full btn btn-primary">
              {isFavorited ? 'Vom Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
>>>>>>> 3c90f8b (Bewertungen implementiert)
            </button>
            {location?.lat && location?.long && (
              <button
                className="btn btn-secondary w-full"
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.long}&travelmode=transit`;
                  window.open(url, "_blank");
                }}
              >
                ÖPNV - Route zu Google Maps
              </button>
            )}
          </div>
        </div>

        {/* Rechte Spalte */}
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
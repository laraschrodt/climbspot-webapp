import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Location } from "../../types/Location";
import { useUserSession } from "../../auth/UseUserSession";
import { Banner } from "./Banner";
import { LeftSidebar } from "./LeftSide/LeftSide";
import { RightSidebar } from "./RightSide/RightSide";
import { Review } from "../../types/Review";

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

const LocationDetails: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(0);
  const { locationId } = useParams<{ locationId: string }>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { user } = useUserSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setAllReviews(data.bewertungen || []);
        setIsOwner(data.isOwner ?? false);
      } finally {
        setLoading(false);
      }
    };

    if (locationId) fetchData();
  }, [locationId, user]);

  const handleReviewSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bitte einloggen, um eine Bewertung abzugeben.");
      return;
    }

    try {
      const res = await fetch(`/api/locations/reviews/${locationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sterne: reviewStars, kommentar: reviewText }),
      });

      if (res.ok) {
        const updated = await res.json();
        setUserReview(updated);
        setReviewText(updated.kommentar);
        setReviewStars(updated.sterne);

        const updatedLocation = await fetch(
          `/api/locations/details/${locationId}`
        ).then((r) => r.json());
        setAllReviews(updatedLocation.bewertungen || []);
      } else {
        const msg = await res.text();
        console.error("Bewertung nicht gespeichert:", msg);
      }
    } catch (err) {
      console.error("Fehler beim Speichern der Bewertung:", err);
    }
  };

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Banner
        title={location?.name || ""}
        imageUrl={location?.picture_url || ""}
        subtitle="Erfahre mehr über diesen Kletterspot – Bewertungen, Beschreibung und Besonderheiten."
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4 py-8">
        <LeftSidebar
          locationId={locationId!}
          isOwner={isOwner}
          isFavorited={isFavorited}
          onToggleFavorite={handleFavoriteToggle}
          allReviews={allReviews}
          reviewText={reviewText}
          reviewStars={reviewStars}
          setReviewText={setReviewText}
          setReviewStars={setReviewStars}
          onSubmitReview={handleReviewSubmit}
          location={location}
        />
        <RightSidebar location={location!} />
      </div>
    </div>
  );
};

export default LocationDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Location } from "../../types/Location";
import { useUserSession } from "../../auth/UseUserSession";
import { Banner } from "./Banner";
import { LeftSidebar } from "./LeftSide/LeftSide";
import { RightSidebar } from "./RightSide/RightSide";
import { Review } from "../../types/Review";
import axiosInstance from "../../api/axiosInstance";

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
        const res = await axiosInstance.get(`/api/locations/details/${locationId}`, {
          headers: user ? { "x-user-id": user.userId } : {},
        });

        const data = res.data;
        setLocation(data);
        setAllReviews(data.bewertungen || []);
        setIsOwner(data.isOwner ?? false);
        setIsFavorited(data.isFavorited ?? false);
      } catch (error) {
        console.error("Standort nicht gefunden", error);
      } finally {
        setLoading(false);
      }
    };

    if (locationId) fetchData();
  }, [locationId, user]);

  const handleReviewSubmit = async () => {
    if (!locationId) return;

    try {
      const res = await axiosInstance.post(
        `/api/locations/reviews/${locationId}`,
        {
          sterne: reviewStars,
          kommentar: reviewText,
        }
      );

      const updated = res.data;
      setUserReview(updated);
      setReviewText(updated.kommentar);
      setReviewStars(updated.sterne);

      const updatedLocation = await axiosInstance.get(`/api/locations/details/${locationId}`);
      setAllReviews(updatedLocation.data.bewertungen || []);
    } catch (err: any) {
      console.error("Fehler beim Speichern der Bewertung:", err.response?.data || err.message);
    }
  };

    const handleFavoriteToggle = async () => {
    if (!locationId) {
      console.warn("Location-ID fehlt");
      return;
    }

    try {
      const res = await axiosInstance({
        method: isFavorited ? "DELETE" : "POST",
        url: `/api/locations/favorite/${locationId}`,
      });

      if (res.status === 200) {
        setIsFavorited(!isFavorited);
      } else {
        console.error("Unerwarteter Status:", res.status);
      }
    } catch (error: any) {
      console.error("Fehler beim Aktualisieren des Favoritenstatus:", error.response?.data || error.message);
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

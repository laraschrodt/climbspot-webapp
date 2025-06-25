import React, { useEffect } from "react";
import { ReviewForm } from "./ReviewForm";
import Reviews from "./Reviews";
import { FavoriteButton } from "./FavoriteButton";
import { TransitButton } from "./TransitButton";
import { Location } from "../../../types/Location";
import { Review } from "../../../types/Review";
import { OwnerActions } from "./OwnerActions";
import ProtectedComponent from "../../../routes/ProtectedComponent";

/**
 * Linke Spalte der Detailansicht einer Location.
 *
 * Kontext:
 * Wird in `LocationDetails.tsx` verwendet, um Bewertungen und Interaktionen darzustellen.
 *
 * Funktion:
 * - Zeigt vorhandene Bewertungen (ReviewsList).
 * - Bietet ein Formular für neue Bewertungen (ReviewForm).
 * - Stellt Buttons für Favoriten und ÖPNV zur Verfügung.
 * - Zeigt Owner-spezifische Aktionen, wenn zutreffend.
 *
 * Props:
 * - Enthält alle Bewertungs-, Favoriten- und Nutzer-spezifischen Zustände.
 */
interface LeftSideProps {
  locationId: string;
  isOwner: boolean;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  location: Location | null;
  allReviews: Review[];
  reviewText: string;
  reviewStars: number;
  setReviewText: (text: string) => void;
  setReviewStars: (stars: number) => void;
  onSubmitReview: () => void;
}

export const LeftSidebar: React.FC<LeftSideProps> = ({
  locationId,
  isOwner,
  isFavorited,
  onToggleFavorite,
  location,
  allReviews,
  reviewText,
  reviewStars,
  setReviewText,
  setReviewStars,
  onSubmitReview,
}) => {
  useEffect(() => {
    const fetchMyReview = async () => {
      /*--- User-ID aus LocalStorage ziehen (verschiedene mögliche Keys) ---*/
      const storedUser = localStorage.getItem("user");
      const storedUserId = localStorage.getItem("userId");
      let userId: string | null = storedUserId;

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          userId = parsed?.userId || parsed?.id || userId;
        } catch {}
      }

      const headers: Record<string, string> = {};
      if (userId) headers["x-user-id"] = userId;

      try {
        const res = await fetch(`/api/locations/reviews/${locationId}`, {
          headers,
        });
        if (!res.ok) return;

        const review = await res.json();
        if (review) {
          setReviewStars(review.sterne);
          setReviewText(review.kommentar);
        } else {
          setReviewStars(0);
          setReviewText("");
        }
      } catch (err) {
        console.error("Fehler beim Laden der eigenen Bewertung:", err);
      }
    };

    fetchMyReview();
  }, [locationId, setReviewStars, setReviewText]);

  return (
    <div className="w-full md:w-1/3 space-y-6">
      {isOwner && <OwnerActions locationId={locationId} />}

      <ProtectedComponent roles={["user", "admin"]}>
        <ReviewForm
          stars={reviewStars}
          text={reviewText}
          setStars={setReviewStars}
          setText={setReviewText}
          onSubmit={onSubmitReview}
        />
      </ProtectedComponent>

      <Reviews reviews={allReviews} />

      <ProtectedComponent roles={["user", "admin"]}>
        <FavoriteButton isFavorited={isFavorited} onToggle={onToggleFavorite} />
      </ProtectedComponent>

      {location?.lat && location?.long && (
        <TransitButton lat={location.lat} long={location.long} />
      )}
    </div>
  );
};

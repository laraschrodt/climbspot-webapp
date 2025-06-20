import React from "react";
import { ReviewForm } from "./ReviewForm";
import Reviews from "./Reviews";
import { FavoriteButton } from "./FavoriteButton";
import { TransitButton } from "./TransitButton";
import { Location } from "../../../types/Location";
import { Review } from "../../../types/Review";
import { OwnerActions } from "./OwnerActions";

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
  return (
    <div className="w-full md:w-1/3 space-y-6">
      {isOwner && <OwnerActions locationId={locationId} />}

      <Reviews reviews={allReviews} />

      <ReviewForm
        stars={reviewStars}
        text={reviewText}
        setStars={setReviewStars}
        setText={setReviewText}
        onSubmit={onSubmitReview}
      />

      <FavoriteButton
        isFavorited={isFavorited}
        onToggle={onToggleFavorite}
      />

      {location?.lat && location?.long && (
        <TransitButton lat={location.lat} long={location.long} />
      )}
    </div>
  );
};

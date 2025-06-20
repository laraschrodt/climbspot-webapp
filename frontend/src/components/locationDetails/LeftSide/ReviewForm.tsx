import React from "react";

interface ReviewFormProps {
  stars: number;
  text: string;
  setStars: (s: number) => void;
  setText: (t: string) => void;
  onSubmit: () => void;
}

/**
 * Formular zur Erstellung oder Bearbeitung einer Nutzerbewertung.
 *
 * Kontext:
 * Wird in `LeftSide.tsx` verwendet.
 *
 * Funktion:
 * - Erlaubt Nutzern, eine Bewertung mit Sternen und Kommentar abzugeben.
 * - Aufruf von `onSubmit`, um die Bewertung abzusenden.
 *
 * Props:
 * - Sterne-Wert und Kommentar-Text (sowie zugehörige Set-Funktionen).
 * - `onSubmit`: Callback zur Verarbeitung.
 */

export const ReviewForm: React.FC<ReviewFormProps> = ({
  stars,
  text,
  setStars,
  setText,
  onSubmit,
}) => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="font-semibold mb-2">Deine Bewertung</h3>
      <div className="flex gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer text-2xl ${
              stars >= star ? "text-yellow-400" : "text-gray-400"
            }`}
            onClick={() => setStars(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className="w-full border rounded p-2 mb-2"
        placeholder="Dein Kommentar"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={onSubmit}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Absenden
      </button>
    </div>
  );
};

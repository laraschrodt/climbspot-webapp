import React from "react";

const Reviews: React.FC = () => {
  const mockReviews = [
    {
      id: 1,
      author: "KletterMax",
      date: "2024-08-12",
      content: "Toller Spot! Super griffiger Fels und schöne Aussicht.",
    },
    {
      id: 2,
      author: "BoulderQueen",
      date: "2024-06-30",
      content: "Etwas voll am Wochenende, aber sehr abwechslungsreiche Routen!",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Bewertungen</h2>
      {mockReviews.map((review) => (
        <div key={review.id} className="mb-4 border-b pb-2">
          <p className="text-sm text-gray-500">
            {review.date} – {review.author}
          </p>
          <p>{review.content}</p>
        </div>
      ))}
      {mockReviews.length === 0 && (
        <p className="text-gray-600">Noch keine Bewertungen vorhanden.</p>
      )}
    </div>
  );
};

export default Reviews;

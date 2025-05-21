import React from "react";

// TODO: Favoriten anzeigen lassen (am besten erst wenn alle normalen Locations schon implementiert sind)
/**
 * Backend hierfür steht noch nicht.
 * HTTP-Request an /profil/favorites in @file: backend/src/routes/profil.routes.ts
 * und @file: backend/src/controllers/profil.controller.ts bzw.
 * @file: backend/src/services/profil.service.ts, un die Logik zu implementieren.
 */

interface Props {
  favorites: string[];
}

const Favorites: React.FC<Props> = ({ favorites }) => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Favoriten</h2>
      <ul className="list-disc list-inside text-gray-700">
        {favorites.length > 0 ? (
          favorites.map((fav, idx) => <li key={idx}>{fav}</li>)
        ) : (
          <li className="text-gray-500 italic">Keine Favoriten vorhanden.</li>
        )}
      </ul>
    </section>
  );
};

export default Favorites;

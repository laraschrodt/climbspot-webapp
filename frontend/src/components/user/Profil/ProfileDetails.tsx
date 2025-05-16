import React from "react";
import { Edit2, Eye, EyeOff } from 'react-feather';

// ---------- Props-Definition für die Komponente ----------
interface Props {
  user: {
    favorites: string[];
    reviews: { location: string; rating: number; comment: string }[];
  };
  formData: {
    email: string;
    password: string;
    location: string;
    username: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      location: string;
      username: string;
    }>
  >;
}

// ---------- Hauptkomponente für Profildetails ----------
const ProfilDetails: React.FC<Props> = ({ user, formData, setFormData }) => {
  const [editMode, setEditMode] = React.useState(false); // Umschalten zwischen Ansicht und Bearbeitung
  const [showPassword, setShowPassword] = React.useState(false); // Passwort anzeigen/verstecken

  // Eingaben im Formular aktualisieren
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Speichern beendet den Bearbeitungsmodus
  const saveChanges = () => {
    setEditMode(false);
  };

  return (
    <div className="md:col-span-2 space-y-8">
      {/* ----- Bereich: Favoriten ----- */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Favoriten</h2>
        <ul className="list-disc list-inside text-gray-700">
          {user.favorites.map((fav, idx) => (
            <li key={idx}>{fav}</li>
          ))}
        </ul>
      </section>

      {/* ----- Bereich: Bewertungen ----- */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Bewertungen</h2>
        <ul className="space-y-2 text-gray-700">
          {user.reviews.map((rev, idx) => (
            <li key={idx}>
              <p><strong>{rev.location}</strong>: {rev.rating}/5 ★</p>
              <p className="text-gray-600 italic">{rev.comment}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ----- Bereich: Aktivitätsverlauf (statisch) ----- */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Aktivitätsverlauf</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Zuletzt angesehen:</strong> Kletterhalle Nordwand</p>
          <p><strong>Letzte Bewertung:</strong> Boulder Base – „Super Atmosphäre!“</p>
          <p><strong>Zuletzt gespeichert:</strong> High Moves</p>
        </div>
      </section>

      {/* ----- Bereich: Profil bearbeiten ----- */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Profil bearbeiten</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-blue-600 flex items-center gap-1 text-sm"
          >
            <Edit2 size={14} /> {editMode ? "Abbrechen" : "Bearbeiten"}
          </button>
        </div>

        {/* ---- Bearbeitungsformular ---- */}
        {editMode ? (
          <div className="space-y-4">
            {/* Eingabe: E-Mail */}
            <div>
              <label className="block text-sm font-medium">E-Mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            {/* Eingabe: Passwort */}
            <div>
              <label className="block text-sm font-medium">Neues Passwort</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            {/* Eingabe: Standort */}
            <div>
              <label className="block text-sm font-medium">Standort</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            {/* Speichern-Button */}
            <button
              onClick={saveChanges}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Speichern
            </button>
          </div>
        ) : (
          // ---- Anzeige-Modus (keine Bearbeitung) ----
          <div className="space-y-2 text-gray-700">
            <p><strong>E-Mail:</strong> {formData.email}</p>
            <p className="flex items-center gap-2">
              <strong>Passwort:</strong> {showPassword ? formData.password : "********"}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </p>
            <p><strong>Standort:</strong> {formData.location}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilDetails;

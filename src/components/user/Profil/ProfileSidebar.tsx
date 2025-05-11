// ProfileSidebar.tsx
import React from "react";
import { Bell, Camera, Eye, EyeOff } from "react-feather";

// ---------- Props für die Sidebar-Komponente ----------
interface Props {
  profileImage: string; // Pfad oder URL zum Profilbild
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Funktion zum Ändern des Profilbildes
  notifications: { id: number; message: string; date: string }[]; // Liste der Benachrichtigungen
  togglePopup: () => void; // Funktion zum Öffnen/Schließen des Popups
  formData: {
    email: string;
    password: string;
    location: string;
    username: string;
  };
  showPassword: boolean; // Sichtbarkeit des Passworts
  setShowPassword: (val: boolean) => void; // Umschalten der Passwortanzeige
}

// ---------- Sidebar-Komponente ----------
const ProfilSidebar: React.FC<Props> = ({
  profileImage,
  handleImageChange,
  notifications,
  togglePopup,
  formData,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="flex flex-col items-center md:items-start gap-6">
      
      {/* ---------- Profilbild-Abschnitt ---------- */}
      <div className="relative w-32 h-32">
        <img
          src={profileImage}
          alt="Profilbild"
          className="w-32 h-32 rounded-full border-2 border-black object-cover"
        />
        {/* Kamera-Icon mit Datei-Upload-Funktion */}
        <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full border cursor-pointer">
          <Camera size={16} />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {/* ---------- Benachrichtigungen ---------- */}
      <div
        className="flex items-center gap-2 cursor-pointer text-sm text-gray-800 hover:text-black"
        onClick={togglePopup}
      >
        <div className="relative">
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </div>
        <span>Benachrichtigungen</span>
      </div>

      {/* ---------- Persönliche Informationen ---------- */}
      <section className="bg-white p-6 rounded-xl shadow w-full">
        <h2 className="text-xl font-semibold mb-4">Persönliche Informationen</h2>

        {/* E-Mail */}
        <p>
          <strong>E-Mail:</strong> {formData.email}
        </p>

        {/* Benutzername */}
        <p>
          <strong>Benutzername:</strong> {formData.username}
        </p>

        {/* Passwort mit Sichtbarkeitsumschaltung */}
        <p className="flex items-center gap-2">
          <strong>Passwort:</strong>{" "}
          {showPassword ? formData.password : "********"}
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-black"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </p>

        {/* Standort */}
        <p>
          <strong>Standort:</strong> {formData.location}
        </p>
      </section>
    </div>
  );
};

export default ProfilSidebar;

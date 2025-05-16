import React, { useState } from "react";
import ProfilSidebar from "./ProfileSidebar";
import ProfilDetails from "./ProfileDetails";
import ProfilNotification from "./ProfilNotification";
import backgroundImage from "../../../assets/images/profilBackground.jpg";

const Profil: React.FC = () => {
  // Beispielhafte Benachrichtigungen für das Profil
  const [notifications] = useState([
    { id: 1, message: "Wetterwarnung für 'High Moves': Starker Sturm am Samstag.", date: "10.05.2025" },
    { id: 2, message: "Neue Routen in 'Boulder Base' hinzugefügt!", date: "08.05.2025" },
    { id: 3, message: "test", date: "25.04.25" },
  ]);

  // Zustände für Popup, Bildanzeige und Passwortanzeige
  const [showPopup, setShowPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState("src/assets/images/profilbildPlaceholder.png");

  // Öffnet oder schließt das Benachrichtigungs-Popup
  const togglePopup = () => setShowPopup(!showPopup);

  // Aktualisiert das Profilbild lokal
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Beispielhafter Benutzer (könnte später durch echte Daten ersetzt werden)
  const user = {
    name: "Max Mustermann",
    email: "max.mustermann@example.com",
    username: "max123",
    password: "max12345",
    location: "Berlin, Deutschland",
    favorites: ["Kletterhalle Südwand", "Boulder Base", "High Moves"],
    reviews: [
      { location: "Kletterhalle Südwand", rating: 4, comment: "Sehr freundlich und sauber." },
      { location: "High Moves", rating: 5, comment: "Tolle Routenvielfalt und gutes Licht!" },
    ]
  };

  // Formulardaten für das Bearbeiten des Profils
  const [formData, setFormData] = useState({
    email: user.email,
    password: user.password,
    location: user.location,
    username: user.username,
  });

  return (
    <div>
      {/* Begrüßungsbereich mit Hintergrundbild */}
      <section
        className="h-96 md:h-[32rem]bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Willkommen {user.name} 👋</h1>
          <p className="text-lg max-w-xl mx-auto">
            Verwalte hier deine persönlichen Informationen, Favoriten und Bewertungen rund ums Klettern.
          </p>
        </div>
      </section>

      {/* Hauptinhalt mit Sidebar (links) und Details (rechts) */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Linke Spalte: Profilinformationen + Bild */}
          <ProfilSidebar
            profileImage={profileImage}
            handleImageChange={handleImageChange}
            notifications={notifications}
            togglePopup={togglePopup}
            formData={formData}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          {/* Rechte Spalte: editierbare Details */}
          <ProfilDetails
            user={user}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </main>

      {/* Popup-Fenster für Benachrichtigungen */}
      {showPopup && (
        <ProfilNotification
          notifications={notifications}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={togglePopup}
        />
      )}
    </div>
  );
};

export default Profil;

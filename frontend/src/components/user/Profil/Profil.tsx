import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilSidebar from "./Sidebar/ProfileSidebar";
//import ProfilDetails from "./ProfileDetails";
// import ProfilNotification from "./ProfilNotification";
import backgroundImage from "../../../assets/images/profilBackground.jpg";

const Profil: React.FC = () => {
  // TODO: Profilbenachrichtigungen implementieren

  // const [showPopup, setShowPopup] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);

  /*
  // Zustand für Profilbild
  const [profileImage, setProfileImage] = useState("src/assets/images/profilbildPlaceholder.png");

  // Benachrichtigungen
  const [notifications, setNotifications] = useState([]);

  // Bildänderung lokal
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };
  */

  // Formulardaten für das Bearbeiten des Profils
  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    email: "",
    password: "",
    location: "",
    username: "",
    profilbild_url: "",
  });

  // Lade Profildaten vom Backend
  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/profil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          vorname: res.data.vorname,
          nachname: res.data.nachname,
          email: res.data.email,
          password: res.data.password,
          location: res.data.location,
          username: res.data.username,
          profilbild_url: res.data.profilbild_url,
        });
      } catch (err) {
        console.error("Fehler beim Laden des Profils:", err);
      }
    };

    fetchProfil();
  }, []);

  // const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div>
      {/* Begrüßungsbereich */}
      <section
        className="h-64 md:h-[32rem] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Willkommen {formData.vorname} {formData.nachname} 👋
          </h1>
          <p className="text-lg max-w-xl mx-auto">
            Verwalte hier deine persönlichen Informationen, Favoriten und Bewertungen rund ums Klettern.
          </p>
        </div>
      </section>

      {/* Hauptinhalt */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <ProfilSidebar
            // profileImage={profileImage}
            // handleImageChange={handleImageChange}
            // notifications={notifications}
            // togglePopup={togglePopup}
            formData={formData}
            setFormData={setFormData}
          />

          {/* <ProfilDetails

          /> */}
        </div>
      </main>

      {/* {showPopup && (
        <ProfilNotification
          // notifications={notifications}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={togglePopup}
        />
      )} */}
    </div>
  );
};

export default Profil;

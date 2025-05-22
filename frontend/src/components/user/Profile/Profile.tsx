import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileSidebar from "./LeftSide/ProfileSidebar";
import ProfileDetails from "./RightSide/ProfileDetails";
import backgroundImage from "../../../assets/images/profilBackground.jpg";

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    email: "",
    password: "",
    location: "",
    username: "",
    profilbild_url: "",
  });

  const [userData, setUserData] = useState({
    favorites: [] as string[],
    reviews: [] as { location: string; rating: number; comment: string }[],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/profile", {
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

        setUserData({
          favorites: res.data.favorites || [],
          reviews: res.data.reviews || [],
        });
      } catch (err) {
        console.error("Fehler beim Laden des Profils:", err);
      }
    };

    fetchProfile();
  }, []);

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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <ProfileSidebar
            formData={formData}
            setFormData={setFormData}
          />
          <div className="md:col-span-2">
            <ProfileDetails
              favorites={userData.favorites}
              reviews={userData.reviews}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

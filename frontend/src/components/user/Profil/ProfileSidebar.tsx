import React, { useState } from "react";
import { Edit2 } from "react-feather";
import axios from "axios";

interface Props {
  formData: {
    nachname: string;
    vorname: string;
    email: string;
    password: string;
    location: string;
    username: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      nachname: string;
      vorname: string;
      email: string;
      password: string;
      location: string;
      username: string;
    }>
  >;
}

const ProfilSidebar: React.FC<Props> = ({ formData, setFormData }) => {
  const [editMode, setEditMode] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "/api/profil",
        {
          vorname: formData.vorname,
          nachname: formData.nachname,
          email: formData.email,
          username: formData.username,
          location: formData.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profil erfolgreich gespeichert");
      setEditMode(false);
    } catch (error) {
      console.error("Fehler beim Speichern des Profils:", error);
      alert("Fehler beim Speichern des Profils");
    }
  };

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("Bitte altes und neues Passwort eingeben.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "/api/user/password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Passwort erfolgreich geändert");
      setOldPassword("");
      setNewPassword("");
    } catch {
      console.error("Fehler beim Passwort-Ändern:"
      );
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  return (
    <div className="flex flex-col items-center md:items-start gap-6">
      <section className="bg-white p-6 rounded-xl shadow w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Persönliche Informationen</h2>
          <button
            onClick={editMode ? () => setEditMode(false) : enterEditMode}
            className="text-blue-600 flex items-center gap-1 text-sm"
          >
            <Edit2 size={14} />
            {editMode ? "Abbrechen" : "Bearbeiten"}
          </button>
        </div>

        {editMode ? (

          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <label className="block font-medium">Vorname</label>
              <input
                type="text"
                name="vorname"
                value={formData.vorname}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Nachname</label>
              <input
                type="text"
                name="nachname"
                value={formData.nachname}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">E-Mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Benutzername</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Standort</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            <button
              onClick={saveChanges}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Speichern
            </button>
          </div>
        ) : (
          <div className="space-y-2 text-gray-700">
            <p><strong>Vorname:</strong> {formData.vorname}</p>
            <p><strong>Nachname:</strong> {formData.nachname}</p>
            <p><strong>E-Mail:</strong> {formData.email}</p>
            <p><strong>Benutzername:</strong> {formData.username}</p>
            <p><strong>Standort:</strong> {formData.location}</p>
          </div>
        )}
      </section>

      {/* ---------- Passwort ändern ---------- */}
      <section className="bg-white p-6 rounded-xl shadow w-full mt-6">
        <h2 className="text-xl font-semibold mb-4">Passwort ändern</h2>

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <label className="block font-medium">Altes Passwort</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Neues Passwort</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <button
            onClick={changePassword}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Passwort ändern
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfilSidebar;

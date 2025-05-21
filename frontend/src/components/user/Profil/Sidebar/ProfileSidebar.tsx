import React, { useState } from "react";
//import axios from "axios";
import Profilbild from "./ProfilePicture";
import PersönlicheInfos from "./ProfileForm";
import PasswortÄndern from "./ChangePassword";
import { FormDataType } from "./types";
import {
  uploadProfileImage,
  saveProfile,
  updatePassword,
} from "../../../../api/profileApi";
import Notifications from "./Notifications";

interface Props {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const ProfilSidebar: React.FC<Props> = ({ formData, setFormData }) => {
  const [editMode, setEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadProfileImage(file);
      setFormData((prev) => ({ ...prev, profilbild_url: imageUrl }));
    } catch (error) {
      console.error("Fehler beim Hochladen des Bildes:", error);
      alert("Bild konnte nicht hochgeladen werden");
    }
  };

  const saveChanges = async () => {
    try {
      const { vorname, nachname, email, username, location, profilbild_url } = formData;
      await saveProfile({ vorname, nachname, email, username, location, profilbild_url });
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
      await updatePassword(oldPassword, newPassword);
      alert("Passwort erfolgreich geändert");
      setOldPassword("");
      setNewPassword("");
    } catch {
      console.error("Fehler beim Passwort-Ändern:");
    }
  };

  return (
    <div className="flex flex-col items-center md:items-start gap-6">
      <Profilbild imageUrl={formData.profilbild_url} onImageChange={handleImageChange} />
      <Notifications />
      <PersönlicheInfos
        formData={formData}
        editMode={editMode}
        handleChange={handleChange}
        toggleEditMode={() => setEditMode(!editMode)}
        saveChanges={saveChanges}
      />
      <PasswortÄndern
        oldPassword={oldPassword}
        newPassword={newPassword}
        setOldPassword={setOldPassword}
        setNewPassword={setNewPassword}
        changePassword={changePassword}
      />
    </div>
  );
};

export default ProfilSidebar;

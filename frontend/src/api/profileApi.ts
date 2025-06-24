import axiosInstance from "./axiosInstance";
import { FormDataType } from "../components/user/Profile/LeftSide/types";

/**
 * API-Klasse zur Verwaltung des Benutzerprofils.
 *
 * Kontext:
 * Wird innerhalb des Benutzerbereichs verwendet, um Profilinformationen
 * zu laden, zu speichern oder zu ändern (inkl. Passwort und Profilbild).
 *
 * Alle Methoden kommunizieren mit dem geschützten /api/profile-Endpunkt
 * des Backends und nutzen den Authentifizierungs-Token.
 */

class ProfileApi {
    /**
   * Lädt das Profilbild des Nutzers hoch und gibt die Bild-URL zurück.
   * @param file Die Bilddatei, die hochgeladen werden soll.
   * @returns URL des hochgeladenen Profilbilds.
   */
  static async uploadProfileImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
      "/api/profile/upload-profile-pic",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      }
    );

    return response.data.url;
  }

    /**
   * Speichert die Profilinformationen (ohne Passwort).
   * @param data Das Profilformular ohne Passwortfeld.
   */

  static async saveProfile(
    data: Omit<FormDataType, "password">
  ): Promise<void> {
    await axiosInstance.put("/api/profile", data);
  }

  /**
   * Aktualisiert das Passwort des Benutzers.
   * @param oldPassword Das aktuelle Passwort.
   * @param newPassword Das neue Passwort.
   */

  static async updatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    await axiosInstance.put("/api/profile/password", {
      oldPassword,
      newPassword,
    });
  }

  /**
   * Ruft die Profildaten des aktuellen Benutzers ab.
   * @returns Ein Promise mit dem gespeicherten Profil.
   */

  static async fetchUserProfile(): Promise<FormDataType> {
    const response = await axiosInstance.get("/api/profile");
    return response.data;
  }
}

export default ProfileApi;

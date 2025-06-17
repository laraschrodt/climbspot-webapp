import axios from "axios";
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

    const token = localStorage.getItem("token");

    const response = await axios.post(
      "/api/profile/upload-profile-pic",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem("token");

    await axios.put("/api/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = localStorage.getItem("token");

    await axios.put(
      "/api/profile/password",
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Ruft die Profildaten des aktuellen Benutzers ab.
   * @returns Ein Promise mit dem gespeicherten Profil.
   */

  static async fetchUserProfile(): Promise<FormDataType> {
    const token = localStorage.getItem("token");

    const response = await axios.get("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export default ProfileApi;

// src/services/profiles/profile.service.ts

import { supabase } from "../../lib/supabase";
import { randomUUID } from "crypto";
import { Location } from "../../types/Location";

interface Bewertung {
  sterne: number;
}

interface RawFavoriteRow {
  o: Location & { bewertungen?: Bewertung[] };
}

export interface NotificationRow {
  id: string;
  ort_id: string;
  title: string;
  message: string;
  picture_url: string;
  erstellt_am: string;
}

/**
 * Bietet Funktionen zum Laden und Aktualisieren von Nutzerprofilen,
 * Favoriten, Bewertungen sowie ungelesenen Benachrichtigungen.
 */
class ProfileService {
  /**
   * Holt Profildaten eines Nutzers anhand der Nutzer-ID.
   *
   * @param userId ID des Nutzers
   * @returns Promise mit den Profildaten
   * @throws Fehler bei Datenbankfehlern oder falls Profil nicht gefunden wird
   */
  async getProfileDataByUserId(userId: string) {
    const { data, error } = await supabase
      .from("benutzer")
      .select("vorname, nachname, email, benutzername, stadt, passwort_hash, profilbild_url")
      .eq("benutzer_id", userId)
      .single();

    if (error || !data) {
      console.error("Supabase-Fehler:", error);
      throw new Error("Profil nicht gefunden");
    }

    return {
      vorname: data.vorname || "",
      nachname: data.nachname || "",
      email: data.email,
      username: data.benutzername,
      location: data.stadt || "",
      password: data.passwort_hash,
      profilbild_url: data.profilbild_url || "",
    };
  }

  /**
   * Aktualisiert die Profildaten eines Nutzers.
   *
   * @param userId ID des Nutzers
   * @param vorname Neuer Vorname
   * @param nachname Neuer Nachname
   * @param email Neue Email-Adresse
   * @param username Neuer Benutzername
   * @param location Neuer Standort
   * @returns Erfolgsmeldung
   * @throws Fehler bei Datenbankproblemen
   */
  async updateProfileInDatabase(
    userId: string,
    {
      vorname,
      nachname,
      email,
      username,
      location,
    }: {
      vorname: string;
      nachname: string;
      email: string;
      username: string;
      location: string;
    }
  ) {
    const { error } = await supabase
      .from("benutzer")
      .update({
        vorname,
        nachname,
        email,
        benutzername: username,
        stadt: location,
      })
      .eq("benutzer_id", userId);

    if (error) {
      throw new Error("Fehler beim Aktualisieren des Profils: " + error.message);
    }

    return { success: true };
  }

  /**
   * Lädt ein Profilbild in den Supabase-Storage hoch
   * und aktualisiert die URL in der Benutzertabelle.
   *
   * @param userId ID des Nutzers
   * @param file Bilddatei
   * @returns URL des hochgeladenen Profilbilds
   * @throws Fehler bei Upload- oder Datenbankproblemen
   */
  async uploadProfileImageToDatabase(userId: string, file: Express.Multer.File) {
    const fileName = `profile-pictures/${userId}-${randomUUID()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("profile-pictures")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      throw new Error("Bild-Upload fehlgeschlagen: " + uploadError.message);
    }

    const { data: { publicUrl } } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(fileName);

    await supabase
      .from("benutzer")
      .update({ profilbild_url: publicUrl })
      .eq("benutzer_id", userId);

    return publicUrl;
  }

  /**
   * Holt alle Favoriten eines Nutzers.
   *
   * @param userId ID des Nutzers
   * @returns Promise mit Array der Favoritenorte
   * @throws Fehler bei Datenbankfehlern
   */
  async getFavoriteLocationsFromDB(userId: string): Promise<Location[]> {
    const { data, error } = await supabase
      .from("favoriten")
      .select(`
        o:orte (
          ort_id,
          name,
          region,
          land,
          schwierigkeit,
          picture_url,
          bewertungen (sterne)
        )
      `)
      .eq("benutzer_id", userId);

    if (error) {
      console.error("Fehler beim Laden der Favoriten:", error);
      throw new Error("Favoriten nicht gefunden");
    }

    const rows = (data ?? []) as unknown as RawFavoriteRow[];
    return rows.map((row) => row.o);
  }

  /**
   * Holt alle Bewertungen eines Nutzers.
   *
   * @param userId ID des Nutzers
   * @returns Promise mit Array der Bewertungen inklusive Ort-Infos
   * @throws Fehler bei Datenbankfehlern
   */
  async getReviewsByUserId(userId: string) {
    const { data, error } = await supabase
      .from("bewertungen")
      .select(`
        sterne,
        kommentar,
        erstellt_am,
        orte (
          name,
          picture_url
        )
      `)
      .eq("benutzer_id", userId);

    if (error) {
      console.error("Fehler beim Laden der Bewertungen:", error);
      throw new Error("Bewertungen konnten nicht geladen werden");
    }

    return data || [];
  }

  /**
   * Holt die ungelesenen Benachrichtigungen eines Nutzers.
   *
   * @param userId ID des Nutzers
   * @returns Promise mit Array der ungelesenen Notifications, sortiert nach Erstellungsdatum
   * @throws Fehler bei Datenbankfehlern
   */

  async getNotifications(userId: string): Promise<NotificationRow[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("benutzer_id", userId)
      .eq("is_read", false)
      .order("erstellt_am", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Fehler beim Laden der Notifications:", error);
      throw new Error("Notifications konnten nicht geladen werden");
    }

    return (data ?? []) as NotificationRow[];
  }

  /**
   * Markiert eine bestimmte Benachrichtigung als gelesen.
   *
   * @param notificationId ID der Notification
   * @param userId ID des Nutzers, zur Sicherstellung der Rechte
   * @returns Promise, die aufgelöst wird, wenn das Update erfolgreich war
   * @throws Fehler bei Datenbankfehlern
   */

  async markNotificationAsRead(notificationId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId)
      .eq("benutzer_id", userId); // sicherstellen, dass Nutzer nur eigene lesen kann

    if (error) {
      throw new Error("Fehler beim Setzen auf 'gelesen': " + error.message);
    }
  }
}

export default new ProfileService();

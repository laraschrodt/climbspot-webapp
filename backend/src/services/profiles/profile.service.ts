import { supabase } from "../../lib/supabase";
import { randomUUID } from "crypto";
import { Location } from "../../types/Location";

interface Bewertung {
  sterne: number;
}

interface RawFavoriteRow {
  o: Location & { bewertungen?: Bewertung[] };
}

/**
 * Alle Methoden in dieser Klasse werden in der /profile Route verwendet.
 * Sie sind für das Laden und Aktualisieren der Profildaten zuständig.
 */
class ProfileService {
  async getProfileDataByUserId(userId: string) {
    const { data, error } = await supabase
      .from("benutzer")
      .select(
        "vorname, nachname, email, benutzername, stadt, passwort_hash, profilbild_url"
      )
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
      throw new Error("Error while updating profile: " + error.message);
    }

    return { success: true };
  }

  async uploadProfileImageToDatabase(
    userId: string,
    file: Express.Multer.File
  ) {
    const fileName = `profile-pictures/${userId}-${randomUUID()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("profile-pictures")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      throw new Error("Supabase-Upload fehlgeschlagen: " + uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("profile-pictures").getPublicUrl(fileName);

    await supabase
      .from("benutzer")
      .update({ profilbild_url: publicUrl })
      .eq("benutzer_id", userId);

    return publicUrl;
  }

  async getFavoriteLocationsFromDB(userId: string): Promise<Location[]> {
    const { data, error } = await supabase
      .from("favoriten")
      .select(
        `
        o:orte (
          ort_id,
          name,
          region,
          land,
          schwierigkeit,
          picture_url,
          bewertungen ( sterne )
        )
      `
      )
      .eq("benutzer_id", userId);

    if (error) {
      console.error("Supabase-Fehler beim Laden der Favoriten:", error);
      throw new Error("Favoriten nicht gefunden");
    }

    const rows = (data ?? []) as unknown as RawFavoriteRow[];
    return rows.map((row) => row.o);
  }
}

export default new ProfileService();

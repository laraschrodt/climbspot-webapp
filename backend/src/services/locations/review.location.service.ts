import { supabase } from "../../lib/supabase";

export class ReviewLocationService {
  /**
   * Fügt eine neue Bewertung zu einem Ort hinzu oder aktualisiert eine bestehende Bewertung
   * desselben Benutzers für diesen Ort.
   *
   * @param review Objekt mit Bewertung: ort_id, benutzer_id, sterne und kommentar
   * @returns Promise mit der gespeicherten Bewertung
   * @throws Fehler bei Datenbankfehlern
   */
  async addReviewToDB(review: {
    ort_id: string;
    benutzer_id: string;
    sterne: number;
    kommentar: string;
  }) {
    const { data, error } = await supabase
      .from("bewertungen")
      .upsert([review], { onConflict: "benutzer_id,ort_id" })
      .select()
      .single();

    if (error) {
      console.error("Supabase-Fehler beim Speichern der Bewertung:", error);
      throw new Error("Fehler beim Speichern der Bewertung.");
    }

    return data;
  }

  /**
   * Holt alle Bewertungen eines Nutzers.
   *
   * @returns Promise mit Array der Bewertungen inklusive Ort-Infos
   * @throws Fehler bei Datenbankfehlern
   */
  async getUserReviewsFromDB(locationId: string) {
    const { data, error } = await supabase
      .from("bewertungen")
      .select(
        `
        sterne,
        kommentar,
        erstellt_am,
        orte (
          name,
          picture_url
        )
      `
      )
      .eq("ort_id", locationId)
      .order("erstellt_am", { ascending: false });

    if (error) {
      console.error("Fehler beim Laden der Bewertungen:", error);
      throw new Error("Bewertungen konnten nicht geladen werden.");
    }

    return data;
  }

  /**
   * Holt die eigene Bewertung eines Nutzers für einen bestimmten Ort.
   *
   * @param params Objekt mit ort_id und benutzer_id
   * @returns Promise mit der Bewertung oder null, falls keine existiert
   * @throws Fehler bei Datenbankfehlern
   */
  async getMyOwnReviewFromDB(params: {
    ort_id: string;
    benutzer_id: string;
  }): Promise<{
    sterne: number;
    kommentar: string;
    erstellt_am: string;
  } | null> {
    const { ort_id, benutzer_id } = params;
    const { data, error } = await supabase
      .from("bewertungen")
      .select("sterne, kommentar, erstellt_am")
      .eq("ort_id", ort_id)
      .eq("benutzer_id", benutzer_id)
      .maybeSingle();

    if (error) {
      console.error("Fehler beim Laden der eigenen Bewertung:", error);
      throw new Error("Eigene Bewertung konnte nicht geladen werden.");
    }

    return data;
  }
}

export default new ReviewLocationService();

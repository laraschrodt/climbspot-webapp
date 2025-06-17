import { supabase } from "../../lib/supabase";

interface RawLocationRow {
  o: Location & { bewertungen?: { sterne: number }[] };
}


/**
 * MyLocationsProfileService
 *
 * Bietet Methoden zum Abrufen der vom Nutzer selbst angelegten Kletterorte,
 * inklusive der Bewertungen der Orte.
 */
class MyLocationsProfileService {
    /**
   * Holt alle Kletterorte, die einem bestimmten Nutzer zugeordnet sind.
   *
   * @param userId ID des Nutzers
   * @returns Promise mit Array der Locations inklusive Bewertungen
   * @throws Fehler bei Datenbankfehlern
   */
  async getLocationsByUser(userId: string): Promise<Location[]> {
    const { data, error } = await supabase
      .from("my-locations")
      .select(
        `
        o:orte (
          ort_id,
          name,
          region,
          land,
          schwierigkeit,
          picture_url,
          bewertungen:bewertungen ( sterne )
        )
      `
      )
      .eq("benutzer_id", userId);

    if (error) {
      console.error("Supabase-Fehler:", error);
      throw new Error("Eigene Orte konnten nicht geladen werden");
    }

    const rows = (data ?? []) as unknown as RawLocationRow[];
    return rows.map((r) => r.o);
  }
}

export default new MyLocationsProfileService();

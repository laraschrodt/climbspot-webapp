import { supabase } from "../../lib/supabase";

interface RawLocationRow {
  o: Location & { bewertungen?: { sterne: number }[] };
}

class MyLocationsProfileService {
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

import { supabase } from "../lib/supabase";
import { Location } from "../types/Location";

class AllLocationsService {
  async getAllLocations(): Promise<Location[]> {
    const { data, error } = await supabase
      .from("orte")
      .select(`
        ort_id,
        name,
        region,
        land,
        schwierigkeit,
        picture_url,
        bewertungen (sterne)
      `);
    if (error) {
      throw new Error("Fehler beim Abrufen der Orte: " + error.message);
    }
    return data as Location[];
  }
}

export default new AllLocationsService();

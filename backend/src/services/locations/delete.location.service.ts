import { supabase } from "../../lib/supabase";

class LocationsService {
  async deleteLocationFromDB(locationId: string): Promise<void> {
    await supabase.from("my-locations").delete().eq("ort_id", locationId);

    const { error } = await supabase
      .from("orte")
      .delete()
      .eq("ort_id", locationId);

    if (error) throw error;
  }
}

export default new LocationsService();

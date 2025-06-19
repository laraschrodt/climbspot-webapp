import { supabase } from "../../lib/supabase";


/**
 * LocationsService
 *
 * Behandelt Geschäftslogik rund um Kletterorte.
 */
class LocationsService {
    /**
   * Löscht einen Kletterort aus der Datenbank.
   * Entfernt zuerst Verknüpfungen in der Tabelle "my-locations",
   * anschließend den Ort selbst in der Tabelle "orte".
   *
   * @param locationId ID des zu löschenden Ortes
   * @throws Fehler, falls die Löschung in der DB fehlschlägt
   */
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

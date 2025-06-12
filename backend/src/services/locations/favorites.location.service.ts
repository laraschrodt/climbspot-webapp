import { supabase } from "../../lib/supabase";

class FavoritesLocationService {
  static async addFavoriteToDb(
    userId: string,
    locationId: string
  ): Promise<void> {
    const { error } = await supabase
      .from("favoriten")
      .insert([{ benutzer_id: userId, ort_id: locationId }]);

    if (error) {
      throw new Error(`Fehler beim Hinzufügen des Favoriten: ${error.message}`);
    }
  }

  static async removeFavoriteFromDb(
    userId: string,
    locationId: string
  ): Promise<void> {
    const { error } = await supabase
      .from("favoriten")
      .delete()
      .match({ benutzer_id: userId, ort_id: locationId });

    if (error) {
      throw new Error(`Fehler beim Entfernen des Favoriten: ${error.message}`);
    }
  }
}

export default FavoritesLocationService;

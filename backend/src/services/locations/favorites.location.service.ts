import { supabase } from "../../lib/supabase";


/**
 * FavoritesLocationService
 *
 * Behandelt die Geschäftslogik für das Verwalten von Favoriten-Kletterorten
 * eines Nutzers.
 */
class FavoritesLocationService {
    /**
   * Fügt einen Ort zu den Favoriten eines Nutzers hinzu.
   *
   * @param userId ID des Nutzers
   * @param locationId ID des hinzuzufügenden Ortes
   * @throws Fehler, falls das Hinzufügen in der Datenbank fehlschlägt
   */
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


    /**
   * Entfernt einen Ort aus den Favoriten eines Nutzers.
   *
   * @param userId ID des Nutzers
   * @param locationId ID des zu entfernenden Ortes
   * @throws Fehler, falls das Entfernen in der Datenbank fehlschlägt
   */
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

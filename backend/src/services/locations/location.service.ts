import { supabase } from "../../lib/supabase";
import { Location } from "../../types/Location";

interface Bewertung {
  id: string;
  benutzer_id: string;
  ort_id: string;
  sterne: number;
  kommentar: string;
  erstellt_am: string;
}

export interface RawLocation extends Location {
  bewertungen?: Bewertung[];
}

export interface RawFavoriteRow {
  o: Location & { bewertungen?: Bewertung[] };
}

/**
 * Bietet Methoden zum Abrufen, Suchen, Bewerten und Aktualisieren von Kletterorten.
 */
export class LocationsService {
  /**
   * Holt einen einzelnen Ort anhand der ID.
   *
   * @param locationId ID des Ortes
   * @returns Promise mit Ort oder null, wenn nicht gefunden
   * @throws Fehler bei Datenbankfehlern
   */
  async getLocationByIdFromDB(locationId: string): Promise<Location | null> {
    const { data, error } = await supabase
      .from("orte")
      .select("*")
      .eq("ort_id", locationId)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data ? (data as Location) : null;
  }

  /**
   * Holt alle verfügbaren Kletterorte.
   *
   * @returns Promise mit Array aller Orte
   * @throws Fehler bei Datenbankfehlern
   */
  async getAllLocationsFromDB(): Promise<Location[]> {
    const { data, error } = await supabase
      .from("orte")
      .select(`*, bewertungen ( sterne )`);

    if (error) throw new Error(error.message);
    return (data ?? []) as Location[];
  }

  /**
   * Holt die beliebtesten Kletterorte, berechnet anhand der durchschnittlichen Bewertung.
   * Sortiert absteigend nach Rating und liefert maximal 12 Orte zurück.
   *
   * @returns Promise mit Array der populären Orte inklusive Bewertung
   * @throws Fehler bei Datenbankfehlern
   */
  async getPopularLocationsFromDB(): Promise<(Location & { rating: number })[]> {
    const { data, error } = await supabase.from("orte").select(`
        *,
        bewertungen ( sterne )
      `);

    if (error) throw new Error(error.message);

    const rows = (data ?? []) as RawLocation[];

    const withRating = rows.map((loc) => {
      const sterneArr: number[] = loc.bewertungen
        ? loc.bewertungen.map((b) => b.sterne)
        : [];

      const avg =
        sterneArr.length > 0
          ? sterneArr.reduce((sum: number, sterne: number) => sum + sterne, 0) / sterneArr.length
          : 0;

      return {
        ...loc,
        rating: Math.round(avg),
      };
    });

    return withRating.sort((a, b) => b.rating - a.rating).slice(0, 12);
  }

  /**
   * Sucht Orte anhand eines Suchbegriffs.
   *
   * @param query Suchstring
   * @returns Promise mit Array der passenden Orte
   * @throws Fehler bei Datenbankfehlern
   */
  async searchLocations(query: string): Promise<Location[]> {
    const { data, error } = await supabase
      .from("orte")
      .select("*")
      .ilike("name", `%${query}%`);

    if (error) {
      throw new Error(`Fehler bei der Locationsuche: ${error.message}`);
    }

    return (data ?? []) as Location[];
  }

  /**
   * Holt die Favoritenorte eines bestimmten Nutzers.
   *
   * @param userId ID des Nutzers
   * @returns Promise mit Array der Favoritenorte
   * @throws Fehler bei Datenbankfehlern
   */
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

  /**
   * Aktualisiert die Daten eines Ortes anhand der ID.
   *
   * @param locationId ID des zu aktualisierenden Ortes
   * @param data Teilweise aktualisierte Ortsdaten
   * @returns Promise mit den aktualisierten Ortsdaten
   * @throws Fehler bei Datenbankfehlern
   */
  async updateLocationInDB(
    locationId: string,
    data: Partial<Location>
  ): Promise<Location> {
    const { data: updated, error } = await supabase
      .from("orte")
      .update(data)
      .eq("ort_id", locationId)
      .select("*")
      .single<Location>();

    if (error) throw error;
    return updated;
  }

  /**
   * ✅ NEU: Prüft, ob der Ort vom Nutzer als Favorit markiert ist.
   *
   * @param locationId ID des Ortes
   * @param userId ID des Benutzers
   * @returns Promise mit true/false je nach Favoritenstatus
   */
  async isLocationFavoritedByUser(locationId: string, userId: string): Promise<boolean> {
    const { count, error } = await supabase
      .from("favoriten")
      .select("*", { head: true, count: "exact" })
      .eq("ort_id", locationId)
      .eq("benutzer_id", userId);

    if (error) throw new Error(error.message);
    return (count ?? 0) > 0;
  }
}

export default new LocationsService();

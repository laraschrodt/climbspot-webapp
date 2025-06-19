import { supabase } from "../../lib/supabase";
import { Location } from "../../types/Location";

interface Bewertung {
  sterne: number;
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
    const { data, error } = await supabase.from("orte").select("*");

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
  async getPopularLocationsFromDB(): Promise<
    (Location & { rating: number })[]
  > {
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
          ? sterneArr.reduce((sum: number, sterne: number) => sum + sterne, 0) /
            sterneArr.length
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
   * Holt alle Bewertungen eines Nutzers.
   *
   * @param userId ID des Nutzers
   * @returns Promise mit Array der Bewertungen inklusive Ort-Infos
   * @throws Fehler bei Datenbankfehlern
   */
  async getUserReviewsFromDB(userId: string) {
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
      .eq("benutzer_id", userId)
      .order("erstellt_am", { ascending: false });

    if (error) {
      console.error("Fehler beim Laden der Bewertungen:", error);
      throw new Error("Bewertungen konnten nicht geladen werden.");
    }

    return data;
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

  async getReviewsByLocationId(locationId: string) {
    const { data, error } = await supabase
      .from("bewertungen")
      .select("*")
      .eq("ort_id", locationId)
      .order("erstellt_am", { ascending: false });

    if (error) {
    console.error("Fehler beim Laden der Bewertungen:", error);
    throw new Error("Bewertungen konnten nicht geladen werden.");
  }

    return data;
  }

  async addReviewToDB(review: {
    ort_id: string;
    benutzer_id: string;
    sterne: number;
    kommentar: string;
  }) {
    const { data, error } = await supabase
      .from("bewertungen")
      .upsert([review], { onConflict: 'benutzer_id,ort_id' })
      .select()
      .single(); // genau eine Bewertung zurückgeben

    if (error) {
      console.error("Supabase-Fehler beim Speichern der Bewertung:", error);
      throw new Error("Fehler beim Speichern der Bewertung.");
    }

    return data;
  }

  async removeFavorite(userId: string, locationId: string): Promise<void> {
    const { error } = await supabase
      .from("favoriten")
      .delete()
      .eq("benutzer_id", userId)
      .eq("ort_id", locationId);

    if (error) {
      console.error("Fehler beim Entfernen des Favoriten:", error);
      throw new Error("Favorit konnte nicht entfernt werden.");
    }
  }
}

export default new LocationsService();

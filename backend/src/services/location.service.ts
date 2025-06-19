import { supabase } from "../lib/supabase";
import { Location } from "../types/Location";

interface Bewertung {
  sterne: number;
}

interface RawLocation extends Location {
  bewertungen?: Bewertung[];
}

interface RawFavoriteRow {
  o: Location & { bewertungen?: Bewertung[] };
}

class LocationsService {
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

  async getAllLocationsFromDB(): Promise<Location[]> {
    const { data, error } = await supabase.from("orte").select("*");

    if (error) throw new Error(error.message);
    return (data ?? []) as Location[];
  }

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

  async getFavoriteLocationsFromDB(userId: string): Promise<Location[]> {
    const { data, error } = await supabase
      .from("favoriten")
      .select(`
        o:orte (
          ort_id,
          name,
          region,
          land,
          schwierigkeit,
          picture_url,
          bewertungen ( sterne )
        )
      `)
      .eq("benutzer_id", userId);
  
    if (error) {
      console.error("Supabase-Fehler beim Laden der Favoriten:", error);
      throw new Error("Favoriten nicht gefunden");
    }
  
    const rows = (data ?? []) as unknown as RawFavoriteRow[];
    return rows.map((row) => row.o);
  }
  
  async getUserReviewsFromDB(userId: string) {
    const { data, error } = await supabase
      .from("bewertungen")
      .select(`
        sterne,
        kommentar,
        erstellt_am,
        orte (
          name,
          picture_url
        )
      `)
      .eq("benutzer_id", userId)
      .order("erstellt_am", { ascending: false });
    
    if (error) {
      console.error("Fehler beim Laden der Bewertungen:", error);
      throw new Error("Bewertungen konnten nicht geladen werden.");
    }
    
    return data;
  }

  async addFavorite(userId: string, locationId: string): Promise<void> {
    console.log(">>> addFavorite called with:");
    console.log("User ID:", userId);
    console.log("Location ID:", locationId);

    // Prüfen, ob Favorit bereits existiert
    const { data: existing, error: checkError } = await supabase
      .from("favoriten")
      .select("id")
      .eq("benutzer_id", userId)
      .eq("ort_id", locationId);

    if (checkError) {
      console.error("Fehler beim Favoriten-Check:", checkError.message);
      throw new Error("Fehler beim Favoriten-Check");
    }

    if (existing && existing.length > 0) {
      console.log("Favorit bereits vorhanden – kein Insert notwendig.");
      return;
    }

    // Nur einfügen, wenn noch nicht vorhanden
    const { error: insertError } = await supabase
      .from("favoriten")
      .insert([{ benutzer_id: userId, ort_id: locationId }]);

    if (insertError) {
      console.error("Fehler beim Insert:", insertError.message);
      throw new Error("Fehler beim Hinzufügen des Favoriten");
    }

    console.log("Favorit erfolgreich hinzugefügt.");
  }

  async removeFavorite(userId: string, locationId: string): Promise<void> {
    const { error } = await supabase
      .from("favoriten") 
      .delete()
      .match({benutzer_id: userId, ort_id: locationId });

    if (error) {
      throw new Error(`Fehler beim Entfernen des Favoriten: ${error.message}`);
    }
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
}

export default new LocationsService();
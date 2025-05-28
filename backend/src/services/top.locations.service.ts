import { supabase } from "../lib/supabase";
import { Location } from "../types/Location";

class TopLocationsService {
  async get12BestLocationsFromDB() {
    const raw = await this.fetchRawLocations();
    return this.mapLocationsToCardData(raw);
  }

  private async fetchRawLocations(): Promise<Location[]> {
    const { data, error } = await supabase
      .from("orte")
      .select(`
        ort_id,
        name,
        region,
        land,
        schwierigkeit,
        picture_url,
        bewertungen ( sterne )
      `)
      .limit(12);

    if (error) {
      throw new Error("Fehler beim Abrufen der Orte: " + error.message);
    }

    return data as Location[];
  }

  private mapLocationsToCardData(locations: Location[]) {
    return locations.map((loc) => ({
      id: loc.ort_id,
      name: loc.name,
      location: `${loc.region}, ${loc.land}`,
      difficulty: loc.schwierigkeit.toString(),
      rating: this.calculateAverageRating(loc.bewertungen || []),
      imageUrl: loc.picture_url ?? "",
    }));
  }

  private calculateAverageRating(bewertungen: { sterne: number }[]): number {
    if (bewertungen.length === 0) return 0;
    const sum = bewertungen.reduce((total, b) => total + b.sterne, 0);
    return Math.round(sum / bewertungen.length);
  }
}

export default new TopLocationsService();

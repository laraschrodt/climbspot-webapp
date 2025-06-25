import { Request, Response } from "express";
import LocationsService from "../../services/locations/location.service";
import { AuthedRequest } from "../../middlewares/auth.middleware";
import { supabase } from "../../lib/supabase";
import { updateLocation as updateLocationInDb } from "../../services/locations/updateLocation.service";
import ReviewLocationService from "../../services/locations/review.location.service";

/**
 * Verwaltet alle Endpunkte rund um Kletterorte:
 * - Einzelne Orte abfragen und prüfen, ob der Nutzer Eigentümer ist
 * - Alle Orte laden
 * - Beliebte Orte laden
 * - Suche nach Orten
 * - Favoriten des Nutzers laden
 * - Bewertungen des Nutzers laden
 * - Ort aktualisieren
 */
class LocationController {
  /**
   * Holt einen Ort anhand der ID.
   * Prüft optional, ob der anfragende Nutzer Eigentümer des Ortes ist.
   * Gibt zusätzlich alle Bewertungen zurück.
   *
   * @param req Express Request mit `locationId` als URL-Parameter und optional Header `x-user-id`
   * @param res Express Response mit Ort-Details, Bewertungen und `isOwner`-Flag
   */
  async getLocationById(req: Request, res: Response): Promise<void> {
    const { locationId } = req.params;
    const userId = req.header("x-user-id") || null;

    try {
      const location = await LocationsService.getLocationByIdFromDB(locationId);
      if (!location) {
        res.status(404).json({ error: "Standort nicht gefunden" });
        return;
      }

      let isOwner = false;
      let isFavorited = false;

      if (userId) {
        const { data: user, error: roleError } = await supabase
          .from("benutzer")
          .select("rolle")
          .eq("benutzer_id", userId)
          .single();

        if (roleError) throw new Error(roleError.message);

        if (user?.rolle === "admin") {
          isOwner = true;
        } else {
          const { count, error: countError } = await supabase
            .from("my-locations")
            .select("*", { head: true, count: "exact" })
            .eq("ort_id", locationId)
            .eq("benutzer_id", userId);

          if (countError) throw new Error(countError.message);
          isOwner = (count ?? 0) > 0;
        }

        isFavorited = await LocationsService.isLocationFavoritedByUser(
          locationId,
          userId
        );
      }

      const reviews = await ReviewLocationService.getUserReviewsFromDB(
        locationId
      );

      res.status(200).json({
        ...location,
        isOwner,
        bewertungen: reviews,
        isFavorited,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Serverfehler" });
    }
  }

  /**
   * Holt alle Kletterorte aus der Datenbank.
   *
   * @param req Express Request
   * @param res Express Response mit Liste aller Orte
   */
  async getAllLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await LocationsService.getAllLocationsFromDB();
      res.json(locations);
    } catch (err) {
      console.error("Fehler in getAllLocations:", err);
      res.status(500).json({ error: "Serverfehler beim Laden aller Orte" });
    }
  }

  /**
   * Holt beliebte Kletterorte aus der Datenbank.
   *
   * @param req Express Request
   * @param res Express Response mit Liste der beliebten Orte
   */
  async getPopularLocations(req: Request, res: Response): Promise<void> {
    try {
      const popular = await LocationsService.getPopularLocationsFromDB();
      res.json(popular);
    } catch (err) {
      console.error("Fehler in getPopularLocations:", err);
      res.status(500).json({ error: "Serverfehler beim Laden beliebter Orte" });
    }
  }

  /**
   * Sucht Orte anhand eines Suchbegriffs (`query`).
   *
   * @param req Express Request mit `query` als Query-Parameter
   * @param res Express Response mit Suchergebnissen oder Fehler bei fehlendem Parameter
   */
  async searchLocations(req: Request, res: Response): Promise<void> {
    const query = req.query.query as string;

    if (!query) {
      res.status(400).json({ error: "Query-Parameter fehlt." });
      return;
    }

    try {
      const results = await LocationsService.searchLocations(query);
      res.json(results);
    } catch (err) {
      console.error("Fehler bei der Standortsuche:", err);
      res.status(500).json({ error: "Serverfehler bei der Standortsuche" });
    }
  }

  /**
   * Holt die Favoritenorte des aktuell eingeloggten Nutzers.
   *
   * @param req Authentifizierter Request mit Nutzerinformationen
   * @param res Express Response mit Liste der Favoriten oder Fehler
   */
  async getFavorites(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string }).userId;
      if (!userId) {
        res.status(400).json({ error: "Ungültiger Token" });
        return;
      }
      const favorites = await LocationsService.getFavoriteLocationsFromDB(
        userId
      );
      res.json(favorites);
    } catch (err) {
      console.error("Fehler in getFavorites:", err);
      res.status(500).json({ error: "Serverfehler beim Laden der Favoriten" });
    }
  }

  /**
   * Aktualisiert einen bestehenden Ort.
   *
   * @param req Express Request mit `locationId` als URL-Parameter und neuen Daten im Body
   * @param res Express Response mit der ID des aktualisierten Ortes oder Fehler
   */
  async updateLocation(req: Request, res: Response) {
    const { locationId } = req.params;
    try {
      const loc = await updateLocationInDb(locationId, req);
      res.status(200).json({ id: loc.ort_id });
    } catch {
      res.status(500).json({ error: "Serverfehler" });
    }
  }
}

export default new LocationController();

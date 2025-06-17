import { Request, Response } from "express";
import LocationsService from "../../services/locations/location.service";
import { AuthedRequest } from "../../middlewares/auth.middleware";
import { supabase } from "../../lib/supabase";
import { updateLocation as updateLocationInDb } from "../../services/locations/updateLocation.service";

class LocationController {
  async getLocationById(req: Request, res: Response): Promise<void> {
    const { locationId } = req.params;
    const userId = req.header("x-user-id") || null; // ← kann null sein

    try {
      const location = await LocationsService.getLocationByIdFromDB(locationId);
      if (!location) {
        res.status(404).json({ error: "Standort nicht gefunden" });
        return;
      }

      let isOwner = false;

      if (userId) {
        const { count, error } = await supabase
          .from("my-locations")
          .select("*", { head: true, count: "exact" })
          .eq("ort_id", locationId)
          .eq("benutzer_id", userId);

        if (error) throw new Error(error.message);
        isOwner = (count ?? 0) > 0;
      }

      res.status(200).json({ ...location, isOwner });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Serverfehler" });
    }
  }

  async getAllLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await LocationsService.getAllLocationsFromDB();
      res.json(locations);
    } catch (err) {
      console.error("Fehler in getAllLocations:", err);
      res.status(500).json({ error: "Serverfehler beim Laden aller Orte" });
    }
  }

  async getPopularLocations(req: Request, res: Response): Promise<void> {
    try {
      const popular = await LocationsService.getPopularLocationsFromDB();
      res.json(popular);
    } catch (err) {
      console.error("Fehler in getPopularLocations:", err);
      res.status(500).json({ error: "Serverfehler beim Laden beliebter Orte" });
    }
  }

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

  async getUserReviews(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;

      if (!userId) {
        res.status(400).json({ error: "Ungültiger Token" });
        return;
      }

      const reviews = await LocationsService.getUserReviewsFromDB(userId);
      res.json(reviews);
    } catch (err) {
      console.error("Fehler beim Laden der Bewertungen:", err);
      res.status(500).json({ error: "Fehler beim Laden der Bewertungen" });
    }
  }

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

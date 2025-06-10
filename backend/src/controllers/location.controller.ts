import { Request, Response } from "express";
import LocationsService from "../services/location.service";
import { AuthedRequest } from "../middlewares/auth.middleware";
import locationService from "../services/location.service";
import ProfileService from "../services/profile.service";
import AccountService from "../services/account.service";

class LocationController {
  async getLocationById(req: Request, res: Response): Promise<void> {
    const { locationId } = req.params;

    try {
      const location = await LocationsService.getLocationByIdFromDB(locationId);
      if (location) {
        res.json(location);
      } else {
        res.status(404).json({ error: "Standort nicht gefunden" });
      }
    } catch (err) {
      console.error("Fehler bei getLocationById:", err);
      res.status(500).json({ error: "Serverfehler beim Laden des Standorts" });
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
      const favorites = await LocationsService.getFavoriteLocationsFromDB(userId);
      res.json(favorites);
    } catch (err) {
      console.error("Fehler in getFavorites:", err);
      res
        .status(500)
        .json({ error: "Serverfehler beim Laden der Favoriten" });
    }
  }
  
  async getUserReviews(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
  
      if (!userId) {
        res.status(400).json({ error: "Ungültiger Token" });
        return;
      }
  
      const reviews = await ProfileService.getUserReviewsFromDB(userId);
      res.json(reviews);
    } catch (err) {
      console.error("Fehler beim Laden der Bewertungen:", err);
      res.status(500).json({ error: "Fehler beim Laden der Bewertungen" });
    }
  }

  async addFavorite(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
      const locationId = req.params.locationId;

      await locationService.addFavorite(userId, locationId);
      res.status(200).json({ message: "Favorit hinzugefügt" });
    } catch (err) {
      console.error("Fehler beim Hinzufügen des Favoriten:", err);
      res.status(500).json({ error: "Serverfehler beim Hinzufügen des Favoriten" });
    }
  }

  async removeFavorite(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
      const locationId = req.params.locationId;

      console.log("Füge Favorit hinzu:", userId, locationId);

      await locationService.removeFavorite(userId, locationId);
      res.status(200).json({ message: "Favorit entfernt" });
    } catch (err) {
      console.error("Fehler beim Entfernen des Favoriten:", err);
      res.status(500).json({ error: "Serverfehler beim Entfernen des Favoriten" });
    }
  }
}

export default new LocationController();
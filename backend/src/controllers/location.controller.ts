import { Request, Response } from "express";
import { AuthedRequest } from "../middlewares/auth.middleware";
import LocationsService from "../services/location.service";

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

  async getAllLocations(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const locations = await LocationsService.getAllLocationsFromDB();
      res.json(locations);
    } catch (err) {
      console.error("Fehler in getAllLocations:", err);
      res.status(500).json({ error: "Serverfehler beim Laden aller Orte" });
    }
  }

  async getPopularLocations(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const popular = await LocationsService.getPopularLocationsFromDB();
      res.json(popular);
    } catch (err) {
      console.error("Fehler in getPopularLocations:", err);
      res.status(500).json({ error: "Serverfehler beim Laden beliebter Orte" });
    }
  }

  async searchLocations(req: AuthedRequest, res: Response): Promise<void> {
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
}

export default new LocationController();

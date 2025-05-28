import { Response } from "express";
import { AuthedRequest } from "../middlewares/auth.middleware";
import TopLocationsService from "../services/top.locations.service";
import AllLocationsService from "../services/all.locations.service";

class LocationController {
  async getPopularLocations(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const spots = await TopLocationsService.get12BestLocationsFromDB();
      res.json(spots);
    } catch (err) {
      console.error("Fehler in getPopularLocations:", err);
      res.status(500).json({ error: "Serverfehler beim Laden der beliebten Orte" });
    }
  }

  async getAllLocations(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const locations = await AllLocationsService.getAllLocations();
      res.json(locations);
    } catch (err) {
      console.error("Fehler in getAllLocations:", err);
      res.status(500).json({ error: "Serverfehler beim Laden aller Orte" });
    }
  }
}

export default new LocationController();

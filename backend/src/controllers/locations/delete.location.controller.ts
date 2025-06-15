import { Request, Response } from "express";
import DeleteLocationService from "../../services/locations/delete.location.service";

class DeleteLocationController {
  async deleteLocation(req: Request, res: Response) {
    const { locationId } = req.params;
    try {
      await DeleteLocationService.deleteLocationFromDB(locationId);
      res.status(204).end();
    } catch {
      res.status(500).json({ error: "Serverfehler" });
    }
  }
}

export default new DeleteLocationController();

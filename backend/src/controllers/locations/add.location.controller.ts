import { Request, Response } from "express";
import { addLocation } from "../../services/locations/add.location.service";

class AddLocationController {
  static async addLocation(request: Request, response: Response) {
    try {
      const result = await addLocation(request);
      const io = request.app.get("io");

      io.emit("new-location", {
        id: result.notification.id,           
        name: result.name,
        region: result.region,
        land: result.land,
        picture_url: result.picture_url,
        date: result.notification.erstellt_am,
      });
      
      response.status(201).json({ id: result.ort_id });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: (error as Error).message });
    }
  }
}

export default AddLocationController;

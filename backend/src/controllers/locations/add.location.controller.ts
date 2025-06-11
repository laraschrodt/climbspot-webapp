import { Request, Response } from "express";
import { addLocation } from "../../services/locations/add.location.service";

class AddLocationController {
  static async addLocation(request: Request, response: Response) {
    try {
      const locationId = await addLocation(request);
      response.status(201).json({ id: locationId });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: (error as Error).message });
    }
  }
}

export default AddLocationController;

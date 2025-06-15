import { Request, Response } from "express";
import { addLocation } from "../../services/locations/add.location.service";

class AddLocationController {
  static async addLocation(request: Request, response: Response) {
    try {
      // Ergebnis vom Service holen
      const result = await addLocation(request);

      // Socket holen (aus Express-Request)
      const io = request.app.get("io");

      // Notification an alle Clients via WebSocket senden
      io.emit("new-location", {
        id: result.notification.id,            // Notification-ID
        name: result.name,
        region: result.region,
        land: result.land,
        picture_url: result.picture_url,
        date: result.notification.erstellt_am, // ISO-Datum
      });

      // Antwort zurück (WICHTIG: ort_id!)
      response.status(201).json({ id: result.ort_id });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: (error as Error).message });
    }
  }
}

export default AddLocationController;

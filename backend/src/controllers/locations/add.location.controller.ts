import { Request, Response } from "express";
import { addLocation } from "../../services/locations/add.location.service";

/**
 * Controller zum Hinzufügen neuer Kletterorte.
 * Delegiert die Geschäftslogik an den `addLocation`-Service.
 * Sendet nach erfolgreicher Erstellung ein `new-location`-WebSocket-Event an alle Clients.
 */

class AddLocationController {
/**
 * HTTP-Handler zum Hinzufügen eines neuen Kletterortes.
 *
 *
 * - Liest Ort-Daten aus dem Request (`name`, `region`, `land`, `picture_url`, ...)
 * - Übergibt die Daten an den Service `addLocation`
 * - Erstellt automatisch Benachrichtigungen für alle Nutzer
 * - Sendet ein `new-location`-Event an alle WebSocket-Clients
 *
 * Bei Erfolg: 201 Created mit Ort-ID im JSON-Body.  
 * Bei Fehler: 500 Internal Server Error.
 *
 * @param request - Express Request mit Ort-Daten und optional Datei-Upload
 * @param response - Express Response zur Rückgabe von Status & Daten
 */


  static async addLocation(request: Request, response: Response) {
    try {
      const result = await addLocation(request); // Ort wird gespeichert inkl. Notification für alle

      const io = request.app.get("io");

      io.emit("new-location", {
        id: result.ort_id,
        name: result.name,
        region: result.region,
        land: result.land,
        picture_url: result.picture_url,
        date: new Date().toISOString(),
      });

      response.status(201).json({ id: result.ort_id });
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Ortes:", error);
      response.status(500).json({ error: (error as Error).message });
    }
  }
}

export default AddLocationController;

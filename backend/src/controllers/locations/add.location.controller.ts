import { Request, Response } from "express";
import { addLocation } from "../../services/locations/add.location.service";

/**
 * Steuert die Verarbeitung von Anfragen zum Hinzufügen neuer Kletterorte.
 * Nutzt den `addLocation`-Service zur Geschäftslogik.
 *
 * Sendet nach erfolgreichem Anlegen eine WebSocket-Nachricht (über `io.emit`) an verbundene Clients,
 * um neue Orte in Echtzeit zu kommunizieren.
 */
class AddLocationController {
  /**
   * Fügt einen neuen Kletterort hinzu.
   * Empfängt die Daten aus dem Request-Objekt.
   * Bei Erfolg wird die neue Ort-ID zurückgegeben und ein "new-location"-Event per WebSocket ausgelöst.
   * Bei Fehlern wird ein 500-Fehler mit Fehlermeldung gesendet.
   *
   * @param request Express Request-Objekt
   * @param response Express Response-Objekt
   */
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

// src/controllers/locations/AddLocationController.ts

import { Request, Response } from "express";
import { addLocation } from "../../services/locations/add.location.service";

/**
 * Steuert die Verarbeitung von Anfragen zum Hinzufügen neuer Kletterorte.
 * Sendet nach erfolgreichem Anlegen eine WebSocket-Nachricht (über `io.emit`) an verbundene Clients.
 */
class AddLocationController {
  /**
   * Fügt einen neuen Kletterort hinzu.
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

import { Request, Response } from "express";
import { supabase } from "../../lib/supabase";

/**
<<<<<<< HEAD
 * Steuert die Verarbeitung von Anfragen zum Hinzufügen neuer Kletterorte.
 * Diese vereinfachte Version verzichtet auf einen separaten Service und behandelt die Logik direkt.
 *
 * Ziel: Einfachheit bei Tests und Debugging – insbesondere ohne Dateiupload oder zusätzliche Businesslogik.
=======
 * Controller zum Hinzufügen neuer Kletterorte.
 * Delegiert die Geschäftslogik an den `addLocation`-Service.
 * Sendet nach erfolgreicher Erstellung ein `new-location`-WebSocket-Event an alle Clients.
>>>>>>> 762ba870fe667563a9f2a070d2f8114fa3f66ea7
 */

class AddLocationController {
<<<<<<< HEAD
  /**
   * Fügt einen neuen Kletterort hinzu.
   * Erwartet `name`, `region` und `difficulty` im Request-Body.
   *
   * @param req Express Request-Objekt
   * @param res Express Response-Objekt
   *
   * - Gibt 400 zurück, wenn Felder fehlen
   * - Gibt 500 zurück, wenn das Einfügen fehlschlägt
   * - Gibt 201 zurück mit den erstellten Daten bei Erfolg
   */
  async addLocation(req: Request, res: Response): Promise<void> {
    const { name, region, difficulty } = req.body;

    // Validierung: Alle Felder erforderlich
    if (!name || !region || !difficulty) {
      res.status(400).json({ message: "Fehlende Felder" });
      return;
=======
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
>>>>>>> 762ba870fe667563a9f2a070d2f8114fa3f66ea7
    }

    // Versuch, den neuen Ort in die Supabase-Tabelle "orte" einzufügen
    const { data, error } = await supabase
      .from("orte")
      .insert({ name, region, difficulty })
      .single();

    // Fehler beim Einfügen in DB
    if (error) {
      console.error("Fehler beim Einfügen:", error);
      res.status(500).json({ message: "Fehler beim Hinzufügen" });
      return;
    }

    // Erfolgreich hinzugefügt
    res.status(201).json(data);
  }
}

export default new AddLocationController();

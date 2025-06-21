import { Request, Response } from "express";
import { supabase } from "../../lib/supabase";

/**
 * Steuert die Verarbeitung von Anfragen zum Hinzufügen neuer Kletterorte.
 * Diese vereinfachte Version verzichtet auf einen separaten Service und behandelt die Logik direkt.
 *
 * Ziel: Einfachheit bei Tests und Debugging – insbesondere ohne Dateiupload oder zusätzliche Businesslogik.
 */
class AddLocationController {
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

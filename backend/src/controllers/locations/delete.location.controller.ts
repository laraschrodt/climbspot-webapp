import { Request, Response } from "express";
import DeleteLocationService from "../../services/locations/delete.location.service";


/**
 * DeleteLocationController
 *
 * Verantwortlich für das Löschen von Kletterorten aus der Datenbank.
 */
class DeleteLocationController {
    /**
   * Löscht einen Kletterort anhand der übergebenen `locationId` aus der URL-Parameter.
   * Bei Erfolg wird HTTP-Status 204 (No Content) zurückgegeben.
   * Bei Fehlern wird ein 500-Fehler mit allgemeiner Fehlermeldung gesendet.
   *
   * @param req Express Request-Objekt, erwartet `locationId` im Params-Objekt
   * @param res Express Response-Objekt
   */

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

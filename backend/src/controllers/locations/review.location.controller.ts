import { Response } from "express";
import { AuthedRequest } from "../../middlewares/auth.middleware";
import { JwtPayload } from "jsonwebtoken";
import ReviewLocationService from "../../services/locations/review.location.service";

/**
 * Fügt eine neue Bewertung für einen bestimmten Ort hinzu.
 *
 * Erwartet im Request-Body die Felder `sterne` (Anzahl der Sterne) und `kommentar` (Text der Bewertung).
 * Die Nutzer-ID wird aus dem authentifizierten Request extrahiert.
 *
 * Gibt bei Erfolg den gespeicherten Bewertungsdatensatz mit Status 201 zurück.
 * Bei fehlenden oder ungültigen Feldern wird ein Fehler mit Status 400 zurückgegeben.
 * Bei Serverfehlern wird ein Fehler mit Status 500 zurückgegeben.
 *
 * @param req - Authentifizierter Request mit Nutzerinformationen, Bewertungsdaten und Orts-ID
 * @param res - Express Response, die das Ergebnis oder einen Fehler zurückgibt
 * @returns Promise<void>
 */
class ReviewLocationController {
  /**
   * Fügt eine Bewertung für einen Ort hinzu.
   *
   * @param req Authentifizierter Request mit Bewertungsdaten
   * @param res Express Response
   */
  static async addReview(req: AuthedRequest, res: Response): Promise<void> {
    const { locationId } = req.params;
    const { sterne, kommentar } = req.body;

    const userId =
      typeof req.user === "string" ? null : (req.user as JwtPayload)?.userId;

    if (!userId || sterne === undefined || kommentar === undefined) {
      res.status(400).json({ error: "Fehlende oder ungültige Felder" });
      return;
    }

    try {
      const result = await ReviewLocationService.addReviewToDB({
        ort_id: locationId,
        benutzer_id: userId,
        sterne,
        kommentar,
      });

      res.status(201).json(result);
    } catch (err) {
      console.error("Fehler beim Speichern der Bewertung:", err);
      res.status(500).json({ error: "Fehler beim Speichern" });
    }
  }

  /**
   * Holt alle Bewertungen, die der Nutzer abgegeben hat.
   *
   * @param req Authentifizierter Request mit Nutzerinformationen
   * @param res Express Response mit Liste der Bewertungen oder Fehler
   */
  static async getUserReviews(
    req: AuthedRequest,
    res: Response
  ): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;

      if (!userId) {
        res.status(400).json({ error: "Ungültiger Token" });
        return;
      }

      const reviews = await ReviewLocationService.getUserReviewsFromDB(userId);
      res.json(reviews);
    } catch (err) {
      console.error("Fehler beim Laden der Bewertungen:", err);
      res.status(500).json({ error: "Fehler beim Laden der Bewertungen" });
    }
  }
}

export default ReviewLocationController;

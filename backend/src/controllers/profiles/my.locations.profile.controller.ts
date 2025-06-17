import { Request, Response } from "express";
import MyLocationsProfileService from "../../services/profiles/my.locations.profile.service";


/**
 * MyLocationsProfileController
 *
 * Verwaltet die Abfrage der vom aktuell eingeloggten Nutzer selbst erstellten Kletterorte.
 */
class MyLocationsProfileController {
    /**
   * Holt alle Locations, die der Nutzer selbst erstellt hat.
   *
   * @param req Express Request, Nutzer-ID wird aus `req.user` gelesen (authentifiziert)
   * @param res Express Response mit Liste der Nutzer-Locations oder Fehler
   */
  async getMyLocations(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId as string;
      const locations = await MyLocationsProfileService.getLocationsByUser(
        userId
      );
      res.status(200).json(locations);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }
}

export default new MyLocationsProfileController();

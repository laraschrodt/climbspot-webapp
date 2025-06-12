import FavoritesLocationService from "../../services/locations/favorites.location.service";
import { Response } from "express";
import { AuthedRequest } from "../../middlewares/auth.middleware";

class FavoritesLocationController {
  static async addFavorite(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
      const locationId = req.params.locationId;

      await FavoritesLocationService.addFavoriteToDb(userId, locationId);
      res.status(200).json({ message: "Favorit hinzugefügt" });
    } catch (err) {
      console.error("Fehler beim Hinzufügen des Favoriten:", err);
      res
        .status(500)
        .json({ error: "Serverfehler beim Hinzufügen des Favoriten" });
    }
  }

  static async removeFavorite(
    req: AuthedRequest,
    res: Response
  ): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
      const locationId = req.params.locationId;

      console.log("Füge Favorit hinzu:", userId, locationId);

      await FavoritesLocationService.removeFavoriteFromDb(userId, locationId);
      res.status(200).json({ message: "Favorit entfernt" });
    } catch (err) {
      console.error("Fehler beim Entfernen des Favoriten:", err);
      res
        .status(500)
        .json({ error: "Serverfehler beim Entfernen des Favoriten" });
    }
  }
}

export default FavoritesLocationController;

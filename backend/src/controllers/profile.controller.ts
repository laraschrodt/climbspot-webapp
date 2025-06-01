import { Response} from "express";
import { AuthedRequest } from "../middlewares/auth.middleware";
import ProfileService from "../services/profile.service";
import AccountService from "../services/account.service";

/**
 * Alle Methoden in dieser Datei werden in der /profile Route verwendet.
 * Sie sind für das Laden und Aktualisieren der Profildaten zuständig.
 */

class ProfileController {

  async getProfileData(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;

      if (!userId) {
        console.warn("Kein userId im Token gefunden.");
        res.status(400).json({ error: "Ungültiger Token" });
        return;
      }

      const profile = await ProfileService.getProfileDataByUserId(userId);
      res.json(profile);
    } catch (err) {
      console.error("Fehler beim Laden des Profils:", err);
      res.status(500).json({ error: "Fehler beim Laden des Profils" });
    }
  }

  async updateProfileData(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
      const { vorname, nachname, email, username, location } = req.body;

      if (!userId || !vorname || !nachname || !email || !username || !location) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      await ProfileService.updateProfileInDatabase(userId, {
        vorname,
        nachname,
        email,
        username,
        location,
      });

      res.json({ message: "Profile successfully updated" });
    } catch (err) {
      console.error("Error in updateUserProfile:", err);
      res.status(500).json({ error: "Error while saving profile" });
    }
  }

  async uploadProfileImage(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;

      if (!userId || !req.file) {
        res.status(400).json({ error: "Bild oder Token fehlt" });
        return;
      }

      const imageUrl = await ProfileService.uploadProfileImageToDatabase(userId, req.file);
      res.json({ url: imageUrl });
    } catch (error) {
      console.error("Upload-Fehler:", error);
      res.status(500).json({ error: "Upload fehlgeschlagen" });
    }
  }

  async getNotifications(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
  
      if (!userId) {
        res.status(400).json({ error: "Kein Benutzer gefunden" });
        return;
      }
  
      const notifications = await ProfileService.getNotificationsByUserId(userId);
      res.json(notifications);
    } catch (err) {
      console.error("Fehler beim Laden der Benachrichtigungen:", err);
      res.status(500).json({ error: "Serverfehler" });
    }
  }

  async changePassword(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
      const { oldPassword, newPassword } = req.body;

      if (!userId || !oldPassword || !newPassword) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      await AccountService.changePasswordInDatabase(userId, oldPassword, newPassword);
      res.json({ message: "Password updated successfully" });
    } catch (err) {
      console.error("Password update error:", err);
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async getFavorites(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string }).userId;
      if (!userId) {
        res.status(400).json({ error: "Ungültiger Token" });
        return;
      }
      const favorites = await ProfileService.getFavoriteLocationsFromDB(userId);
      res.json(favorites);
    } catch (err) {
      console.error("Fehler in getFavorites:", err);
      res
        .status(500)
        .json({ error: "Serverfehler beim Laden der Favoriten" });
    }
  }

  async getUserReviews(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;

      if (!userId) {
        res.status(400).json({ error: "Ungültiger Token" });
        return;
      }

      const reviews = await ProfileService.getUserReviewsFromDB(userId);
      res.json(reviews);
    } catch (err) {
      console.error("Fehler beim Laden der Bewertungen:", err);
      res.status(500).json({ error: "Fehler beim Laden der Bewertungen" });
    }
  }
}

export default new ProfileController();

import { Response, Request } from "express";
import { AuthedRequest } from "../../middlewares/auth.middleware";
import ProfileService from "../../services/profiles/profile.service";
import AccountService from "../../services/accounts/account.service";

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

      if (
        !userId ||
        !vorname ||
        !nachname ||
        !email ||
        !username ||
        !location
      ) {
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

      const imageUrl = await ProfileService.uploadProfileImageToDatabase(
        userId,
        req.file
      );
      res.json({ url: imageUrl });
    } catch (error) {
      console.error("Upload-Fehler:", error);
      res.status(500).json({ error: "Upload fehlgeschlagen" });
    }
  }

  async getNotifications(req: Request, res: Response): Promise<void> {
    const mockData = [
      {
        id: 1,
        message: "Du hast eine neue Nachricht",
        date: new Date().toISOString(),
      },
      {
        id: 2,
        message: "Profil erfolgreich aktualisiert",
        date: new Date().toISOString(),
      },
    ];

    res.json(mockData);
  }

  async changePassword(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
      const { oldPassword, newPassword } = req.body;

      if (!userId || !oldPassword || !newPassword) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      await AccountService.changePasswordInDatabase(
        userId,
        oldPassword,
        newPassword
      );
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
      res.status(500).json({ error: "Serverfehler beim Laden der Favoriten" });
    }
  }
}

export default new ProfileController();

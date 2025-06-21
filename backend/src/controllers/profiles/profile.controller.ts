import { Response } from "express";
import { AuthedRequest } from "../../middlewares/auth.middleware";
import ProfileService from "../../services/profiles/profile.service";
import AccountService from "../../services/accounts/account.service";

/**
 * Verarbeitet alle Anfragen, die unter der `/profile`-Route laufen.
 * Verantwortlich für das Laden, Aktualisieren und Verwalten von Profildaten,
 * Profilbildern, Benachrichtigungen, Favoriten, Bewertungen sowie Passwortänderungen.
 */
class ProfileController {
  /**
   * Liefert Profildaten des aktuell eingeloggten Nutzers zurück.
   *
   * @param req Authentifizierter Request mit Nutzerinformationen
   * @param res Response mit den Profildaten oder Fehlerstatus
   */
  async getProfileData(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
      if (!userId) {
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

  /**
   * Aktualisiert die Profildaten des Nutzers.
   *
   * Erwartet im Body: vorname, nachname, email, username, location.
   * Liefert eine Erfolgsmeldung oder Fehler zurück.
   *
   * @param req Authentifizierter Request mit Nutzerdaten im Body
   * @param res Response mit Statusmeldung
   */
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

  /**
   * Lädt ein neues Profilbild hoch und speichert es.
   *
   * Erwartet eine Datei im Request (z.B. via Multer Middleware).
   *
   * @param req Authentifizierter Request mit Datei
   * @param res Response mit URL zum gespeicherten Bild oder Fehler
   */
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

  /**
   * Liefert alle Benachrichtigungen.
   *
   * @param req Request-Objekt
   * @param res Response mit Liste der Benachrichtigungen oder Fehler
   */
  async getNotifications(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
      const notifications = await ProfileService.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Markiert eine Benachrichtigung als gelesen.
   *
   * @param req Request-Objekt mit Nutzer-ID und Benachrichtigungs-ID
   * @param res Response mit Erfolgsmeldung oder Fehler
   */
  async markNotificationAsRead(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
      const notificationId = req.params.id;
      await ProfileService.markNotificationAsRead(notificationId, userId);
      res.status(200).json({ message: "Notification als gelesen markiert" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  

  /**
   * Ändert das Passwort des Nutzers.
   *
   * Erwartet im Body: oldPassword, newPassword.
   *
   * @param req Authentifizierter Request mit alten und neuen Passwort
   * @param res Response mit Statusmeldung oder Fehler
   */
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

  /**
   * Liefert Favoriten des Nutzers.
   *
   * @param req Authentifizierter Request mit Nutzerinfo
   * @param res Response mit Favoriten oder Fehler
   */
  async getFavorites(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const userId = (req.user as { userId: string })?.userId;
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

  /**
   * Liefert Bewertungen des Nutzers.
   *
   * @param req Authentifizierter Request mit Nutzerinfo
   * @param res Response mit Bewertungen oder Fehler
   */
  async getReviews(req: AuthedRequest, res: Response): Promise<void> {
    const userId =
      req.user && typeof req.user === "object" && "userId" in req.user
        ? (req.user as { userId: string }).userId
        : undefined;

    if (!userId) {
      res.status(401).json({ error: "Kein gültiger Token." });
      return;
    }

    try {
      const reviews = await ProfileService.getReviewsByUserId(userId);
      res.json(reviews);
    } catch (error) {
      console.error("Fehler beim Laden der Bewertungen:", error);
      res
        .status(500)
        .json({ error: "Serverfehler beim Laden der Bewertungen" });
    }
  }
}

export default new ProfileController();

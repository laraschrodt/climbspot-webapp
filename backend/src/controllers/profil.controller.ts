import { Response } from "express";
import { AuthedRequest } from "../middlewares/auth.middleware";
import { getProfileDataFromDatabase as getProfileDataByUserId } from "../services/profil.service";
import { updateProfileInDatabase } from "../services/profil.service";


export const getProfileData = async (req: AuthedRequest, res: Response): Promise<void> => {
  try {
    const userId = (req.user as { userId: string })?.userId;
    console.log("🔍 userId aus JWT:", userId);

    if (!userId) {
      console.warn("⚠️ Kein userId im Token gefunden.");
      res.status(400).json({ error: "Ungültiger Token" });
      return;
    }

    const profil = await getProfileDataByUserId(userId);
    console.log("✅ Profil erfolgreich geladen:", profil);

    res.json(profil);
  } catch (err) {
    console.error("❌ Fehler beim Laden des Profils:", err);
    res.status(500).json({ error: "Fehler beim Laden des Profils" });
  }
};


export const updateProfileData = async (
  req: AuthedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = (req.user as { userId: string })?.userId;

    if (!userId) {
      res.status(400).json({ error: "Invalid token" });
      return;
    }

    const { vorname, nachname, email, username, location } = req.body;

    if (!vorname || !nachname ||!email || !username || !location) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    await updateProfileInDatabase(userId, {
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
};

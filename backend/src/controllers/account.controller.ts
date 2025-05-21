import { Request, Response } from "express";
import { authenticateUserCredentials, createUserAccount, changePasswordInDatabase } from "../services/account.service";
import { ERROR_UNKNOWN } from "../utils/errorMessages";
import { AuthedRequest } from "../middlewares/auth.middleware";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await authenticateUserCredentials(email, password);
    res.status(200).json({ token });
  } catch (err) {
    const msg = err instanceof Error ? err.message : ERROR_UNKNOWN;
    res.status(401).json({ message: msg });
  }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username } = req.body;

  try {
    const result = await createUserAccount(email, password, username);
    res.status(201).json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : ERROR_UNKNOWN;
    res.status(400).json({ message: msg });
  }
};


export const changePassword = async (req: AuthedRequest, res: Response): Promise<void> => {
  try {
    const userId = (req.user as { userId: string })?.userId;
    const { oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      res.status(400).json({ error: "All fields are required" });
      alert("Bitte altes und neues Passwort eingeben.");
      return;
    }

    await changePasswordInDatabase(userId, oldPassword, newPassword);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(400).json({ error: (err as Error).message });
  }
};

import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/userService";
import { ERROR_UNKNOWN } from "../utils/errorMessages";

/**
 * Versucht, einen Nutzer per E-Mail/Passwort einzuloggen und liefert ein JWT zurück.
 * Bei bekannten Fehlern (z. B. falsches Passwort) gibt der Service eine konkrete Nachricht,
 * unerwartete Fehler werden als "Unbekannter Fehler" behandelt.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (err) {
    // Trennung: Business-Logik-Fehler vs. unerwartete Fehler
    const msg = err instanceof Error ? err.message : ERROR_UNKNOWN;
    res.status(401).json({ message: msg });
  }
};

/**
 * Registriert einen neuen Nutzer über den Service.
 * Gibt bei bekannten Validierungsfehlern (z. B. E-Mail existiert) klare Meldungen zurück.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username } = req.body;

  try {
    const result = await registerUser(email, password, username);
    res.status(201).json(result);
  } catch (err) {
    // Trennung: Service-Fehler (400) vs. unerwartete Fehler
    const msg = err instanceof Error ? err.message : ERROR_UNKNOWN;
    res.status(400).json({ message: msg });
  }
};

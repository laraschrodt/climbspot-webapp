import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AccountService from "../../services/accounts/account.service";
import ErrorMessages from "../../utils/ErrorMessages";
import { supabase } from "../../lib/supabase";

/**
 * AccountController
 *
 * Verantwortlich für die Authentifizierungs-Endpunkte:
 * - loginUser: Authentifiziert Nutzer per Email und Passwort, erstellt JWT und liefert Nutzerdaten zurück.
 * - registerUser: Legt neue Nutzeraccounts mit Email, Passwort und Username an.
 *
 * Nutzt `AccountService` für Geschäftslogik und `supabase` für Datenbankzugriffe.
 * Fehler werden abgefangen und mit passenden HTTP-Statuscodes und Nachrichten zurückgegeben.
 */

class AccountController {
  /**
   * Authentifiziert einen Nutzer mit Email und Passwort.
   * Bei Erfolg wird ein JWT erstellt und zusammen mit Nutzer-ID, Rolle und Benutzername zurückgegeben.
   * Bei Fehler erfolgt ein 401 Unauthorized mit Fehlermeldung.
   *
   * @param req Express Request-Objekt mit `email` und `password` im Body.
   * @param res Express Response-Objekt mit JSON-Antwort.
   */
  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const token = await AccountService.authenticateUserCredentials(
        email,
        password
      );

      const decoded: any = jwt.decode(token);
      const { userId, role } = decoded as { userId: string; role: string };

      const { data: userData, error } = await supabase
        .from("benutzer")
        .select("benutzername")
        .eq("benutzer_id", userId)
        .single();

      if (error || !userData) {
        throw new Error("Benutzername konnte nicht geladen werden");
      }

      const username = userData.benutzername;

      res.status(200).json({ token, userId, username, role });
    } catch (err) {
      const msg = err instanceof Error ? err.message : ErrorMessages.UNKNOWN;
      res.status(401).json({ message: msg });
    }
  }

  /**
   * Registriert einen neuen Nutzer mit Email, Passwort und Benutzername.
   * Bei Erfolg wird das Ergebnis mit Status 201 Created zurückgegeben.
   * Bei Fehler erfolgt ein 400 Bad Request mit Fehlermeldung.
   *
   * @param req Express Request-Objekt mit `email`, `password` und `username` im Body.
   * @param res Express Response-Objekt mit JSON-Antwort.
   */

  async registerUser(req: Request, res: Response): Promise<void> {
    const { email, password, username, rolle } = req.body;

    try {
      const result = await AccountService.createUserAccount(
        email,
        password,
        username,
        rolle
      );
      res.status(201).json(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : ErrorMessages.UNKNOWN;
      res.status(400).json({ message: msg });
    }
  }
}

export default new AccountController();

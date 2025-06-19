import { Request, Response } from "express";
import AccountService from "../services/account.service";
import ErrorMessages from "../utils/errorMessages";

/**
 * Alle Methoden in dieser Datei werden in der Registrierung und Authentifizierung verwendet.
 */

class AccountController {
  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const token = await AccountService.authenticateUserCredentials(email, password);
      res.status(200).json({ token });
    } catch (err) {
      const msg = err instanceof Error ? err.message : ErrorMessages.UNKNOWN;
      res.status(401).json({ message: msg });
    }
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    const { email, password, username } = req.body;

    try {
      const result = await AccountService.createUserAccount(email, password, username);
      res.status(201).json(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : ErrorMessages.UNKNOWN;
      res.status(400).json({ message: msg });
    }
  }

}

export default new AccountController();

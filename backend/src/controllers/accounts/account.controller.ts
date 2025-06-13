import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AccountService from "../../services/accounts/account.service";
import ErrorMessages from "../../utils/ErrorMessages";
import { supabase } from "../../lib/supabase";

class AccountController {
  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const token = await AccountService.authenticateUserCredentials(
        email,
        password
      );

      const decoded: any = jwt.decode(token);
      const { userId, role } = decoded;

      const { data: userData, error } = await supabase
        .from("benutzer")
        .select("benutzername")
        .eq("benutzer_id", userId)
        .single();

      if (error || !userData) {
        throw new Error("Benutzername konnte nicht geladen werden");
      }

      const username = userData.benutzername;

      res.status(200).json({ token, username, role });
    } catch (err) {
      const msg = err instanceof Error ? err.message : ErrorMessages.UNKNOWN;
      res.status(401).json({ message: msg });
    }
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    const { email, password, username } = req.body;

    try {
      const result = await AccountService.createUserAccount(
        email,
        password,
        username
      );
      res.status(201).json(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : ErrorMessages.UNKNOWN;
      res.status(400).json({ message: msg });
    }
  }
}

export default new AccountController();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabase";
import ErrorMessages from "../utils/errorMessages";

/**
 * Alle Methoden in dieser Klasse werden für Registrierung und Authentifizierung verwendet.
 */

class AccountService {
  async authenticateUserCredentials(email: string, password: string): Promise<string> {
    const { data, error } = await supabase
      .from("benutzer")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) throw new Error(ErrorMessages.USER_NOT_FOUND);

    const match = await bcrypt.compare(password, data.passwort_hash);
    if (!match) throw new Error(ErrorMessages.WRONG_PASSWORD);

    return jwt.sign(
      { userId: data.benutzer_id },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );
  }

  async createUserAccount(email: string, password: string, benutzername: string): Promise<{ benutzer_id: string; email: string; benutzername: string }> {
    const hashed = await bcrypt.hash(password, 10);

    const { count } = await supabase
      .from("benutzer")
      .select("email", { count: "exact", head: true })
      .eq("email", email);

    if (count && count > 0) throw new Error(ErrorMessages.EMAIL_EXISTS);

    const { error, data } = await supabase
      .from("benutzer")
      .insert({
        email,
        passwort_hash: hashed,
        benutzername
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  }

  async changePasswordInDatabase(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<{ success: boolean }> {
    const { data, error } = await supabase
      .from("benutzer")
      .select("passwort_hash")
      .eq("benutzer_id", userId)
      .single();

    if (error || !data) throw new Error("User not found");

    const match = await bcrypt.compare(oldPassword, data.passwort_hash);
    if (!match) throw new Error("Old password is incorrect");

    const newHashed = await bcrypt.hash(newPassword, 10);

    const { error: updateError } = await supabase
      .from("benutzer")
      .update({ passwort_hash: newHashed })
      .eq("benutzer_id", userId);

    if (updateError) throw new Error("Failed to update password");

    return { success: true };
  }
}

export default new AccountService();

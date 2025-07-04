import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../../lib/supabase";
import ErrorMessages from "../../utils/ErrorMessages";

/**
 * AccountService
 *
 * Behandelt die Geschäftslogik rund um Nutzer-Accounts:
 * - Authentifizierung von Nutzeranmeldedaten
 * - Erstellung neuer Nutzeraccounts
 * - Passwortänderungen
 */
class AccountService {
  /**
   * Authentifiziert einen Nutzer anhand von Email und Passwort.
   * Prüft, ob der Nutzer existiert und das Passwort korrekt ist.
   * Bei Erfolg wird ein JWT mit Nutzer-ID und Rolle zurückgegeben.
   *
   * @param email Email des Nutzers
   * @param password Klartext-Passwort zur Verifikation
   * @returns JWT-Token als String
   * @throws Fehler, wenn Nutzer nicht gefunden oder Passwort falsch ist
   */
  async authenticateUserCredentials(
    email: string,
    password: string
  ): Promise<string> {
    const { data, error } = await supabase
      .from("benutzer")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) throw new Error(ErrorMessages.USER_NOT_FOUND);

    const match = await bcrypt.compare(password, data.passwort_hash);
    if (!match) throw new Error(ErrorMessages.WRONG_PASSWORD);

    return jwt.sign(
      {
        userId: data.benutzer_id,
        role: data.rolle,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "2h",
      }
    );
  }

  /**
   * Erstellt einen neuen Nutzeraccount mit Email, Passwort und Benutzernamen.
   * Prüft vorab, ob die Email bereits existiert.
   * Hasht das Passwort vor dem Speichern.
   *
   * @param email Email-Adresse des neuen Nutzers
   * @param password Klartext-Passwort
   * @param benutzername Gewünschter Benutzername
   * @returns Daten des neu erstellten Nutzers
   * @throws Fehler, wenn Email bereits existiert oder Einfügen fehlschlägt
   */

  async createUserAccount(
    email: string,
    password: string,
    benutzername: string,
    rolle: string
  ): Promise<{ benutzer_id: string; email: string; benutzername: string }> {
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
        benutzername,
        rolle,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  }

  /**
   * Ändert das Passwort eines Nutzers.
   * Verifiziert zuerst das alte Passwort, bevor das neue gespeichert wird.
   *
   * @param userId Nutzer-ID, dessen Passwort geändert wird
   * @param oldPassword Aktuelles Klartext-Passwort
   * @param newPassword Neues Klartext-Passwort
   * @returns Objekt mit Erfolgsmeldung
   * @throws Fehler bei Nutzer nicht gefunden, falschem alten Passwort oder Update-Fehler
   */
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

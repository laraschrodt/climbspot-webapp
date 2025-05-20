import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabase";
import {
  ERROR_USER_NOT_FOUND,
  ERROR_WRONG_PASSWORD,
  ERROR_EMAIL_EXISTS
} from "../utils/errorMessages";

/**
 * Authentifiziert einen Nutzer:
 * 1. Holt den Datensatz aus Supabase
 * 2. Prüft das Passwort-Hash
 * 3. Signiert ein JWT mit 2 h Gültigkeit
 * @throws Error mit aussagekräftiger Nachricht bei bekannten Problemen
 */
export const loginUser = async (email: string, password: string) => {
  // 1. Datenbankabfrage: genau ein Ergebnis oder Error
  const { data, error } = await supabase
    .from("benutzer")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data)
    throw new Error(ERROR_USER_NOT_FOUND);

  // 2. Passwort prüfen (verhindert Klartext-Vergleich)
  const match = await bcrypt.compare(password, data.passwort_hash);
  if (!match)
    throw new Error(ERROR_WRONG_PASSWORD);

  // 3. JWT signieren mit Nutzer-ID
  return jwt.sign(
    { userId: data.benutzer_id },
    process.env.JWT_SECRET!,
    { expiresIn: "2h" }
  );
};

/**
 * Legt einen neuen Nutzer an:
 * 1. Hash des Passworts
 * 2. Dublettenprüfung per HEAD-Query (count)
 * 3. Insert und Rückgabe des Datensatzes
 * @throws Error bei bereits vorhandener E-Mail
 */
export const registerUser = async (
  email: string,
  password: string,
  benutzername: string
) => {
  // 1. Passwort-Hash mit Salz
  const hashed = await bcrypt.hash(password, 10);

  // 2. HEAD-Query zur E-Mail-Verfügbarkeit
  const { count } = await supabase
    .from("benutzer")
    .select("email", { count: "exact", head: true })
    .eq("email", email);

  if (count && count > 0)
    throw new Error(ERROR_EMAIL_EXISTS);

  // 3. Insert und Auswahl des neuen Datensatzes
  const { error, data } = await supabase
    .from("benutzer")
    .insert({
      email,
      passwort_hash: hashed,
      benutzername
    })
    .select()
    .single();

  if (error)
    throw new Error(error.message);

  return data;
};

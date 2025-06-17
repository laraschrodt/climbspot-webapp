import { User } from "../models/User";

/**
 * Antwortstruktur des Backends nach erfolgreicher Registrierung.
 * Optional können auch Profildaten enthalten sein.
 */
export interface RegisterResponse {
  benutzer_id: string;
  vorname?: string;
  nachname?: string;
  email: string;
  benutzername: string;
  profilbild_url?: string;
  location?: string;
}

/**
 * API-Klasse zur Registrierung neuer Benutzer.
 *
 * Kontext:
 * Wird z. B. in der Register-Komponente verwendet, um neue Benutzer
 * über das Backend anzulegen. Bei Erfolg wird direkt ein `User`-Objekt erzeugt.
 */

export class RegisterApi {
  private readonly baseUrl = "/api";

  /**
   * Sendet Benutzerdaten an das Backend zur Registrierung.
   * @param username Gewünschter Benutzername
   * @param email E-Mail-Adresse
   * @param password Gewähltes Passwort
   * @returns Ein neues `User`-Objekt mit den vom Server gelieferten Daten
   * @throws Fehler mit Nachricht bei fehlgeschlagener Registrierung
   */

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const res = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = (await res.json()) as RegisterResponse & { message?: string };

    if (!res.ok) {
      throw new Error(data.message || "Registrierung fehlgeschlagen");
    }

    return new User(
      data.vorname    || "",
      data.nachname   || "",
      data.email,
      data.benutzername,
      data.profilbild_url || "",
      data.location      || ""
    );
  }
}

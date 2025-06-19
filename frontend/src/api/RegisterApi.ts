import { User } from "../models/User";

export interface RegisterResponse {
  benutzer_id: string;
  vorname?: string;
  nachname?: string;
  email: string;
  benutzername: string;
  profilbild_url?: string;
  location?: string;
  rolle: string;
}

export class RegisterApi {
  private readonly baseUrl = "/api";

  /**
   * Sendet Benutzerdaten an das Backend zur Registrierung.
   * @param username Gewünschter Benutzername
   * @param email E-Mail-Adresse
   * @param password Gewähltes Passwort
   * @param rolle Rolle des neuen Nutzers ("user" oder "admin")
   * @returns Ein neues `User`-Objekt mit den vom Server gelieferten Daten
   */
  async register(
    username: string,
    email: string,
    password: string,
    rolle: string = "user"
  ): Promise<User> {
    const res = await fetch(`api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, rolle }),
    });

    const data = (await res.json()) as RegisterResponse & { message?: string };

    if (!res.ok) {
      throw new Error(data.message || "Registrierung fehlgeschlagen");
    }

    return new User(
      data.vorname || "",
      data.nachname || "",
      data.email,
      data.benutzername,
      data.profilbild_url || "",
      data.location || "",
      data.rolle
    );
  }
}

/**
 * Ruft den Login-Endpoint auf und liefert
 * { token, username, role } zurück.
 */
export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  userId: string;
  message?: string;
}

/**
 * API-Klasse zur Abwicklung des Login-Vorgangs.
 *
 * Kontext:
 * Wird von der Login-Komponente verwendet, um Benutzer mit E-Mail und Passwort
 * am Backend anzumelden. Bei erfolgreichem Login wird ein Authentifizierungstoken
 * sowie Benutzerinformationen zurückgegeben.
 */

export class LoginApi {
  private readonly baseUrl = "/api";

  /**
     * Sendet Login-Daten an das Backend und liefert bei Erfolg ein LoginResponse-Objekt zurück.
     * @param email E-Mail-Adresse des Benutzers
     * @param password Passwort des Benutzers
     * @returns Ein Promise mit Login-Daten (Token, Benutzername, Rolle, ID)
     * @throws Fehler mit Nachricht, wenn der Login fehlschlägt
     */

  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponse = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Login fehlgeschlagen");
    }

    return data;
  }
}

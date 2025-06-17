const TOKEN_KEY = "token";
const USERNAME_KEY = "username";
const ROLE_KEY = "role";
const USERID_KEY = "userId";


/**
 * Utility-Klasse zur Verwaltung von Benutzerdaten in der `localStorage`.
 *
 * Kontext:
 * Wird verwendet, um Authentifizierungsdaten (Token, Benutzername, Rolle, ID)
 * nach dem Login lokal zu speichern und beim Laden der App wieder auszulesen.
 * Ermöglicht so persistente Login-Zustände ohne direkten Serverzugriff.
 */

export class UserSessionStorage {

    /**
   * Speichert Token, Benutzername, Rolle und Benutzer-ID im `localStorage`.
   * @param token Der Authentifizierungs-Token
   * @param username Benutzername des eingeloggten Nutzers
   * @param role Rolle des Benutzers (z. B. user, admin)
   * @param userId Interne ID des Benutzers
   */

  static saveUsernameAndTokenInStorage(
    token: string,
    username: string,
    role: string,
    userId: string
  ) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(USERID_KEY, userId);
  }

    /**
   * Entfernt alle gespeicherten Benutzerdaten aus dem `localStorage`.
   * Wird z. B. beim Logout aufgerufen.
   */

  static removeUsernameAndTokenFromStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USERID_KEY);
  }

    /**
   * Liest gespeicherte Benutzerdaten aus dem `localStorage`.
   * @returns Objekt mit `username`, `role` und `userId` – oder `null`, wenn unvollständig
   */

  static loadUsernameAndTokenFromStorage(): {
    username: string;
    role: string;
    userId: string;
  } | null {
    const token = localStorage.getItem(TOKEN_KEY);
    const username = localStorage.getItem(USERNAME_KEY);
    const role = localStorage.getItem(ROLE_KEY);
    const userId = localStorage.getItem(USERID_KEY);

    return token && username && role && userId
      ? { username, role, userId }
      : null;
  }
}

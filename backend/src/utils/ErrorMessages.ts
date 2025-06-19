/**
 * ErrorMessages
 *
 * Sammlung von statischen, vordefinierten Fehlermeldungen,
 * die in der gesamten Anwendung verwendet werden.
 * 
 * - USER_NOT_FOUND: Meldung, wenn ein Benutzer nicht gefunden wird.
 * - WRONG_PASSWORD: Meldung bei falschem Passwort.
 * - EMAIL_EXISTS: Meldung, wenn eine E-Mail bereits registriert ist.
 * - UNKNOWN: Allgemeine Fehlermeldung für unbekannte Fehler.
 */
class ErrorMessages {
  static readonly USER_NOT_FOUND = "Benutzer nicht gefunden";
  static readonly WRONG_PASSWORD = "Falsches Passwort";
  static readonly EMAIL_EXISTS = "E-Mail wird bereits verwendet";
  static readonly UNKNOWN = "Ein unbekannter Fehler ist aufgetreten";
}

export default ErrorMessages;

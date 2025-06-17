import React, { createContext, useState, useEffect } from "react";
import { UserSessionStorage } from "./UserSessionStorage";

type User = { username: string; role: string; userId: string } | null;

interface UserSessionType {
  user: User;
  storeLoginData: (user: NonNullable<User>, token: string) => void;
  clearSession: () => void;
}


/**
 * Kontext zur Verwaltung der aktuellen Benutzersitzung.
 *
 * Kontext:
 * Wird in der gesamten Anwendung über einen React Context bereitgestellt, um auf
 * Login-Zustand, Benutzerinformationen und Logout-Funktion zuzugreifen.
 *
 * Zusammenarbeit:
 * - Nutzt `UserSessionStorage`, um Login-Daten im `localStorage` zu persistieren.
 * - Ermöglicht durch `storeLoginData` und `clearSession` die zentrale Sitzungsverwaltung.
 */

export const UserSessionContext = createContext<UserSessionType>(null as never);

  /**
 * Context-Provider für `UserSessionContext`.
 *
 * Kontext:
 * Umgibt z. B. die gesamte App und stellt den Login-Zustand über `user`, `storeLoginData`
 * und `clearSession` allen Kindkomponenten zur Verfügung.
 *
 * Funktion:
 * - Initial lädt der Provider die Login-Daten aus dem Storage.
 * - Bei Änderungen im Storage (z. B. in anderem Tab) wird der Zustand aktualisiert.
 */

export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(() =>
    UserSessionStorage.loadUsernameAndTokenFromStorage()
  );

  useEffect(() => {
    const handle = () =>
      setUser(UserSessionStorage.loadUsernameAndTokenFromStorage());
    window.addEventListener("storage", handle);
    return () => window.removeEventListener("storage", handle);
  }, []);

  const storeLoginData = (u: NonNullable<User>, token: string) => {
    UserSessionStorage.saveUsernameAndTokenInStorage(
      token,
      u.username,
      u.role,
      u.userId
    );
    setUser(u);
  };

  const clearSession = () => {
    UserSessionStorage.removeUsernameAndTokenFromStorage();
    setUser(null);
  };

  return (
    <UserSessionContext.Provider value={{ user, storeLoginData, clearSession }}>
      {children}
    </UserSessionContext.Provider>
  );
};

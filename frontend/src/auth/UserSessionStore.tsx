import React, { createContext, useState, useEffect } from "react";
import { UserSessionStorage } from "./UserSessionStorage";

type User = { username: string; role: string } | null;

interface UserSessionType {
  user: User;
  storeLoginData: (user: User, token: string) => void;
  clearSession: () => void;
}

export const UserSessionContext = createContext<UserSessionType>(null as never);

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

  const storeLoginData = (u: User, token: string) => {
    if (!u) return;
    UserSessionStorage.saveUsernameAndTokenInStorage(token, u.username, u.role);
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

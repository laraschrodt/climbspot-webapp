import React, { createContext, useState, useEffect } from "react";
import { UserSessionStorage } from "./UserSessionStorage";


type User = { username: string } | null;

interface UserSessionType {
  user: User;
  storeLoginData: (user: User, token: string) => void;
  clearSession: () => void;
}

export const UserSessionContext = createContext<UserSessionType>(null as never);

export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const storedUser = UserSessionStorage.loadUsernameAndTokenFromStorage();
    if (storedUser) setUser(storedUser);
  }, []);

  const storeLoginData = (user: User, token: string) => {
    if (!user) return;
    UserSessionStorage.saveUsernameAndTokenInStorage(token, user.username);
    setUser(user);
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

import React, { createContext, useContext, useState, useEffect } from "react";

type User = { username: string } | null;

interface AuthCtx {
  user: User;
  login: (u: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>(null as never);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    const name   = localStorage.getItem("username");
    if (stored && name) setUser({ username: name });
  }, []);

  const login = (u: User, token: string) => {
    if (!u) return;
    localStorage.setItem("token", token);
    localStorage.setItem("username", u.username);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

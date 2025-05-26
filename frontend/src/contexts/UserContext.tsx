import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  JSX
} from "react";
import { User } from "../models/User";

interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (patch: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser]     = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(({ user: u }) => {
        const inst = new User(
          u.vorname,
          u.nachname,
          u.email,
          u.benutzername,
          u.profilbild_url,
          u.location
        );
        setUser(inst);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const updateUser = (patch: Partial<User>) => {
    if (!user) return;
    setUser(new User(
      patch.firstName   ?? user.firstName,
      patch.lastName    ?? user.lastName,
      patch.email       ?? user.email,
      patch.username    ?? user.username,
      patch.profilbild_url ?? user.profilbild_url,
      patch.location    ?? user.location
    ));
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}

import { useContext } from "react";
import { UserSessionContext } from "./UserSessionStore";

export const useUserSession = () => useContext(UserSessionContext);

import { Navigate } from "react-router-dom";
import { useUserSession } from "../auth/UseUserSession";

interface ProtectedRouteProps {
  roles: string[];
  element: React.ReactElement;
}

/**
 * ProtectedRoute-Komponente
 *
 * Wrapper für React-Router-Routen, die den Zugriff basierend auf Nutzerrollen einschränkt.
 * Nutzt `useUserSession` um den eingeloggten Nutzer zu ermitteln.
 * 
 * - Ist kein Nutzer eingeloggt, wird zur Login-Seite weitergeleitet.
 * - Hat der Nutzer keine passende Rolle, erfolgt eine Weiterleitung zur Unauthorized-Seite.
 * - Ist der Zugriff erlaubt, wird das gewünschte Element gerendert.
 *
 * Verwendung: Eingebunden im Routing, um geschützte Bereiche der Anwendung abzusichern.
 */

export default function ProtectedRoute({
  roles,
  element,
}: ProtectedRouteProps) {
  const { user } = useUserSession();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
}

import { useUserSession } from "../auth/UseUserSession";

interface Props {
  roles: string[];
  children: React.ReactElement;
}

/**
 * ProtectedComponent
 *
 * Wrapper-Komponente, die ihre Kinder nur anzeigt, wenn der aktuell eingeloggte Nutzer
 * eine der in `roles` angegebenen Rollen besitzt.
 *
 * Nutzt den User-Context (`useUserSession`) zur Bestimmung der Nutzerrolle.
 * Wenn kein Nutzer eingeloggt ist oder die Rolle nicht erlaubt ist, rendert sie `null`.
 *
 * Einsatzbeispiel: Berechtigungsbasierte Darstellung von UI-Elementen.
 */

export default function ProtectedComponent({ roles, children }: Props) {
  const { user } = useUserSession();
  if (!user || !roles.includes(user.role)) return null;
  return children;
}

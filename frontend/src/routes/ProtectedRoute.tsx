import { Navigate } from "react-router-dom";
import { useUserSession } from "../auth/UseUserSession";

interface ProtectedRouteProps {
  roles: string[];
  element: React.ReactElement;
}

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

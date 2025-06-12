import { useUserSession } from "../auth/UseUserSession";

interface Props {
  roles: string[];
  children: React.ReactElement;
}

export default function ProtectedComponent({ roles, children }: Props) {
  const { user } = useUserSession();
  if (!user || !roles.includes(user.role)) return null;
  return children;
}

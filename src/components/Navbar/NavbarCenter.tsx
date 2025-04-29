import { FC } from "react";

/* Logo mit "ClimbSpot" daneben */
const NavbarCenter: FC = () => {
  return (
    <div className="navbar-center flex items-center gap-2">
      <img alt="Logo" src="/logo.png" className="h-16 md:h-25 w-auto" />
      <span className="text-3xl font-bold text-green-900">ClimbSpot</span>{" "}
    </div>
  );
};

export default NavbarCenter;

import { FC } from "react";
import { Link } from "react-router-dom";

/* Buttons für Home, Karte und Locations */
const NavbarStart: FC = () => {
  return (
    <div className="navbar-start flex justify-center gap-6">
      <Link to="/" className="btn btn-ghost normal-case text-md">
        Home
      </Link>

      <Link to="/locations" className="btn btn-ghost normal-case text-md">
        Locations
      </Link>

      <Link to="/map" className="btn btn-ghost normal-case text-md">
        Karte
      </Link>
    </div>
  );
};

export default NavbarStart;

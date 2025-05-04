import { FC } from "react";
import { Link } from "react-router-dom";

const NavbarStart: FC = () => {
  return (
    <div className="navbar-start">
      {/* Mobile Dropdown Menü */}
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          ☰
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/locations">Locations</Link>
          </li>
          <li>
            <Link to="/map">Karte</Link>
          </li>
        </ul>
      </div>

      {/* Desktop-Links */}
      <div className="hidden lg:flex gap-4">
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
    </div>
  );
};

export default NavbarStart;

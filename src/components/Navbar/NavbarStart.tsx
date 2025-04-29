import { FC } from "react";

/* Buttons für Home, Karte und Locations */
const NavbarStart: FC = () => {
  return (
    <div className="navbar-start flex justify-center gap-6">
      <a className="btn btn-ghost normal-case text-md" href="#tab1">
        Home
      </a>
      <a className="btn btn-ghost normal-case text-md" href="#tab2">
        Locations
      </a>
      <a className="btn btn-ghost normal-case text-md" href="#tab3">
        Karte
      </a>
    </div>
  );
};

export default NavbarStart;

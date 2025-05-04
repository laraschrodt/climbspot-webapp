import React from "react";
import NavbarStart from "./NavbarStart";
import NavbarCenter from "./NavbarCenter";
import NavbarEnd from "./NavbarEnd";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-base-200 px-10 py-0 shadow-md">
      <NavbarStart />
      <NavbarCenter />
      <NavbarEnd />
    </nav>
  );
};

export default Navbar;

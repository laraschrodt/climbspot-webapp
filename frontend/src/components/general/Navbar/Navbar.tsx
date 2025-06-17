import React from "react";
import NavbarStart from "./NavbarStart";
import NavbarCenter from "./NavbarCenter";
import NavbarEnd from "./NavbarEnd";


/**
 * Haupt-Navigationsleiste der Anwendung.
 *
 * Kontext:
 * Diese Komponente ist für die Navigation im Header-Bereich zuständig
 * und setzt sich aus drei Bereichen zusammen: Start, Center und End.
 *
 * Funktion:
 * - `NavbarStart`: enthält z. B. das Logo oder den Home-Link.
 * - `NavbarCenter`: kann die Suchleiste oder zentrale Navigationselemente enthalten.
 * - `NavbarEnd`: enthält Login/Profile, Einstellungen etc.
 * - Wird auf allen Seiten ganz oben angezeigt.
 */

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

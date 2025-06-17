import { FC } from "react";

/**
 * Zentrierter Bereich der Navigationsleiste.
 *
 * Kontext:
 * Wird in der Haupt-Navigationsleiste verwendet (`Navbar`) und zeigt das
 * Logo sowie den Schriftzug „ClimbSpot“ an.
 *
 * Funktion:
 * - Stellt das Branding der Anwendung dar.
 * - Besteht aus einem Bild (Logo) und einem Text (App-Name).
 */

const NavbarCenter: FC = () => {
  return (
    <div className="navbar-center flex items-center gap-2">
      <img alt="Logo" src="/logo.png" className="h-10 md:h-16 w-auto" />
      <span className="text-3xl font-bold text-green-900 md:inline">
        ClimbSpot
      </span>
    </div>
  );
};

export default NavbarCenter;

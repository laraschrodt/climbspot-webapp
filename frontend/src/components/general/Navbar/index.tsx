/**
 * Bündelt und exportiert die einzelnen Navbar-Komponenten für die Verwendung in der App.
 *
 * Kontext:
 * - Dient als zentraler Einstiegspunkt, um `Navbar`, `NavbarStart`, `NavbarCenter` und `NavbarEnd`
 *   bequem importieren zu können.
 *
 * Beispiel:
 * ```ts
 * import { Navbar, NavbarEnd } from "@/components/general/Navbar";
 * ```
 */

import Navbar from "./Navbar";
import NavbarStart from "./NavbarStart";
import NavbarCenter from "./NavbarCenter";
import NavbarEnd from "./NavbarEnd";

export { Navbar, NavbarStart, NavbarCenter, NavbarEnd };

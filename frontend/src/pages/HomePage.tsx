import { Navbar } from "../components/general/Navbar";
import { Hero } from "../components/homePage/Hero";
import { PopularLocations } from "../components/homePage/PopularLocations";
import Footer from "../components/general/Footer/Footer";

/**
 * HomePage-Komponente
 *
 * Zentrale Startseite der Anwendung.
 * Besteht aus der globalen Navigationsleiste (`Navbar`), 
 * dem Hero-Bereich mit Hauptbotschaft und Call-to-Action (`Hero`), 
 * einer Übersicht populärer Kletterorte (`PopularLocations`) 
 * und dem Footer.
 *
 * Im Routing als Landingpage hinterlegt.
 */

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <PopularLocations />
      <Footer />
    </div>
  );
}

export default HomePage;

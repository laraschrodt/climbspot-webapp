import Navbar from "../components/general/Navbar/Navbar";
import Footer from "../components/general/Footer/Footer";
import AddLocation from "../components/addLocation/AddLocation";


/**
 * AddLocationPage-Komponente
 *
 * Seite für das Hinzufügen neuer Kletterorte.
 * Besteht aus der globalen Navigationsleiste (`Navbar`), 
 * dem Hauptformular zum Erstellen eines neuen Ortes (`AddLocation`) 
 * und dem Footer.
 *
 * Eingebunden im Routing als eigene Seite.
 */

function AddLocationPage() {
  return (
    <div>
      <Navbar />
      <AddLocation />
      <Footer />
    </div>
  );
}

export default AddLocationPage;

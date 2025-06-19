import EditLocation from "../components/changeLocation/EditLocation";
import Footer from "../components/general/Footer/Footer";
import { Navbar } from "../components/general/Navbar";

/**
 * EditLocationPage-Komponente
 *
 * Seite zur Bearbeitung bestehender Kletterorte.
 * Besteht aus globaler Navigationsleiste (`Navbar`), dem Bearbeitungsformular (`EditLocation`) 
 * und dem Footer.
 *
 * Eingebunden im Routing als eigenständige Seite.
 */

function EditLocationPage() {
  return (
    <>
      <Navbar />
      <EditLocation />
      <Footer />
    </>
  );
}

export default EditLocationPage;

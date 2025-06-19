import { Navbar } from "../components/general/Navbar";
import { Login } from "../components/user/Login";
import Footer from "../components/general/Footer/Footer";

/**
 * LoginPage-Komponente
 *
 * Seite zur Nutzeranmeldung.
 * Besteht aus globaler Navigationsleiste (`Navbar`), 
 * dem Login-Formular (`Login`) und dem Footer.
 *
 * Eingebunden im Routing als Anmeldeseite.
 */

function LoginPage() {
  return (
    <div>
      <Navbar />
      <Login />
      <Footer />
    </div>
  );
}

export default LoginPage;

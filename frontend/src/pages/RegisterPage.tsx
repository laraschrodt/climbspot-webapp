import { Navbar } from "../components/general/Navbar";
import { Register } from "../components/user/Register";
import Footer from "../components/general/Footer/Footer";


/**
 * RegisterPage-Komponente
 *
 * Seite zur Nutzerregistrierung.
 * Besteht aus globaler Navigationsleiste (`Navbar`), 
 * dem Registrierungsformular (`Register`) und dem Footer.
 *
 * Im Routing als Registrierungsseite eingebunden.
 */

function LoginPage() {
  return (
    <div>
      <Navbar />
      <Register />
      <Footer />
    </div>
  );
}

export default LoginPage;

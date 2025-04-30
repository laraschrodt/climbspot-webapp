// ~TODO: In Components aufspalten~ ✅ erledigt
// ~TODO: Farblich bisschen anpassen~ ✅ angepasst

import { Navbar } from "../components/HomePage/Navbar";
import {Register} from "../components/user/Register"
import Footer from "../components/HomePage/Footer/Footer";

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
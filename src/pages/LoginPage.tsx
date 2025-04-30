// ~TODO: In Components aufspalten~ ✅ erledigt
// ~TODO: Farblich bisschen anpassen~ ✅ angepasst

import { Navbar } from "../components/HomePage/Navbar";
import {Login} from "../components/user/Login"
import Footer from "../components/HomePage/Footer/Footer";

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
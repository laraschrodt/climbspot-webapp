import { Navbar } from "../components/general/Navbar";
import { Login } from "../components/user/Login";
import Footer from "../components/general/Footer/Footer";

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

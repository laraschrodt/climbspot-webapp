import { Navbar } from "../components/general/Navbar";
import Profile  from "../components/user/Profile";
import Footer from "../components/general/Footer/Footer";

/**
 * ProfilePage-Komponente
 *
 * Hauptseite für das Nutzerprofil.
 * Besteht aus globaler Navigationsleiste (`Navbar`), 
 * dem Profil-Bereich (`Profile`) und dem Footer.
 *
 * Im Routing als Profilseite eingebunden.
 */

function ProfilePage(){
  return(
    <div>
      <Navbar/>
      <Profile/>
      <Footer/>
    </div>

  );
}
export default ProfilePage;

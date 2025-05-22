import { Navbar } from "../components/general/Navbar";
import Profile  from "../components/user/Profile";
import Footer from "../components/general/Footer/Footer";

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

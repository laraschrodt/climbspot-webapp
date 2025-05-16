import { Navbar } from "../components/general/Navbar";
import { Hero } from "../components/homePage/Hero";
import { PopularLocations } from "../components/homePage/PopularLocations";
import Footer from "../components/general/Footer/Footer";

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

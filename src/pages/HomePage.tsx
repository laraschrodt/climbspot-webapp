import { Navbar } from "../components/general/Navbar";
import { Hero } from "../components/homepage/Hero";
import { PopularLocations } from "../components/homepage/PopularLocations";
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

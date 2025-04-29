import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { PopularLocations } from "../components/PopularLocations";
import Footer from "../components/Footer/Footer";

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

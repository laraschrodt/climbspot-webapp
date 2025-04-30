import { Navbar } from "../components/HomePage/Navbar";
import { Hero } from "../components/HomePage/Hero";
import { PopularLocations } from "../components/HomePage/PopularLocations";
import Footer from "../components/HomePage/Footer/Footer";

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

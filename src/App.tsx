import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PopularLocations } from "./components/PopularLocations";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <PopularLocations />
      <Footer />
    </div>
  );
}

export default App;

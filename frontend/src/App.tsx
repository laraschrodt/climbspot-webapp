import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import LocationList from "./pages/LocationList";
import LocationMap from "./pages/LocationMap";
import Profil  from "./pages/ProfilPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/locations" element={<LocationList />} />
        <Route path="/map" element={<LocationMap />} />
      </Routes>
    </Router>
  );
}

export default App;

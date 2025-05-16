import "./styles/App.css";
import { Routes, Route } from "react-router-dom";

import HomePage     from "./pages/HomePage";
import LoginPage    from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilPage   from "./pages/ProfilPage";
import LocationList from "./pages/LocationList";
import LocationMap  from "./pages/LocationMap";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profil" element={<ProfilPage />} />
      <Route path="/locations" element={<LocationList />} />
      <Route path="/map" element={<LocationMap />} />
    </Routes>
  );
}

import "./styles/App.css";
import { Routes, Route } from "react-router-dom";

import HomePage     from "./pages/HomePage";
import LoginPage    from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LocationList from "./pages/LocationList";
import LocationMap  from "./pages/LocationMap";
import ProfilePage   from "./pages/ProfilePage";
import LocationDetails from "./pages/LocationDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/locations" element={<LocationList />} />
      <Route path="/details/:id" element={<LocationDetails />} />
      <Route path="/map" element={<LocationMap />} />
    </Routes>
  );
}

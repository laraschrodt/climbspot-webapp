import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LocationList from "./pages/LocationList";
import LocationMap from "./pages/LocationMap";
import ProfilePage from "./pages/ProfilePage";
import LocationDetailsPage from "./pages/LocationDetailsPage";
import AddLocationPage from "./pages/AddLocationPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import EditLocationPage from "./pages/EditLocationPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/profile"
        element={<ProtectedRoute roles={["user"]} element={<ProfilePage />} />}
      />

      <Route
        path="/add-location"
        element={
          <ProtectedRoute roles={["user"]} element={<AddLocationPage />} />
        }
      />

      <Route
        path="/edit-location/:locationId"
        element={
          <ProtectedRoute roles={["user"]} element={<EditLocationPage />} />
        }
      />

      <Route path="/locations" element={<LocationList />} />
      <Route path="/map" element={<LocationMap />} />
      <Route path="/details/:locationId" element={<LocationDetailsPage />} />

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<h1>Error 404: Diese Seite gibt es nicht</h1>} />
    </Routes>
  );
}

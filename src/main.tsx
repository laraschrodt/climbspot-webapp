import 'leaflet/dist/leaflet.css';
import 'leaflet-ui/dist/leaflet-ui.css';


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

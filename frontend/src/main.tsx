import 'leaflet/dist/leaflet.css';
import 'leaflet-ui/dist/leaflet-ui.css';
import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UserSessionProvider } from "./auth/UserSessionStore";

/**
 * Einstiegspunkt der React-Anwendung.
 *
 * Bindet globale CSS-Dateien (Leaflet, Leaflet-UI, eigene Styles) ein.
 * Rendert die App-Komponente innerhalb von React.StrictMode.
 * Umgibt die App mit BrowserRouter für Routing und UserSessionProvider für Nutzer-Session-Context.
 */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserSessionProvider>
        <App />
      </UserSessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);

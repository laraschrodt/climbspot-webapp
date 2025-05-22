import 'leaflet/dist/leaflet.css';
import 'leaflet-ui/dist/leaflet-ui.css';
import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UserSessionProvider } from "./auth/UserSessionStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserSessionProvider>
        <App />
      </UserSessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);

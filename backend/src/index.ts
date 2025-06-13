import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";

import authRoutes from "./routes/account.routes";
import profileRoutes from "./routes/profile.routes";
import locationRouter from "./routes/location.router";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// ----> Deine API-Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/locations", locationRouter);

// ----> Beispielroute: Ort hinzufügen + Notification senden
app.post("/api/orte", async (req, res) => {
  const { name, region, land, picture_url } = req.body;
  // (Hier würdest du z.B. einen Insert in die DB machen)
  // Annahme: Speichern war erfolgreich

  // --> WebSocket an alle senden
  io.emit("new-location", {
    name,
    region,
    land,
    picture_url,
    date: new Date().toLocaleDateString("de-DE"),
  });

  res.json({ success: true });
});

// Optional: WebSocket-Event-Logging
io.on("connection", (socket) => {
  console.log("WebSocket-Client verbunden:", socket.id);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});

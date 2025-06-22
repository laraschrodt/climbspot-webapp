import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/account.routes";
import profileRoutes from "./routes/profile.routes";
import locationRouter from "./routes/location.router";
import adminRoutes from "./routes/admin.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/locations", locationRouter);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.set("io", io);

io.on("connection", (socket) => {
  console.log("WebSocket-Client verbunden:", socket.id);
});

app.post("/api/test-notify", (req, res) => {
  const io = req.app.get("io");
  io.emit("new-location", {
    id: "test-id",
    name: "Test-Spot",
    region: "Test-Region",
    land: "Test-Land",
    picture_url: "https://via.placeholder.com/80",
    date: new Date().toLocaleDateString("de-DE"),
  });
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});

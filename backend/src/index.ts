import express from "express";
import cors from "cors";
import authRoutes from "./routes/account.routes";
import profileRoutes from "./routes/profile.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.listen(3001, () => console.log("Backend läuft auf http://localhost:3001"));

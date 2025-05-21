import express from "express";
import cors from "cors";
import authRoutes from "./routes/account.routes";
import profilRoutes from "./routes/profil.routes";
import userRoutes from "./routes/profil.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/profil", profilRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(3001, () => console.log("Backend läuft auf http://localhost:3001"));

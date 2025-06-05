import express from "express";
import cors from "cors";
import "dotenv/config"; // .env wird geladen

import authRoutes from "./routes/account.routes";
import profileRoutes from "./routes/profile.routes";
import locationRouter from "./routes/location.router";
import locationDetailsRouter from "./routes/locationDetails.routes"; 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/locations", locationRouter);
app.use("/api/location-details", locationDetailsRouter); 

app.listen(3001, () => console.log("Backend läuft auf http://localhost:3001"));
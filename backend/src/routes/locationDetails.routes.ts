import express from "express";
import { getLocationByName } from "../controllers/locationDetails.controller";

const router = express.Router();

router.get("/api/details/id", getLocationByName);

export default router;
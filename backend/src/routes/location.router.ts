import { Router } from "express";
import LocationController from "../controllers/location.controller";

const router = Router();

router.get("/all", LocationController.getAllLocations);
router.get("/popular", LocationController.getPopularLocations);

// ✨ NEU: Such-Route für dynamische Suchvorschläge
router.get("/search", LocationController.searchLocations);

export default router;


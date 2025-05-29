import { Router } from "express";
import LocationController from "../controllers/location.controller";

const router = Router();

router.get("/all", LocationController.getAllLocations);
router.get("/popular", LocationController.getPopularLocations);

export default router;

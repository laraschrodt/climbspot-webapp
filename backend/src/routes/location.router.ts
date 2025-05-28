import { Router } from "express";
import locationController from "../controllers/location.controller";
import LocationController from "../controllers/location.controller";

const router = Router();

router.get("/popular", locationController.getPopularLocations);
router.get("/all", LocationController.getAllLocations);

export default router;

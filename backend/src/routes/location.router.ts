import { Router } from "express";
import LocationController from "../controllers/location.controller";

const router = Router();

router.get("/all", LocationController.getAllLocations);
router.get("/popular", LocationController.getPopularLocations);

router.get("/search", LocationController.searchLocations);
router.get("/details/:locationId", LocationController.getLocationById);

export default router;

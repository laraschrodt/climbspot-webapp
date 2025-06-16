import { Router } from "express";
import LocationController from "../controllers/location.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/all", LocationController.getAllLocations);
router.get("/popular", LocationController.getPopularLocations);
router.get("/search", LocationController.searchLocations);
router.get("/details/:locationId", LocationController.getLocationById);

router.get("/favorites", AuthMiddleware.verifyToken, LocationController.getFavorites);
router.get("/reviews", AuthMiddleware.verifyToken, LocationController.getUserReviews);

router.post("/favorite/:locationId", AuthMiddleware.verifyToken, LocationController.addFavorite);
router.delete("/favorite/:locationId", AuthMiddleware.verifyToken, LocationController.removeFavorite);

router.post("/reviews/:locationId", AuthMiddleware.verifyToken, LocationController.addReview);

export default router;

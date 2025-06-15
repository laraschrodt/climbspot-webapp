import { Router } from "express";
import AddLocationController from "../controllers/locations/add.location.controller";
import LocationController from "../controllers/locations/location.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import uploadMiddleware from "../middlewares/upload.middlewear";
import FavoritesLocationController from "../controllers/locations/favorites.location.controller";

const router = Router();

router.get("/all", LocationController.getAllLocations);
router.get("/popular", LocationController.getPopularLocations);

router.get("/search", LocationController.searchLocations);

router.get("/details/:locationId", LocationController.getLocationById);

router.get(
  "/favorites",
  AuthMiddleware.verifyToken,
  LocationController.getFavorites
);
router.get(
  "/reviews",
  AuthMiddleware.verifyToken,
  LocationController.getUserReviews
);

router.post(
  "/favorite/:locationId",
  AuthMiddleware.verifyToken,
  FavoritesLocationController.addFavorite
);
router.delete(
  "/favorite/:locationId",
  AuthMiddleware.verifyToken,
  FavoritesLocationController.removeFavorite
);

router.post(
  "/add-location",
  AuthMiddleware.verifyToken,
  uploadMiddleware.single("image"),
  AddLocationController.addLocation
);

export default router;

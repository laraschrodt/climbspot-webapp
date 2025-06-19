import { Router } from "express";
import AddLocationController from "../controllers/locations/add.location.controller";
import LocationController from "../controllers/locations/location.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import uploadMiddleware from "../middlewares/upload.middlewear";
import FavoritesLocationController from "../controllers/locations/favorites.location.controller";
import DeleteLocationController from "../controllers/locations/delete.location.controller";

const router = Router();



/**
 * Locations-Routen
 *
 * Definiert Endpunkte für Kletterorte, inklusive:
 * - Abruf aller Orte, beliebter Orte, Suche und Details
 * - Verwaltung von Favoriten (Hinzufügen/Entfernen)
 * - Hinzufügen, Bearbeiten und Löschen von Orten
 *
 * Authentifizierung wird bei geschützten Routen via `AuthMiddleware.verifyToken` geprüft.
 * Bild-Uploads werden bei Hinzufügen und Bearbeiten über `uploadMiddleware` verarbeitet.
 */

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

router.put(
  "/edit-location/:locationId",
  AuthMiddleware.verifyToken,
  uploadMiddleware.single("image"),
  LocationController.updateLocation
);

router.delete(
  "/:locationId",
  AuthMiddleware.verifyToken,
  DeleteLocationController.deleteLocation
);

router.post("/reviews/:locationId", AuthMiddleware.verifyToken, LocationController.addReview);

export default router;

import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware";
import multer from "multer";
import MyLocationsProfileController from "../controllers/profiles/my.locations.profile.controller";
import profileController from "../controllers/profiles/profile.controller";

/**
 * Alle Methoden in dieser Datei werden in der /profile Route verwendet.
 * Sie sind für das Laden und Aktualisieren der Profildaten zuständig.
 **/

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", AuthMiddleware.verifyToken, profileController.getProfileData);

router.put("/", AuthMiddleware.verifyToken, profileController.updateProfileData);

router.put("/password", AuthMiddleware.verifyToken, profileController.changePassword);

router.get( "/notifications",AuthMiddleware.verifyToken,profileController.getNotifications.bind(profileController));

router.get("/favorites", AuthMiddleware.verifyToken, profileController.getFavorites);

router.get("/reviews", AuthMiddleware.verifyToken, profileController.getReviews);

router.post(
  "/upload-profile-pic",
  AuthMiddleware.verifyToken,
  upload.single("file"),
  profileController.uploadProfileImage
);

router.get(
  "/get-my-locations",
  AuthMiddleware.verifyToken,
  MyLocationsProfileController.getMyLocations
);

export default router;

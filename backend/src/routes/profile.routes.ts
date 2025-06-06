import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware";
import profileController from "../controllers/profile.controller";
import multer from "multer";

/**
 * Alle Methoden in dieser Datei werden in der /profile Route verwendet.
 * Sie sind für das laden und aktualisieren der Profildaten zuständig.
**/

const router = Router();

router.get("/", AuthMiddleware.verifyToken, profileController.getProfileData);
router.put("/", AuthMiddleware.verifyToken, profileController.updateProfileData);
router.put("/password", AuthMiddleware.verifyToken, profileController.changePassword);
router.get("/notifications", AuthMiddleware.verifyToken, profileController.getNotifications);
router.get("/favorites", AuthMiddleware.verifyToken, profileController.getFavorites);

const upload = multer({ storage: multer.memoryStorage() });
router.post("/upload-image", AuthMiddleware.verifyToken, upload.single("file"), profileController.uploadProfileImage);

export default router;

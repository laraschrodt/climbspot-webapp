import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { getProfileData, updateProfileData, uploadProfileImage } from "../controllers/profil.controller";
import { changePassword } from "../controllers/account.controller";
import multer from "multer";

const router = Router();

router.get("/", verifyToken, getProfileData);
router.put("/", verifyToken, updateProfileData);
router.put("/password", verifyToken, changePassword);

const upload = multer({ storage: multer.memoryStorage() });
router.post("/upload-image", verifyToken, upload.single("file"), uploadProfileImage);

export default router;

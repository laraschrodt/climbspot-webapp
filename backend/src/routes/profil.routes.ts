import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { getProfileData, updateProfileData } from "../controllers/profil.controller";
import { changePassword } from "../controllers/account.controller";

const router = Router();

router.get("/", verifyToken, getProfileData);
router.put("/", verifyToken, updateProfileData);
router.put("/password", verifyToken, changePassword);

export default router;

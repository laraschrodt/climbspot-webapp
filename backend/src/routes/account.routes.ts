import { Router } from "express";
import AccountController from "../controllers/accounts/account.controller";

const router = Router();

/**
 * Alle Methoden in dieser Datei werden in der Regestrierung und Authentifizierung verwendet.
 **/

router.post("/login", AccountController.loginUser);
router.post("/register", AccountController.registerUser);

export default router;

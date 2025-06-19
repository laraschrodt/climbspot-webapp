import { Router } from "express";
import AccountController from "../controllers/accounts/account.controller";

const router = Router();

/**
 * Definiert Endpunkte für Nutzer-Authentifizierung und Registrierung:
 * - POST /login: Nutzer-Login
 * - POST /register: Nutzer-Registrierung
 *
 * Nutzt Methoden aus AccountController.
 */

router.post("/login", AccountController.loginUser);
router.post("/register", AccountController.registerUser);

export default router;

import { Router } from "express";
import { loginUser, registerUser } from "../controllers/account.controller";

const router = Router();

/**
 * Alle Methoden in dieser Datei werden in der Regestrierung und Authentifizierung verwendet.
**/

router.post("/login", loginUser);
router.post("/register", registerUser);


export default router;

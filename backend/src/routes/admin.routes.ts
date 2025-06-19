import { Router } from "express";
import AdminController from "../controllers/admin/admin.controller";

const router = Router();

router.get("/users", AdminController.getUserInformation);
router.delete("/users/:id", AdminController.deleteUser);

export default router;

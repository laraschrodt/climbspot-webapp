import { Router } from "express";
import AdminController from "../controllers/admin/admin.controller";

const router = Router();

router.get("/users", AdminController.getUserInformation);

export default router;

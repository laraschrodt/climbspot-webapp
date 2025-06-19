import { Router } from "express";
import AdminController from "../controllers/admin/admin.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/users",
  authMiddleware.verifyToken,
  AdminController.getUserInformation
);
router.delete(
  "/users/:id",
  authMiddleware.verifyToken,
  AdminController.deleteUser
);
router.patch(
  "/users/:id",
  authMiddleware.verifyToken,
  AdminController.updateUser
);

export default router;

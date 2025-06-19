import { Request, Response } from "express";
import AdminService from "../../services/admin/admin.service";

class AdminController {
  static async getUserInformation(req: Request, res: Response): Promise<void> {
    try {
      const users = await AdminService.getAllUsersFromDB();
      res.status(200).json(users);
    } catch (err: any) {
      console.error("AdminController#getUserInformation:", err);
      res.status(500).json({ error: "Serverfehler" });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      await AdminService.deleteUserFromDB(userId);
      res.status(204).end();
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Löschen fehlgeschlagen" });
    }
  }
}

export default AdminController;

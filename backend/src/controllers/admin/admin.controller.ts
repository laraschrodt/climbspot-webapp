import { Request, Response } from "express";
import AdminService from "../../services/admin/admin.service";

/**
 * Vermittelt HTTP-Requests der Admin-UI an den AdminService
 */
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

  static async updateUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const payload: {
      email?: string;
      vorname?: string;
      nachname?: string;
      stadt?: string;
      benutzername?: string;
    } = req.body;

    try {
      const updated = await AdminService.updateUserInDB(userId, payload);
      if (!updated) {
        res.status(404).json({ error: "Benutzer nicht gefunden" });
      } else {
        res.status(200).json(updated);
      }
    } catch (err: any) {
      console.error("AdminController#updateUser:", err);
      res.status(500).json({ error: "Update fehlgeschlagen" });
    }
  }
}

export default AdminController;

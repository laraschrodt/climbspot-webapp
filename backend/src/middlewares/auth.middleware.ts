import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthedRequest extends Request {
  user?: string | JwtPayload;
  file?: Express.Multer.File;
}

class AuthMiddleware {
  verifyToken(req: AuthedRequest, res: Response, next: NextFunction): void {
    console.log("🛡 verifyToken wurde aufgerufen!"); // DEBUG: Middleware aktiv

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Token fehlt oder ist ungültig" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");

      req.user = decoded;
      next();
    } catch (err) {
      console.error("JWT Fehler:", err);
      res.status(401).json({ error: "Token ungültig oder abgelaufen" });
    }
  }
}

export default new AuthMiddleware();

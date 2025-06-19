import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

/**
 * Erweiterung des Express Request-Interfaces für
 * Benutzerinformationen und Dateiuploads im Request.
 */

export interface AuthedRequest extends Request {
  user?: string | JwtPayload;
  file?: Express.Multer.File;
}


/**
 * AuthMiddleware
 *
 * Middleware zur Verifizierung von JWTs in HTTP-Requests.
 * Prüft, ob im Authorization-Header ein gültiger Bearer-Token vorhanden ist.
 * Bei gültigem Token wird der entschlüsselte Payload im Request-Objekt gespeichert.
 * Bei ungültigem oder fehlendem Token wird eine 401 Unauthorized-Antwort gesendet.
 */
class AuthMiddleware {
    /**
   * Middleware-Funktion zur Verifikation des JWT.
   *
   * @param req AuthedRequest mit optionalem user-Feld
   * @param res Express Response zur Fehlerausgabe
   * @param next Express NextFunction zur Weiterleitung im Middleware-Stack
   */
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

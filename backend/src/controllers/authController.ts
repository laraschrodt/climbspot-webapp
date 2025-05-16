import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/userService";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unbekannter Fehler";
    res.status(401).json({ message: msg });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username } = req.body;
  try {
    const result = await registerUser(email, password, username);
    res.status(201).json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unbekannter Fehler";
    res.status(400).json({ message: msg });
  }
};

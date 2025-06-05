import { RequestHandler } from "express";
import { getLocationWithDetailsByName } from "../services/locationDetails.service"; 

export const getLocationByName: RequestHandler = async (req, res) => {
  const name = req.params.name;

  try {
    const location = await getLocationWithDetailsByName(name);

    if (!location) {
      res.status(404).json({ error: "Nicht gefunden" });
      return;
    }

    res.json(location);
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler" });
  }
};
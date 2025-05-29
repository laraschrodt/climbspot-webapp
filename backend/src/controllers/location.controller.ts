// src/controllers/location.controller.ts
import { Response } from 'express'
import { AuthedRequest } from '../middlewares/auth.middleware'
import LocationsService from '../services/location.service'

class LocationController {
  async getAllLocations(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const locations = await LocationsService.getAllLocationsFromDB()
      res.json(locations)
    } catch (err) {
      console.error('Fehler in getAllLocations:', err)
      res.status(500).json({ error: 'Serverfehler beim Laden aller Orte' })
    }
  }

  async getPopularLocations(req: AuthedRequest, res: Response): Promise<void> {
    try {
      const popular = await LocationsService.getPopularLocationsFromDB()
      res.json(popular)
    } catch (err) {
      console.error('Fehler in getPopularLocations:', err)
      res.status(500).json({ error: 'Serverfehler beim Laden beliebter Orte' })
    }
  }
}

export default new LocationController()

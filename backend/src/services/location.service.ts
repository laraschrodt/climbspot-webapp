import { supabase } from '../lib/supabase'
import { Location } from '../types/Location'

interface Bewertung {
  sterne: number
}

interface RawLocation extends Location {
  bewertungen?: Bewertung[]
}

class LocationsService {
  async getAllLocationsFromDB(): Promise<Location[]> {
    const { data, error } = await supabase
      .from('orte')
      .select('*')

    if (error) throw new Error(error.message)
    return (data ?? []) as Location[]
  }

  async getPopularLocationsFromDB(): Promise<(Location & { rating: number })[]> {
    const { data, error } = await supabase
      .from('orte')
      .select(`
        *,
        bewertungen ( sterne )
      `)

    if (error) throw new Error(error.message)

    const rows = (data ?? []) as RawLocation[]

    const withRating = rows.map((loc) => {
      const sterneArr: number[] = loc.bewertungen
        ? loc.bewertungen.map((b) => b.sterne)
        : []

      const avg =
        sterneArr.length > 0
          ? sterneArr.reduce((sum: number, sterne: number) => sum + sterne, 0) /
            sterneArr.length
          : 0

      return {
        ...loc,
        rating: Math.round(avg),
      }
    })

    return withRating
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 12)
  }

  async searchLocations(query: string): Promise<Location[]> {
    const { data, error } = await supabase
      .from('orte')
      .select('*')
      .ilike('name', `%${query}%`) // Case-insensitive Suche nach dem Namen

    if (error) {
      throw new Error(`Fehler bei der Locationsuche: ${error.message}`)
    }

    return (data ?? []) as Location[]
  }
}

export default new LocationsService()

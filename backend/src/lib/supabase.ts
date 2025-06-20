import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

/**
 * Supabase-Client-Instanz
 *
 * Erzeugt und exportiert eine Supabase-Client-Instanz zur
 * Datenbankkommunikation, basierend auf Umgebungsvariablen.
 */

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import type { PostgrestError } from "@supabase/supabase-js";


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


/**
 * logSupabaseError
 *
 * Hilfsfunktion zur konsistenten Ausgabe von Fehlern,
 * die von Supabase-Postgrest-Operationen zurückgegeben werden.
 *
 * @param scope Kontextbezeichnung für die Fehlerquelle
 * @param err PostgrestError-Objekt mit detaillierten Fehlerinformationen
 */

export function logSupabaseError(scope: string, err: PostgrestError) {
  console.error(`[${scope}] Supabase-Fehler`);
  console.error(" Code   :", err.code ?? "—");
  console.error(" Message:", err.message ?? "—");
  console.error(" Details:", err.details ?? "—");
  console.error(" Hint   :", err.hint ?? "—");
}

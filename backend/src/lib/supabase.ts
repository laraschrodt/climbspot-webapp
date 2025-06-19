import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import type { PostgrestError } from "@supabase/supabase-js";

<<<<<<< HEAD
=======
// .env-Datei aus dem backend-Verzeichnis laden
dotenv.config({
path: path.resolve(__dirname, "../../.env")
});
>>>>>>> 3c90f8b (Bewertungen implementiert)

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

<<<<<<< HEAD

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
=======
// Optional: Debug-Ausgabe nur in Entwicklung
if (process.env.NODE_ENV !== "production") {
console.log("✔ SUPABASE_URL:", supabaseUrl);
console.log("✔ SUPABASE_SERVICE_KEY:", supabaseKey?.substring(0, 20) + "...");
}

// Sicherheits-Check: Fehler werfen, wenn Variablen fehlen
if (!supabaseUrl || !supabaseKey) {
throw new Error("❌ Supabase-Konfiguration fehlt in .env");
}

// Supabase-Client erstellen
export const supabase = createClient(supabaseUrl, supabaseKey);
>>>>>>> 3c90f8b (Bewertungen implementiert)

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";
import type { PostgrestError } from "@supabase/supabase-js";

// .env-Datei aus dem backend-Verzeichnis laden
dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});

// Sicherheits-Check: Fehler werfen, wenn Variablen fehlen
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase-Konfiguration fehlt in .env");
}

// Optional: Debug-Ausgabe nur in Entwicklung
if (process.env.NODE_ENV !== "production") {
  console.log("✔ SUPABASE_URL:", supabaseUrl);
  console.log("✔ SUPABASE_SERVICE_KEY:", supabaseKey?.substring(0, 20) + "...");
}

// Supabase-Client erstellen und exportieren
export const supabase = createClient(supabaseUrl, supabaseKey);

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

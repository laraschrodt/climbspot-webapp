import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// .env-Datei aus dem backend-Verzeichnis laden
dotenv.config({
path: path.resolve(__dirname, "../../.env")
});

// Environment-Variablen extrahieren
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

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
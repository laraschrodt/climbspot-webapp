import { supabase } from "../../lib/supabase";
import { randomUUID } from "crypto";

/**
 * Erstellt eine neue Notification für **jeden Benutzer** der Anwendung.
 *
 * - Lädt alle Benutzer-IDs aus der Tabelle `benutzer`
 * - Erzeugt für jeden Benutzer eine Notification zum neu erstellten Ort
 * - Fügt alle Notifications in einem Insert-Vorgang in die Tabelle `notifications` ein
 *
 * @param ortId - Die ID des neu erstellten Ortes
 * @param ortName - Der Name des Ortes (wird in der Nachricht verwendet)
 * @param pictureUrl - Optionales Vorschaubild des Ortes
 */
export async function createNotificationsForAllUsers(
  ortId: string,
  ortName: string,
  pictureUrl: string
) {
  // Alle Benutzer aus der Datenbank laden
  const { data: users, error } = await supabase
    .from("benutzer")
    .select("benutzer_id");

  if (error || !users) {
    console.error("Fehler beim Laden der Benutzer:", error);
    return;
  }

  // Pro Benutzer eine Notification vorbereiten
  const insertData = users.map(user => ({
    id: randomUUID(), // Eindeutige ID für Notification
    ort_id: ortId,
    title: "Neuer Ort verfügbar!",
    message: `${ortName} wurde hinzugefügt.`,
    picture_url: pictureUrl,
    erstellt_am: new Date().toISOString(),
    is_read: false,
    benutzer_id: user.benutzer_id
  }));

  // Notifications in einem Batch einfügen
  const { error: insertError } = await supabase
    .from("notifications")
    .insert(insertData);

  if (insertError) {
    console.error("Fehler beim Einfügen der Notifications:", insertError);
  }
}

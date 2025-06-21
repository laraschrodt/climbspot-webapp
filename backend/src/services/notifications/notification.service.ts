import { supabase } from "../../lib/supabase";
import { randomUUID } from "crypto";

export async function createNotificationsForAllUsers(
  ortId: string,
  ortName: string,
  pictureUrl: string
) {
  const { data: users, error } = await supabase.from("benutzer").select("benutzer_id");

  if (error || !users) {
    console.error("Fehler beim Laden der Benutzer:", error);
    return;
  }

  const insertData = users.map(user => ({
    id: randomUUID(),
    ort_id: ortId,
    title: "Neuer Ort verfügbar!",
    message: `${ortName} wurde hinzugefügt.`,
    picture_url: pictureUrl,
    erstellt_am: new Date().toISOString(),
    is_read: false,
    benutzer_id: user.benutzer_id
  }));

  const { error: insertError } = await supabase.from("notifications").insert(insertData);

  if (insertError) {
    console.error("Fehler beim Einfügen der Notifications:", insertError);
  }
}

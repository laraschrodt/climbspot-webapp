import { Request } from "express";
import { randomUUID } from "crypto";
import { supabase } from "../../lib/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
import { createNotificationsForAllUsers } from "../notifications/notification.service";

/**
 * Gibt Supabase-Fehler strukturiert in der Konsole aus.
 *
 * @param scope - Kontext bzw. Funktionsname, aus dem der Fehler stammt
 * @param err - Fehlerobjekt von Supabase
 */
function logSupabaseError(scope: string, err: PostgrestError) {
  console.error(`[${scope}] Supabase-Fehler`);
  console.error(" Code   :", err.code ?? "—");
  console.error(" Message:", err.message ?? "—");
  console.error(" Details:", err.details ?? "—");
  console.error(" Hint   :", err.hint ?? "—");
}

/**
 * Fügt einen neuen Kletterort in die Datenbank ein und erstellt zugehörige Datenverknüpfungen.
 *
 * - Lädt das mitgelieferte Bild in Supabase Storage hoch
 * - Speichert den Ort in der "orte"-Tabelle
 * - Verknüpft den Ort mit dem aktuellen Benutzer (in "my-locations")
 * - Erstellt Benachrichtigungen für alle registrierten Nutzer
 *
 * @param request - HTTP-Request-Objekt mit Bilddatei (`file`) und Formulardaten im Body
 * @returns Promise mit Basisdaten des neu angelegten Ortes
 * @throws Fehler bei Bild-Upload, Validierung, Benutzer-ID oder Datenbankoperationen
 */
export async function addLocation(request: Request): Promise<{
  ort_id: string;
  name: string;
  region: string;
  land: string;
  picture_url: string;
}> {
  const file = request.file;
  if (!file) throw new Error("Image file missing");

  const extension = file.mimetype.split("/")[1];
  const storageName = `locations/${randomUUID()}.${extension}`;

  const { error: storageError } = await supabase.storage
    .from("location-pictures")
    .upload(storageName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (storageError) throw new Error(storageError.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("location-pictures").getPublicUrl(storageName);

  const ort_id = request.body.ort_id || randomUUID();

  const record = {
    ort_id,
    name: request.body.name,
    region: request.body.region,
    land: request.body.land,
    schwierigkeit: Number(request.body.schwierigkeit),
    picture_url: publicUrl,
    lat: request.body.lat ? Number(request.body.lat) : null,
    long: request.body.long ? Number(request.body.long) : null,
    charakter: request.body.charakter || null,
    gebirge: request.body.gebirge || null,
    berg: request.body.berg || null,
    hoehe_einstieg_m: request.body.hoehe_einstieg_m
      ? Number(request.body.hoehe_einstieg_m)
      : null,
    talort: request.body.talort || null,
    ausruestung: request.body.ausruestung || null,
    kletterlaenge_m: request.body.kletterlaenge_m
      ? Number(request.body.kletterlaenge_m)
      : null,
    kletterzeit: request.body.kletterzeit || null,
    kletterart: request.body.kletterart || null,
    kinderfreundlich:
      request.body.kinderfreundlich === "true" ||
      request.body.kinderfreundlich === true,
  };

  try {
    const { error: insertOrtErr } = await supabase.from("orte").insert(record);
    if (insertOrtErr) throw insertOrtErr;

    const userId = (request as any).user?.userId as string | undefined;
    if (!userId) throw new Error("Missing userId in request context");

    const { error: insertLinkErr } = await supabase
      .from("my-locations")
      .insert({ benutzer_id: userId, ort_id });
    if (insertLinkErr) throw insertLinkErr;

    await createNotificationsForAllUsers(
      ort_id,
      record.name,
      record.picture_url
    );

    return {
      ort_id,
      name: record.name,
      region: record.region,
      land: record.land,
      picture_url: record.picture_url,
    };
  } catch (err) {
    logSupabaseError("addLocation", err as PostgrestError);
    throw err;
  }
}

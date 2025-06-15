import { Request } from "express";
import { randomUUID } from "crypto";
import { supabase } from "../../lib/supabase";
import type { PostgrestError } from "@supabase/supabase-js";

function logSupabaseError(scope: string, err: PostgrestError) {
  console.error(`[${scope}] Supabase-Fehler`);
  console.error(" Code   :", err.code ?? "—");
  console.error(" Message:", err.message ?? "—");
  console.error(" Details:", err.details ?? "—");
  console.error(" Hint   :", err.hint ?? "—");
}

export async function addLocation(request: Request): Promise<{
  ort_id: string;
  name: string;
  region: string;
  land: string;
  picture_url: string;
  notification: {
    id: string;
    ort_id: string;
    title: string;
    message: string;
    picture_url: string;
    erstellt_am: string;
  };
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


  const { data: urlData } = supabase.storage
    .from("location-pictures")
    .getPublicUrl(storageName);

  const ort_id = request.body.ort_id || randomUUID();
  const record = {
    ort_id,
    name: request.body.name,
    region: request.body.region,
    land: request.body.land,
    schwierigkeit: Number(request.body.schwierigkeit),
    picture_url: urlData.publicUrl,
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

    const notificationId = randomUUID();
    const notification = {
      id: notificationId,
      ort_id: ort_id,
      title: "Neuer Kletterspot!",
      message: `Der Ort "${record.name}" wurde hinzugefügt.`,
      picture_url: record.picture_url,
      erstellt_am: new Date().toISOString(),
    };
    const { error: notifErr } = await supabase
      .from("notifications")
      .insert(notification);
    if (notifErr) throw notifErr;

    return {
      ort_id,
      name: record.name,
      region: record.region,
      land: record.land,
      picture_url: record.picture_url,
      notification,
    };
  } catch (err) {
    logSupabaseError("addLocation", err as PostgrestError);
    throw err;
  }
}
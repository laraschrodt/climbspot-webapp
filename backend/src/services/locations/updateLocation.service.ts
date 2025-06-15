import { Request } from "express";
import { randomUUID } from "crypto";
import { supabase } from "../../lib/supabase";
import { Location } from "../../types/Location";
import type { PostgrestError } from "@supabase/supabase-js";

const num = (v: any): number | undefined =>
  v === undefined || v === null || v === "" ? undefined : Number(v);

const bool = (v: any): boolean | undefined =>
  v === undefined || v === null || v === ""
    ? undefined
    : v === "true" || v === true;

function logSupabaseError(scope: string, err: PostgrestError) {
  console.error(`[${scope}] ${err.code ?? ""} ${err.message ?? ""}`);
}

export async function updateLocation(
  locationId: string,
  req: Request
): Promise<Location> {
  let picture_url: string | undefined;

  if (req.file) {
    const ext = req.file.mimetype.split("/")[1];
    const storageName = `locations/${randomUUID()}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("location-pictures")
      .upload(storageName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });
    if (uploadErr) throw uploadErr;

    const { data: urlData } = supabase.storage
      .from("location-pictures")
      .getPublicUrl(storageName);
    picture_url = urlData.publicUrl;
  }

  const payload: Partial<Location> = {
    name: req.body.name,
    region: req.body.region,
    land: req.body.land,
    schwierigkeit: num(req.body.schwierigkeit),
    lat: num(req.body.lat),
    long: num(req.body.long),
    charakter: req.body.charakter || undefined,
    gebirge: req.body.gebirge || undefined,
    berg: req.body.berg || undefined,
    hoehe_einstieg_m: num(req.body.hoehe_einstieg_m),
    talort: req.body.talort || undefined,
    ausruestung: req.body.ausruestung || undefined,
    kletterlaenge_m: num(req.body.kletterlaenge_m),
    kletterzeit: req.body.kletterzeit || undefined,
    kletterart: req.body.kletterart || undefined,
    kinderfreundlich: bool(req.body.kinderfreundlich),
    picture_url,
  };

  try {
    const { data, error } = await supabase
      .from("orte")
      .update(payload)
      .eq("ort_id", locationId)
      .select("*")
      .single<Location>();
    if (error) throw error;
    return data;
  } catch (err) {
    logSupabaseError("updateLocation", err as PostgrestError);
    throw err;
  }
}

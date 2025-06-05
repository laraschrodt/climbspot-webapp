import { supabase } from "../lib/supabase";

export async function getLocationWithDetailsByName(name: string) {
  const { data: ort, error } = await supabase
    .from("orte")
    .select(`
      ort_id,
      name,
      schwierigkeit,
      koordinaten,
      charakter,
      land,
      region,
      gebirge,
      berg,
      berghoehe_m,
      talort,
      ausruestung,
      kletterlaenge_m,
      kletterzeit,
      kletterart,
      kinderfreundlichkeit,
      absicherung,
      picture_url,
      beschreibung
    `)
    .ilike("name", `%${name}%`)
    .single();

  if (error || !ort) {
    console.error("Fehler beim Abrufen der Location per Name:", error);
    return null;
  }

  return ort;
}
import { supabase } from "../lib/supabase";

export const getProfileDataFromDatabase = async (userId: string) => {
  console.log("Suche Profildaten für userId:", userId);

  const { data, error } = await supabase
    .from("benutzer")
    .select("vorname, nachname, email, benutzername, stadt, passwort_hash")
    .eq("benutzer_id", userId)
    .single();

  if (error || !data) {
    console.error("Supabase-Fehler:", error);
    throw new Error("Profil nicht gefunden");
  }

  console.log("Profildaten gefunden:", data);

  return {
    vorname: data.vorname,
    nachname: data.nachname,
    email: data.email,
    username: data.benutzername,
    location: data.stadt,
    password: data.passwort_hash,
  };
};


export const updateProfileInDatabase = async (
  userId: string,
  {
    vorname,
    nachname,
    email,
    username,
    location,
  }: {
    vorname: string;
    nachname: string;
    email: string;
    username: string;
    location: string;
  }
) => {

  const { error } = await supabase
    .from("benutzer")
    .update({
      vorname,
      nachname,
      email,
      benutzername: username,
      stadt: location,
    })
    .eq("benutzer_id", userId);

  if (error) {
    throw new Error("Error while updating profile: " + error.message);
  }

  return { success: true };
};

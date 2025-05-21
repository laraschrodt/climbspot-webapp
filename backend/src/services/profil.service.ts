import { supabase } from "../lib/supabase";

export const getProfileDataFromDatabase = async (userId: string) => {
  const { data, error } = await supabase
    .from("benutzer")
    .select("email, benutzername, stadt, passwort_hash")
    .eq("benutzer_id", userId)
    .single();

  if (error || !data) {
    throw new Error("Profil nicht gefunden");
  }

  return {
    email: data.email,
    username: data.benutzername,
    location: data.stadt,
    password: data.passwort_hash,
  };
};

export const updateMailNameLocation = async (
  userId: string,
  {
    email,
    username,
    location,
  }: {
    email: string;
    username: string;
    location: string;
  }
) => {

  const { error } = await supabase
    .from("benutzer")
    .update({
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

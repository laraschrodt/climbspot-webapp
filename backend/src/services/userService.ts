import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabase";

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase
    .from("benutzer")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) throw new Error("Benutzer nicht gefunden");

  if (!(await bcrypt.compare(password, data.passwort_hash)))
    throw new Error("Falsches Passwort");

  return jwt.sign({ userId: data.benutzer_id }, process.env.JWT_SECRET!, {
    expiresIn: "2h"
  });
};

export const registerUser = async (
  email: string,
  password: string,
  benutzername: string
) => {
  const hashed = await bcrypt.hash(password, 10);

  const { count } = await supabase
    .from("benutzer")
    .select("email", { count: "exact", head: true })
    .eq("email", email);

  if (count && count > 0) throw new Error("E-Mail existiert bereits");

  const { error, data } = await supabase
    .from("benutzer")
    .insert({
      email,
      passwort_hash: hashed,
      benutzername
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};


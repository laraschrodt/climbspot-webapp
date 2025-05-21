import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabase";
import {
  ERROR_USER_NOT_FOUND,
  ERROR_WRONG_PASSWORD,
  ERROR_EMAIL_EXISTS
} from "../utils/errorMessages";

export const authenticateUserCredentials = async (email: string, password: string) => {
  const { data, error } = await supabase
    .from("benutzer")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data)
    throw new Error(ERROR_USER_NOT_FOUND);

  const match = await bcrypt.compare(password, data.passwort_hash);
  if (!match)
    throw new Error(ERROR_WRONG_PASSWORD);

  return jwt.sign(
    { userId: data.benutzer_id },
    process.env.JWT_SECRET!,
    { expiresIn: "2h" }
  );
};

export const createUserAccount = async (
  email: string,
  password: string,
  benutzername: string
) => {
  const hashed = await bcrypt.hash(password, 10);

  const { count } = await supabase
    .from("benutzer")
    .select("email", { count: "exact", head: true })
    .eq("email", email);

  if (count && count > 0)
    throw new Error(ERROR_EMAIL_EXISTS);

  const { error, data } = await supabase
    .from("benutzer")
    .insert({
      email,
      passwort_hash: hashed,
      benutzername
    })
    .select()
    .single();

  if (error)
    throw new Error(error.message);

  return data;
};

export const changePasswordInDatabase = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const { data, error } = await supabase
    .from("benutzer")
    .select("passwort_hash")
    .eq("benutzer_id", userId)
    .single();

  if (error || !data) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(oldPassword, data.passwort_hash);
  if (!match) {
    throw new Error("Old password is incorrect");
  }

  const newHashed = await bcrypt.hash(newPassword, 10);

  const { error: updateError } = await supabase
    .from("benutzer")
    .update({ passwort_hash: newHashed })
    .eq("benutzer_id", userId);

  if (updateError) {
    throw new Error("Failed to update password");
  }

  return { success: true };
};

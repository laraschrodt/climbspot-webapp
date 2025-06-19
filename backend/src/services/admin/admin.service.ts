import { supabase } from "../../lib/supabase";

export interface UserRow {
  benutzer_id: string;
  email: string;
  vorname: string;
  nachname: string;
}

export interface UserDto {
  id: string;
  email: string;
  vorname: string;
  nachname: string;
}

class AdminService {
  static async getAllUsersFromDB(): Promise<UserDto[]> {
    const { data, error } = await supabase
      .from("benutzer")
      .select("benutzer_id, email, vorname, nachname");

    if (error) {
      throw new Error(`Supabase-Error: ${error.message}`);
    }

    return (data ?? []).map((u) => ({
      id: u.benutzer_id,
      email: u.email,
      vorname: u.vorname,
      nachname: u.nachname,
    }));
  }
}

export default AdminService;

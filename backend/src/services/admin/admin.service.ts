import { supabase } from "../../lib/supabase";
import { User } from "../../types/User";

/**
 * Führt alle Datenbank-Operationen auf der Tabelle `benutzer` in aus,
 * die ein Admin braucht
 */
class AdminService {
  static async getAllUsersFromDB(): Promise<User[]> {
    const { data, error } = await supabase
      .from("benutzer")
      .select("benutzer_id, email, vorname, nachname, benutzername, stadt");
    if (error) throw new Error(error.message);
    return (data ?? []).map((user) => ({
      id: user.benutzer_id,
      email: user.email,
      vorname: user.vorname,
      nachname: user.nachname,
      benutzername: user.benutzername,
      stadt: user.stadt,
    }));
  }

  static async deleteUserFromDB(userId: string): Promise<void> {
    const { error } = await supabase
      .from("benutzer")
      .delete()
      .eq("benutzer_id", userId);
    if (error) throw new Error(error.message);
  }

  static async updateUserInDB(
    userId: string,
    data: Partial<User>
  ): Promise<User | null> {
    const { data: row, error } = await supabase
      .from("benutzer")
      .update({
        email: data.email,
        vorname: data.vorname,
        nachname: data.nachname,
        stadt: data.stadt,
        benutzername: data.benutzername,
      })
      .eq("benutzer_id", userId)
      .select("benutzer_id, email, vorname, nachname, stadt, benutzername")
      .single();
    if (error) throw new Error(error.message);
    if (!row) return null;
    return {
      id: row.benutzer_id,
      email: row.email,
      vorname: row.vorname,
      nachname: row.nachname,
      stadt: row.stadt,
      benutzername: row.benutzername,
    };
  }
}

export default AdminService;

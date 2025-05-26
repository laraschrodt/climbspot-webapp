import { User } from "../models/User";

export interface RegisterResponse {
  benutzer_id: string;
  vorname?: string;
  nachname?: string;
  email: string;
  benutzername: string;
  profilbild_url?: string;
  location?: string;
}

export class RegisterApi {
  private readonly baseUrl = "/api";

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const res = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = (await res.json()) as RegisterResponse & { message?: string };

    if (!res.ok) {
      throw new Error(data.message || "Registrierung fehlgeschlagen");
    }

    return new User(
      data.vorname    || "",
      data.nachname   || "",
      data.email,
      data.benutzername,
      data.profilbild_url || "",
      data.location      || ""
    );
  }
}

/**
 * Ruft den Login-Endpoint auf und liefert
 * { token, username, role } zurück.
 */
export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  message?: string;
}

export class LoginApi {
  private readonly baseUrl = "http://localhost:3001/api";

  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponse = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Login fehlgeschlagen");
    }

    return data;
  }
}

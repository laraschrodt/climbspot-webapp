// src/api/LoginApi.ts
export interface LoginResponse {
  token: string;
}

export class LoginApi {
  private readonly baseUrl = "http://localhost:3001/api";

  async login(email: string, password: string): Promise<string> {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = (await res.json()) as LoginResponse & { message?: string };

    if (!res.ok) {
      throw new Error(data.message || "Login fehlgeschlagen");
    }

    return data.token;
  }
}

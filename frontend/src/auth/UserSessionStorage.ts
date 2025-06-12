const TOKEN_KEY = "token";
const USERNAME_KEY = "username";
const ROLE_KEY = "role";

export class UserSessionStorage {
  static saveUsernameAndTokenInStorage(
    token: string,
    username: string,
    role: string
  ) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(ROLE_KEY, role);
  }

  static removeUsernameAndTokenFromStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROLE_KEY);
  }

  static loadUsernameAndTokenFromStorage(): {
    username: string;
    role: string;
  } | null {
    const token = localStorage.getItem(TOKEN_KEY);
    const username = localStorage.getItem(USERNAME_KEY);
    const role = localStorage.getItem(ROLE_KEY);

    return token && username && role ? { username, role } : null;
  }
}

const TOKEN_KEY = "token";
const USERNAME_KEY = "username";

export class UserSessionStorage {
  static saveUsernameAndTokenInStorage(token: string, username: string) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
  }

  static removeUsernameAndTokenFromStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
  }

  static loadUsernameAndTokenFromStorage(): { username: string } | null {
    const token = localStorage.getItem(TOKEN_KEY);
    const username = localStorage.getItem(USERNAME_KEY);
    return token && username ? { username } : null;
  }
}

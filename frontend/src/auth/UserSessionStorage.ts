const TOKEN_KEY = "token";
const USERNAME_KEY = "username";
const ROLE_KEY = "role";
const USERID_KEY = "userId";

export class UserSessionStorage {
  static saveUsernameAndTokenInStorage(
    token: string,
    username: string,
    role: string,
    userId: string
  ) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(USERID_KEY, userId);
  }

  static removeUsernameAndTokenFromStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USERID_KEY);
  }

  static loadUsernameAndTokenFromStorage(): {
    username: string;
    role: string;
    userId: string;
  } | null {
    const token = localStorage.getItem(TOKEN_KEY);
    const username = localStorage.getItem(USERNAME_KEY);
    const role = localStorage.getItem(ROLE_KEY);
    const userId = localStorage.getItem(USERID_KEY);

    return token && username && role && userId
      ? { username, role, userId }
      : null;
  }
}

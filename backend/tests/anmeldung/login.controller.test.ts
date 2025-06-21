import { Request, Response } from "express";
import AccountController from "../../src/controllers/accounts/account.controller";

jest.mock("../../src/services/accounts/account.service", () => ({
  authenticateUserCredentials: jest.fn(() =>
    Promise.resolve("mocked.jwt.token")
  ),
}));

jest.mock("../../src/lib/supabase", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() =>
            Promise.resolve({
              data: { benutzername: "Testuser" },
              error: null,
            })
          ),
        })),
      })),
    })),
  },
}));

jest.mock("jsonwebtoken", () => ({
  decode: () => ({ userId: "abc123", role: "user" }),
}));

describe("AccountController.loginUser", () => {
  it("should return 200 and access token if login is successful", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "test123",
      },
    } as Request;

    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = { status } as unknown as Response;

    await AccountController.loginUser(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      token: "mocked.jwt.token",
      userId: "abc123",
      username: "Testuser",
      role: "user",
    });
  });
});

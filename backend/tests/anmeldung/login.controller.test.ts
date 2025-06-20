jest.mock("../../src/services/accounts/account.service", () => ({
  __esModule: true,
  default: {
    authenticateUserCredentials: jest.fn(),
  },
}));

jest.mock("../../src/lib/supabase", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({
            data: { benutzername: "TestUser" },
            error: null,
          })),
        })),
      })),
    })),
  },
}));

jest.mock("jsonwebtoken", () => ({
  decode: jest.fn(() => ({
    userId: "abc123",
    role: "user",
  })),
}));

import AccountController from "../../src/controllers/accounts/account.controller";
import AccountService from "../../src/services/accounts/account.service";
import { supabase } from "../../src/lib/supabase";
import { Request, Response } from "express";

describe("AccountController.loginUser", () => {
  it("should return 200 and user data if login is successful", async () => {
    (AccountService.authenticateUserCredentials as jest.Mock).mockResolvedValue("dummy.token");

    const req = {
      body: {
        email: "test@example.com",
        password: "secret",
      },
    } as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status } as unknown as Response;

    await AccountController.loginUser(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      token: "dummy.token",
      userId: "abc123",
      username: "TestUser",
      role: "user",
    });
  });

  it("should return 401 if login fails", async () => {
    (AccountService.authenticateUserCredentials as jest.Mock).mockRejectedValue(
      new Error("Ungültige Anmeldedaten")
    );

    const req = {
      body: {
        email: "wrong@example.com",
        password: "wrongpass",
      },
    } as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status } as unknown as Response;

    await AccountController.loginUser(req, res);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({
      message: "Ungültige Anmeldedaten",
    });
  });
});

import { Request, Response } from "express";
import AccountController from "../../../src/controllers/accounts/account.controller";
import AccountService from "../../../src/services/accounts/account.service";
import ErrorMessages from "../../../src/utils/ErrorMessages";

jest.mock("../../../src/services/accounts/account.service");

describe("AccountController.registerUser", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();

    req = {
      body: {
        email: "test@test.de",
        password: "geheim",
        username: "testuser",
        rolle: "user",
      },
    };
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("soll bei Erfolg Status 201 und Userdaten zurückgeben", async () => {
    const mockResult = {
      benutzer_id: "123",
      email: "test@test.de",
      benutzername: "testuser",
    };
    (AccountService.createUserAccount as jest.Mock).mockResolvedValue(mockResult);

    await AccountController.registerUser(req as Request, res as Response);

    expect(AccountService.createUserAccount).toHaveBeenCalledWith(
      "test@test.de",
      "geheim",
      "testuser",
      "user"
    );
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(mockResult);
  });

  it("soll bei bereits bestehender Email Status 400 und Fehlermeldung zurückgeben", async () => {
    (AccountService.createUserAccount as jest.Mock).mockRejectedValue(
      new Error(ErrorMessages.EMAIL_EXISTS)
    );

    await AccountController.registerUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: ErrorMessages.EMAIL_EXISTS });
  });

  it("soll bei unbekanntem Fehler Status 400 und eine leere Nachricht zurückgeben", async () => {
    (AccountService.createUserAccount as jest.Mock).mockRejectedValue(new Error());

    await AccountController.registerUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
  
    expect(jsonMock).toHaveBeenCalledWith({ message: "" }); 
  });
});

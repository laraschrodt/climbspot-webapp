import AccountController from "../../../src/controllers/accounts/account.controller";
import AccountService from "../../../src/services/accounts/account.service";
import ErrorMessages from "../../../src/utils/ErrorMessages";

jest.mock("../../../src/services/accounts/account.service");

describe("AccountController.registerUser", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        password: "123456",
        username: "TestUser",
        rolle: "user",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("soll bei Erfolg Status 201 zurückgeben", async () => {
    const mockResult = {
      benutzer_id: "123",
      email: "test@example.com",
      benutzername: "TestUser",
    };
    (AccountService.createUserAccount as jest.Mock).mockResolvedValue(mockResult);

    await AccountController.registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("soll bei bereits bestehender Email Status 400 zurückgeben", async () => {
    (AccountService.createUserAccount as jest.Mock).mockRejectedValue(new Error("Email already exists"));
    await AccountController.registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Email already exists" });
  });

  it("soll bei unbekanntem Fehler Status 400 und UNKNOWN Nachricht zurückgeben", async () => {
    (AccountService.createUserAccount as jest.Mock).mockRejectedValue("string error"); // kein Error-Objekt
    await AccountController.registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessages.UNKNOWN }); 
  });
});

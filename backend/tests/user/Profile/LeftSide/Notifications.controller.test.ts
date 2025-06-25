import { Request, Response } from "express";
import profileController from "../../../../src/controllers/profiles/profile.controller";
import ProfileService from "../../../../src/services/profiles/profile.service";

jest.mock("../../../../src/services/profiles/profile.service.ts");

describe("profileController.getNotifications", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();

    req = {
      user: { userId: "user123" },
    } as any;
    
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("soll bei Erfolg eine Liste der Notifications zurückgeben", async () => {
    const mockNotifications = [{ id: "1", message: "Test" }];
    (ProfileService.getNotifications as jest.Mock).mockResolvedValue(mockNotifications);

    await profileController.getNotifications(req as any, res as any);

    expect(ProfileService.getNotifications).toHaveBeenCalledWith("user123");
    expect(jsonMock).toHaveBeenCalledWith(mockNotifications);
  });

  it("soll bei Fehler Status 500 und Fehlermeldung zurückgeben", async () => {
    (ProfileService.getNotifications as jest.Mock).mockRejectedValue(new Error("Fehler"));
    await profileController.getNotifications(req as any, res as any);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Fehler" });
  });
});

describe("profileController.markNotificationAsRead", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    req = {
      user: { userId: "user123" },
      params: { id: "notif123" },
    } as any;
    
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("soll bei Erfolg Status 200 und Erfolgsmeldung zurückgeben", async () => {
    (ProfileService.markNotificationAsRead as jest.Mock).mockResolvedValue(undefined);

    await profileController.markNotificationAsRead(req as any, res as any);

    expect(ProfileService.markNotificationAsRead).toHaveBeenCalledWith("notif123", "user123");
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Notification als gelesen markiert" });
  });

  it("soll bei Fehler Status 500 und Fehlermeldung zurückgeben", async () => {
    (ProfileService.markNotificationAsRead as jest.Mock).mockRejectedValue(new Error("Fehler"));
    await profileController.markNotificationAsRead(req as any, res as any);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Fehler" });
  });
});

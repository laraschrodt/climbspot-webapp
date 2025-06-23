import ProfileController from "../../../../src/controllers/profiles/profile.controller";
import ProfileService from "../../../../src/services/profiles/profile.service";

jest.mock("../../../../src/services/profiles/profile.service");

describe("ProfileController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      user: { userId: "user123" },
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("getNotifications", () => {
    it("sollte eine Liste von Notifications zurückgeben", async () => {
      const mockNotifications = [{ id: "1", title: "Test" }];
      (ProfileService.getNotifications as jest.Mock).mockResolvedValue(mockNotifications);

      await ProfileController.getNotifications(req, res);

      expect(ProfileService.getNotifications).toHaveBeenCalledWith("user123");
      expect(res.json).toHaveBeenCalledWith(mockNotifications);
    });

    it("sollte bei Fehler einen Status 500 zurückgeben", async () => {
      (ProfileService.getNotifications as jest.Mock).mockRejectedValue(new Error("Fehler"));
      await ProfileController.getNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Fehler" });
    });
  });

  describe("markNotificationAsRead", () => {
    it("sollte eine Notification als gelesen markieren", async () => {
      req.params.id = "notif123";
      (ProfileService.markNotificationAsRead as jest.Mock).mockResolvedValue(undefined);

      await ProfileController.markNotificationAsRead(req, res);

      expect(ProfileService.markNotificationAsRead).toHaveBeenCalledWith("notif123", "user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Notification als gelesen markiert" });
    });

    it("sollte bei Fehler einen Status 500 zurückgeben", async () => {
      req.params.id = "notif123";
      (ProfileService.markNotificationAsRead as jest.Mock).mockRejectedValue(new Error("Fehler"));
      await ProfileController.markNotificationAsRead(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Fehler" });
    });
  });
});

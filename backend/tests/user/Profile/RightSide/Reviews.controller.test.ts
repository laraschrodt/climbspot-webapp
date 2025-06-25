import { Request, Response } from "express";
import profileController from "../../../../src/controllers/profiles/profile.controller";
import ProfileService from "../../../../src/services/profiles/profile.service";

jest.mock("../../../../src/services/profiles/profile.service.ts");

describe("profileController.getReviews", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("soll bei gültigem Token Reviews zurückgeben", async () => {
    req = {
      user: { userId: "user123" },
    };
    const mockReviews = [
      { sterne: 5, kommentar: "Top", erstellt_am: "2023-01-01" },
    ];
    (ProfileService.getReviewsByUserId as jest.Mock).mockResolvedValue(mockReviews);

    await profileController.getReviews(req as any, res as any);

    expect(ProfileService.getReviewsByUserId).toHaveBeenCalledWith("user123");
    expect(res.json).toHaveBeenCalledWith(mockReviews);
  });

  it("soll bei fehlender userId Status 401 zurückgeben", async () => {
    req = {};
    await profileController.getReviews(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Kein gültiger Token." });
  });

  it("soll bei Service-Fehler Status 500 zurückgeben", async () => {
    req = {
      user: { userId: "user123" },
    };
    (ProfileService.getReviewsByUserId as jest.Mock).mockRejectedValue(new Error());

    await profileController.getReviews(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Serverfehler beim Laden der Bewertungen" });
  });
});

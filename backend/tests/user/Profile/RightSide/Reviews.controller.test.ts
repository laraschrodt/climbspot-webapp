import ProfileController from "../../../../src/controllers/profiles/profile.controller";
import ProfileService from "../../../../src/services/profiles/profile.service"; 

jest.mock("../../../../src/services/profiles/profile.service");

describe("ProfileController.getReviews", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      user: { userId: "user123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("sollte Reviews erfolgreich zurückgeben", async () => {
    const mockReviews = [
      { sterne: 5, kommentar: "Top!", erstellt_am: "2023-01-01", orte: { name: "TestOrt" } },
    ];
    (ProfileService.getReviewsByUserId as jest.Mock).mockResolvedValue(mockReviews);

    await ProfileController.getReviews(req, res);

    expect(ProfileService.getReviewsByUserId).toHaveBeenCalledWith("user123");
    expect(res.json).toHaveBeenCalledWith(mockReviews);
  });

  it("sollte 401 zurückgeben, wenn keine userId vorhanden ist", async () => {
    req.user = {};
    await ProfileController.getReviews(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Kein gültiger Token." });
  });

  it("sollte 500 zurückgeben, wenn Service einen Fehler wirft", async () => {
    (ProfileService.getReviewsByUserId as jest.Mock).mockRejectedValue(new Error("Fehler"));
    await ProfileController.getReviews(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Serverfehler beim Laden der Bewertungen",
    });
  });
});

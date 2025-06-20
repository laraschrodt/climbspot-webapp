import { Request, Response } from "express";
import { addLocation } from "@services/locations/add.location.service";
import AddLocationController from "@controllers/locations/add.location.controller";

// Mocking the service
jest.mock("@services/locations/add.location.service", () => ({
  __esModule: true,
  addLocation: jest.fn(),
}));

describe("AddLocationController", () => {
  it("should return 201 and location id on success", async () => {
    const req = {
      body: {
        name: "Test Location",
        region: "Test Region",
        land: "Test Land",
        picture_url: "http://example.com/image.jpg",
        long: "10.0",
        lat: "20.0",
        schwierigkeit: "Mittel",
      },
      app: {
        get: jest.fn().mockReturnValue({
          emit: jest.fn(), // WebSocket-Mock
        }),
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (addLocation as jest.Mock).mockResolvedValue({
      ort_id: "12345",
      name: "Test Location",
      region: "Test Region",
      land: "Test Land",
      picture_url: "http://example.com/image.jpg",
      notification: {
        id: "notif-1",
        erstellt_am: "2025-06-20T00:00:00Z",
      },
    });

    await AddLocationController.addLocation(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "12345" });
  });

  it("should return 500 on service error", async () => {
    const req = {
      body: { name: "Fail Location" },
      app: { get: jest.fn() },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (addLocation as jest.Mock).mockRejectedValue(new Error("Fehler beim Hinzufügen"));

    await AddLocationController.addLocation(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Fehler beim Hinzufügen" });
  });
});

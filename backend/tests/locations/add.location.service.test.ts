import { Request, Response } from "express";
import AddLocationController from "../../src/controllers/locations/add.location.controller";
import { addLocation } from "../../src/services/locations/add.location.service";

jest.mock("../../src/services/locations/add.location.service", () => ({
  addLocation: jest.fn(),
}));

describe("AddLocationController.addLocation", () => {
  const mockIo = { emit: jest.fn() };

  const baseReq = {
    app: {
      get: jest.fn(() => mockIo),
    },
  } as unknown as Request;

  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const res = { status } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 if location is added successfully", async () => {
    (addLocation as jest.Mock).mockResolvedValue({
      ort_id: "123",
      name: "Kletterwald Test",
      region: "Rheinland-Pfalz",
      land: "Deutschland",
      picture_url: "http://beispiel-foto.com/foto.jpg",
    });

    const req = {
      ...baseReq,
      body: {
        name: "Kletterwald Test",
        region: "Rheinland-Pfalz",
        land: "Deutschland",
        picture_url: "http://beispiel-foto/foto.jpg",
      },
    } as Request;

    await AddLocationController.addLocation(req, res);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({ id: "123" });
    expect(mockIo.emit).toHaveBeenCalledWith(
      "new-location",
      expect.objectContaining({
        id: "123",
        name: "Kletterwald Test",
      })
    );
  });

  it("should return 400 if required field is missing", async () => {
    (addLocation as jest.Mock).mockRejectedValue(new Error("Fehlende Felder"));

    const req = {
      ...baseReq,
      body: {
        region: "NRW",
        land: "Deutschland",
        picture_url: "http://beispiel-foto.com",
      },
    } as Request;

    await AddLocationController.addLocation(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ error: "Fehlende Felder" });
  });

  it("should return 500 if addLocation service throws an error", async () => {
    (addLocation as jest.Mock).mockRejectedValue(
      new Error("Image file missing")
    );

    const req = {
      ...baseReq,
      body: {
        name: "Test Ort",
        region: "Bayern",
        land: "Deutschland",
        picture_url: "http://beispiel-foto.com/test.jpg",
      },
    } as Request;

    await AddLocationController.addLocation(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ error: "Image file missing" });
  });
});

import { Request, Response } from "express";
import AddLocationController from "../../src/controllers/locations/add.location.controller";

// Supabase-Mock
jest.mock("../../src/lib/supabase", () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        single: jest.fn().mockResolvedValue({
          data: { ort_id: "123", name: "Kletterwald Test" },
          error: null,
        }),
      })),
    })),
  },
}));

describe("AddLocationController.addLocation", () => {
  it("should return 201 if location is added successfully", async () => {
    const req = {
      body: {
        name: "Kletterwald Test",
        region: "Rheinland-Pfalz",
        difficulty: "mittel",
      },
    } as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status } as unknown as Response;

    await AddLocationController.addLocation(req, res);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({ ort_id: "123", name: "Kletterwald Test" });
  });

  it("should return 400 if required field is missing", async () => {
    const req = {
      body: {
        region: "NRW",
        difficulty: "leicht",
        // name fehlt
      },
    } as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status } as unknown as Response;

    await AddLocationController.addLocation(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ message: "Fehlende Felder" });
  });

  it("should return 500 if Supabase returns an error", async () => {
    const { supabase } = require("../../src/lib/supabase");

    supabase.from = jest.fn(() => ({
      insert: jest.fn(() => ({
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { message: "DB-Fehler" },
        }),
      })),
    }));

    const req = {
      body: {
        name: "Test Ort",
        region: "Bayern",
        difficulty: "schwer",
      },
    } as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status } as unknown as Response;

    await AddLocationController.addLocation(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: "Fehler beim Hinzufügen" });
  });
});

jest.mock("../../src/lib/supabase", () => ({
  supabase: { from: jest.fn(), delete: jest.fn(), update: jest.fn() },
}));

import AdminService from "../../src/services/admin/admin.service";
import AdminController from "../../src/controllers/admin/admin.controller";
import { supabase } from "../../src/lib/supabase";
import { Request, Response } from "express";

describe("AdminService", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("getAllUsersFromDB returns mapped users on success", async () => {
    const mockData = [
      {
        benutzer_id: "1",
        email: "a@a.com",
        vorname: "A",
        nachname: "B",
        benutzername: "ab",
        stadt: "X",
      },
    ];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    });
    const users = await AdminService.getAllUsersFromDB();
    expect(users).toEqual([
      {
        id: "1",
        email: "a@a.com",
        vorname: "A",
        nachname: "B",
        benutzername: "ab",
        stadt: "X",
      },
    ]);
  });

  it("getAllUsersFromDB throws on error", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest
        .fn()
        .mockResolvedValue({ data: null, error: { message: "fail" } }),
    });
    await expect(AdminService.getAllUsersFromDB()).rejects.toThrow("fail");
  });

  it("deleteUserFromDB resolves on success", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest
        .fn()
        .mockReturnValue({ eq: () => Promise.resolve({ error: null }) }),
    });
    await expect(AdminService.deleteUserFromDB("1")).resolves.toBeUndefined();
  });

  it("deleteUserFromDB throws on error", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest
        .fn()
        .mockReturnValue({
          eq: () => Promise.resolve({ error: { message: "delfail" } }),
        }),
    });
    await expect(AdminService.deleteUserFromDB("1")).rejects.toThrow("delfail");
  });

  it("updateUserInDB returns user on success", async () => {
    const row = {
      benutzer_id: "1",
      email: "a@a.com",
      vorname: "A",
      nachname: "B",
      stadt: "X",
      benutzername: "ab",
    };
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: row, error: null }),
          }),
        }),
      }),
    });
    const updated = await AdminService.updateUserInDB("1", {
      email: "a@a.com",
    });
    expect(updated).toEqual({
      id: "1",
      email: "a@a.com",
      vorname: "A",
      nachname: "B",
      stadt: "X",
      benutzername: "ab",
    });
  });

  it("updateUserInDB returns null if no row", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest
        .fn()
        .mockReturnValue({
          eq: () => ({
            select: () => ({
              single: () => Promise.resolve({ data: null, error: null }),
            }),
          }),
        }),
    });
    const updated = await AdminService.updateUserInDB("1", {});
    expect(updated).toBeNull();
  });

  it("updateUserInDB throws on error", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest
        .fn()
        .mockReturnValue({
          eq: () => ({
            select: () => ({
              single: () =>
                Promise.resolve({ data: null, error: { message: "upfail" } }),
            }),
          }),
        }),
    });
    await expect(AdminService.updateUserInDB("1", {})).rejects.toThrow(
      "upfail"
    );
  });
});

describe("AdminController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { params: { id: "1" }, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("getUserInformation success", async () => {
    jest
      .spyOn(AdminService, "getAllUsersFromDB")
      .mockResolvedValue([{ id: "1" } as any]);
    await AdminController.getUserInformation(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: "1" }]);
  });

  it("getUserInformation error", async () => {
    jest
      .spyOn(AdminService, "getAllUsersFromDB")
      .mockRejectedValue(new Error("fail"));
    await AdminController.getUserInformation(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Serverfehler" });
  });

  it("deleteUser success", async () => {
    jest.spyOn(AdminService, "deleteUserFromDB").mockResolvedValue();
    await AdminController.deleteUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });

  it("deleteUser error", async () => {
    jest
      .spyOn(AdminService, "deleteUserFromDB")
      .mockRejectedValue(new Error("fail"));
    await AdminController.deleteUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Löschen fehlgeschlagen" });
  });

  it("updateUser not found", async () => {
    jest.spyOn(AdminService, "updateUserInDB").mockResolvedValue(null);
    await AdminController.updateUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Benutzer nicht gefunden" });
  });

  it("updateUser success", async () => {
    const user = { id: "1", email: "a@a.com" } as any;
    jest.spyOn(AdminService, "updateUserInDB").mockResolvedValue(user);
    await AdminController.updateUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it("updateUser error", async () => {
    jest
      .spyOn(AdminService, "updateUserInDB")
      .mockRejectedValue(new Error("fail"));
    await AdminController.updateUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Update fehlgeschlagen" });
  });
});

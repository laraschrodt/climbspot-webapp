import request from "supertest";
import app from "../../src/index";

describe("GET /api/locations/search", () => {
  it("should return a list of locations for a valid query", async () => {
    const response = await request(app).get(
      "/api/locations/search?query=kletter"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return an empty array for an empty query", async () => {
    const response = await request(app).get("/api/locations/search?query=");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

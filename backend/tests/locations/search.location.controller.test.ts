import request from "supertest";
import app from "../../src/index"; // Stelle sicher, dass dein app dort exportiert ist

describe("GET /api/locations/search", () => {
  it("should return a list of locations for a valid query", async () => {
    const response = await request(app).get("/api/locations/search?query=kletter");
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // Optional: Wenn du weißt, welche Daten in deiner DB sind:
    // expect(response.body.length).toBeGreaterThan(0);
    // expect(response.body[0]).toHaveProperty("name");
  });

  it("should return an empty array for an empty query", async () => {
    const response = await request(app).get("/api/locations/search?query=");
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

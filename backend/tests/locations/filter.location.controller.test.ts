import request from "supertest";
import app from "../../src/index";

/**
 * Testet, ob die Location-Datenstruktur alle notwendigen Felder enthält,
 * die für die Filterung im Frontend verwendet werden.
 */

describe("GET /api/locations/all – Felder für Filterfunktion", () => {
  it("sollte alle erwarteten Felder in den Locations enthalten", async () => {
    const response = await request(app)
      .get("/api/locations/all")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      const loc = response.body[0];

      expect(loc).toHaveProperty("kletterart");
      expect(loc).toHaveProperty("schwierigkeit");
      expect(loc).toHaveProperty("region");
      expect(loc).toHaveProperty("land");
      expect(loc).toHaveProperty("kletterzeit");
      expect(loc).toHaveProperty("kletterlaenge_m");
      expect(loc).toHaveProperty("kinderfreundlich");
    }
  });

  // Server nach dem Testlauf schließen
  afterAll((done) => {
    const server = app.get("server");
    if (server && typeof server.close === "function") {
      server.close(done);
    } else {
      done();
    }
  });
});

import { buildOpnvUrl } from "../../src/utils/opnv";

describe("buildOpnvUrl", () => {
  it("baut die korrekte Google Maps URL", () => {
    const lat = "50.001";
    const long = "8.001";
    const expected = "https://www.google.com/maps/dir/?api=1&destination=50.001,8.001&travelmode=transit";

    const result = buildOpnvUrl(lat, long);
    expect(result).toBe(expected);
  });
});

import { LocationsService } from "../../src/services/locations/location.service";
import { supabase } from "../../src/lib/supabase";

jest.mock("../../src/lib/supabase");

const mockedSupabase = supabase as jest.Mocked<typeof supabase>;

describe("LocationsService.searchLocations", () => {
  const service = new LocationsService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sollte Orte zurückgeben, die dem Suchbegriff entsprechen", async () => {
    const fakeData = [
      {
        ort_id: "abc123",
        name: "Kletterhalle München",
        bewertungen: [{ sterne: 5 }],
      },
    ];

    mockedSupabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        ilike: jest.fn().mockResolvedValue({
          data: fakeData,
          error: null,
        }),
      }),
    } as any);

    const result = await service.searchLocations("München");

    expect(result).toEqual(fakeData);
    expect(mockedSupabase.from).toHaveBeenCalledWith("orte");
  });

  it("sollte einen Fehler werfen, wenn Supabase einen Fehler zurückgibt", async () => {
    mockedSupabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        ilike: jest.fn().mockResolvedValue({
          data: null,
          error: { message: "DB-Fehler" },
        }),
      }),
    } as any);

    await expect(service.searchLocations("Fehler")).rejects.toThrow(
      "DB-Fehler"
    );
  });
});

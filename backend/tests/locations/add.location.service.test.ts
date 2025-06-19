import { Request } from "express";
import { addLocation } from "../../src/services/locations/add.location.service";
import { supabase } from "../../src/lib/supabase";

jest.mock("../../src/lib/supabase", () => ({
  supabase: {
    storage: { from: jest.fn() },
    from: jest.fn(),
  },
}));

jest.mock("crypto", () => ({
  randomUUID: jest.fn().mockReturnValue("generated-uuid"),
}));

interface FakeBody {
  ort_id: string;
  name: string;
  region: string;
  land: string;
  schwierigkeit: string;
  lat: string;
  long: string;
  charakter: string;
  gebirge: string;
  berg: string;
  hoehe_einstieg_m: string;
  talort: string;
  ausruestung: string;
  kletterlaenge_m: string;
  kletterzeit: string;
  kletterart: string;
  kinderfreundlich: string;
}

describe("addLocation Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (supabase.storage.from as jest.Mock).mockReturnValue({
      upload: jest.fn().mockResolvedValue({ error: null }),
      getPublicUrl: jest.fn().mockReturnValue({
        data: { publicUrl: "http://public.url/image.png" },
      }),
    });

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockResolvedValue({ error: null }),
    });
  });

  it("lädt Bild hoch, speichert Datensatz und liefert ort_id zurück", async () => {
    const fakeRequest = {
      file: { buffer: Buffer.from(""), mimetype: "image/png" },
      body: {
        ort_id: "provided-uuid",
        name: "TestName",
        region: "TestRegion",
        land: "TestLand",
        schwierigkeit: "5",
        lat: "1.23",
        long: "4.56",
        charakter: "Char",
        gebirge: "Geb",
        berg: "Brg",
        hoehe_einstieg_m: "100",
        talort: "Tal",
        ausruestung: "Ausr",
        kletterlaenge_m: "30",
        kletterzeit: "02:00",
        kletterart: "Sport",
        kinderfreundlich: "true",
      },
    } as unknown as Request & { file: Express.Multer.File; body: FakeBody };

    (fakeRequest as any).user = { userId: "provided-uuid" };

    const result = await addLocation(fakeRequest);

    expect(supabase.storage.from).toHaveBeenCalledWith("location-pictures");

    const bucket = (supabase.storage.from as jest.Mock).mock.results[0].value;
    expect(bucket.upload).toHaveBeenCalledWith(
      expect.stringMatching(/^locations\/generated-uuid\.png$/),
      fakeRequest.file.buffer,
      { contentType: "image/png", upsert: true }
    );

    expect((result as any).ort_id).toBe("provided-uuid");
  });

  it("wirft Fehler, wenn keine Datei vorhanden ist", async () => {
    const fakeRequest = { file: undefined } as unknown as Request;
    await expect(addLocation(fakeRequest)).rejects.toThrow(
      "Image file missing"
    );
  });
});

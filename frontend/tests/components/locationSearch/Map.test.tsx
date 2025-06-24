import { render, waitFor } from "@testing-library/react";
import Map from "../../../src/components/locationSearch/Map";
import L from "leaflet";
import fetchMock from "jest-fetch-mock";

type Location = {
  ort_id: string;
  name: string;
  talort: string;
  region: string;
  lat: number;
  long: number;
  kletterart: string;
  schwierigkeit: string;
};

jest.mock("leaflet", () => {
  const original = jest.requireActual("leaflet");
  return {
    ...original,
    map: jest.fn().mockReturnValue({ addLayer: jest.fn() }),
    tileLayer: jest.fn().mockReturnValue({ addTo: jest.fn() }),
    markerClusterGroup: jest.fn().mockReturnValue({
      clearLayers: jest.fn(),
      addLayer: jest.fn(),
    }),
    marker: jest.fn().mockReturnValue({
      bindPopup: jest.fn().mockReturnValue({}),
    }),
  };
});

describe("Map component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  it("renders and adds markers for all fetched locations", async () => {
    const locations: Location[] = [
      {
        ort_id: "1",
        name: "A",
        talort: "T",
        region: "R",
        lat: 1,
        long: 2,
        kletterart: "Sport",
        schwierigkeit: "5",
      },
      {
        ort_id: "2",
        name: "B",
        talort: "T",
        region: "R",
        lat: 3,
        long: 4,
        kletterart: "Sport",
        schwierigkeit: "3",
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(locations));

    render(<Map filter={null} />);

    await waitFor(() => {
      expect(L.markerClusterGroup).toHaveBeenCalled();
    });

    const cluster = (L.markerClusterGroup as jest.Mock).mock.results[0].value;
    expect(cluster.clearLayers).toHaveBeenCalled();
    expect(cluster.addLayer).toHaveBeenCalledTimes(2);
    expect(L.marker).toHaveBeenCalledWith([1, 2]);
    expect(L.marker).toHaveBeenCalledWith([3, 4]);
  });

  it("applies filter criteria correctly", async () => {
    const locations: Location[] = [
      {
        ort_id: "1",
        name: "A",
        talort: "T",
        region: "R",
        lat: 1,
        long: 2,
        kletterart: "Sport",
        schwierigkeit: "5",
      },
      {
        ort_id: "2",
        name: "B",
        talort: "T",
        region: "R",
        lat: 3,
        long: 4,
        kletterart: "Klettersteig",
        schwierigkeit: "3",
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(locations));

    render(
      <Map
        filter={{
          kletterart: "Sport",
          maxDifficulty: 5,
          standort: "",
          kletterzeit: 0,
          kletterlaenge: 0,
          kinderfreundlich: null,
        }}
      />
    );

    await waitFor(() => {
      expect(L.markerClusterGroup).toHaveBeenCalled();
    });

    const cluster = (L.markerClusterGroup as jest.Mock).mock.results[0].value;
    expect(cluster.addLayer).toHaveBeenCalledTimes(1);
    expect(L.marker).toHaveBeenCalledWith([1, 2]);
  });
});

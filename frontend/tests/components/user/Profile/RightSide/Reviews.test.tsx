// tests/components/user/Reviews.test.tsx

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Reviews from "../../../../../src/components/user/Profile/RightSide/Reviews";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Reviews-Komponente", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    localStorage.setItem("token", "FAKE_TOKEN");
  });

  it("zeigt Ladeanzeige beim ersten Render", async () => {
    render(<Reviews />);
    expect(screen.getByText(/lade bewertungen/i)).toBeInTheDocument();
  });

  it("zeigt Nachricht, wenn keine Bewertungen vorhanden sind", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<Reviews />);

    await waitFor(() =>
      expect(screen.getByText(/keine bewertungen/i)).toBeInTheDocument()
    );
  });

  it("zeigt Bewertungen korrekt an", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          sterne: 3,
          kommentar: "Super Ort!",
          erstellt_am: "2024-12-01T12:00:00Z",
          orte: {
            name: "Kletterhalle X",
            picture_url: "https://example.com/pic.jpg",
          },
        },
      ],
    });

    render(<Reviews />);

    expect(await screen.findByText("Kletterhalle X")).toBeInTheDocument();
    expect(screen.getByText("Super Ort!")).toBeInTheDocument();
    expect(screen.getAllByText("⭐")).toHaveLength(3);
    expect(screen.getByAltText("Kletterhalle X")).toHaveAttribute(
      "src",
      "https://example.com/pic.jpg"
    );
    expect(
      screen.getByText(/erstellt am 1\.12\.2024/i)
    ).toBeInTheDocument(); // deutsches Datum
  });

  it("zeigt trotzdem was an, wenn ein Bild fehlt", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          sterne: 5,
          kommentar: "Ohne Bild",
          erstellt_am: "2025-01-01T00:00:00Z",
          orte: {
            name: "Berg Y",
            picture_url: null,
          },
        },
      ],
    });

    render(<Reviews />);

    expect(await screen.findByText("Berg Y")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument(); // kein <img>
  });
});

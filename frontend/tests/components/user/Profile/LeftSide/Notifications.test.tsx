// tests/components/user/Notifications.test.tsx

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Notifications from "../../../../../src/components/user/Profile/LeftSide/Notifications";
import "@testing-library/jest-dom";
import axios from "axios";

// 🧪 axios und socket.io-client mocken
jest.mock("axios");
jest.mock("socket.io-client", () => ({
  io: jest.fn(() => ({
    on: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Notifications-Komponente", () => {
  beforeEach(() => {
    localStorage.setItem("token", "FAKE_TOKEN");
    mockedAxios.get.mockReset();
  });

  it("zeigt Ladeanzeige beim ersten Render", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<Notifications />);
    expect(screen.getByText(/benachrichtigungen/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/benachrichtigungen/i));

    expect(screen.getByText(/lade/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/keine neuen benachrichtigungen/i)).toBeInTheDocument();
    });
  });

  it("zeigt empfangene Benachrichtigungen an", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: "abc123",
          message: "Neuer Spot entdeckt!",
          erstellt_am: "2025-06-20T12:00:00Z",
          picture_url: null,
        },
      ],
    });

    render(<Notifications />);
    fireEvent.click(screen.getByText(/benachrichtigungen/i));

    expect(await screen.findByText(/neuer spot entdeckt/i)).toBeInTheDocument();
    expect(screen.getByText(/20\.06\.2025/)).toBeInTheDocument(); // deutscher Datumsstring
  });

  it("entfernt Benachrichtigung nach Klick auf 'Gesehen'", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: "id1",
          message: "Testnachricht",
          erstellt_am: "2025-06-20T13:00:00Z",
          picture_url: "",
        },
      ],
    });

    render(<Notifications />);
    fireEvent.click(screen.getByText(/benachrichtigungen/i));

    const btn = await screen.findByRole("button", { name: /gesehen/i });
    fireEvent.click(btn);

    expect(await screen.findByText(/keine neuen benachrichtigungen/i)).toBeInTheDocument();
  });
});

/**
 * @file Notifications.test.tsx
 * @description Unit tests for the `Notifications` component, which handles displaying and managing user notifications.
 * This file uses React Testing Library to render the component and simulate user interactions.
 * It also mocks external dependencies such as Axios for API calls and Socket.IO for real-time updates.
 *
 * @dependencies
 * - @testing-library/react: For rendering and testing React components.
 * - @testing-library/jest-dom: For extended DOM matchers.
 * - axios: Mocked for simulating API requests.
 * - socket.io-client: Mocked for simulating real-time socket connections.
 *
 * @setup
 * - Mocks `axios` to simulate HTTP requests.
 * - Mocks `socket.io-client` to simulate real-time socket events.
 * - `beforeEach`: Resets mocks and sets up a fake token in localStorage.
 *
 * @mockFunctions
 * - `mockedAxios.get`: Tracks and simulates GET requests made by Axios.
 * - `mockedAxios.patch`: Tracks and simulates PATCH requests made by Axios.
 * - `socket.on`: Tracks socket event listeners.
 * - `socket.disconnect`: Tracks socket disconnection calls.
 *
 * @testCases
 * - Verifies that a loading indicator is displayed during the initial render.
 * - Simulates user interactions with the notifications component.
 */

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Notifications from "../../../../../src/components/user/Profile/LeftSide/Notifications";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");
jest.mock("socket.io-client", () => ({
  __esModule: true,
  default: () => ({
    on: jest.fn(),
    disconnect: jest.fn(),
  }),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Notifications-Komponente", () => {
  beforeEach(() => {
    localStorage.setItem("token", "FAKE_TOKEN");
    mockedAxios.get.mockReset();
    mockedAxios.patch.mockReset();
  });

  it("zeigt Ladeanzeige beim ersten Render", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<Notifications />);
    fireEvent.click(screen.getByText(/benachrichtigungen/i));

    // Ladeanzeige sichtbar
    expect(screen.getByText(/lade/i)).toBeInTheDocument();

    // Kein Resultat vorhanden
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
    expect(screen.getByText(/2025-06-20/i)).toBeInTheDocument();
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

    mockedAxios.patch.mockResolvedValueOnce({ status: 200 });

    render(<Notifications />);
    fireEvent.click(screen.getByText(/benachrichtigungen/i));

    const btn = await screen.findByRole("button", { name: /gesehen/i });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(screen.getByText(/keine neuen benachrichtigungen/i)).toBeInTheDocument();
    });
  });
});

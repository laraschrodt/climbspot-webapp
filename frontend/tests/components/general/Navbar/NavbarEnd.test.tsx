jest.mock("../../../../src/auth/UseUserSession", () => ({
  useUserSession: () => ({
    user: { username: "TestUser" },
    clearSession: jest.fn(),
  }),
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NavbarEnd from "../../../../src/components/general/Navbar/NavbarEnd";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("NavbarEnd - Suchfunktion", () => {
  beforeEach(() => {
    // Universeller Mock
    mockedAxios.get.mockImplementation((url) => {
      if (url.startsWith("/api/profile")) {
        return Promise.resolve({ data: { profilbild: null } });
      }
      if (url.startsWith("/api/locations/search")) {
        return Promise.resolve({
          data: [
            { ort_id: "123", name: "Klettergebiet A" },
            { ort_id: "456", name: "Boulderhalle B" },
          ],
        });
      }
      return Promise.reject(new Error("Unexpected URL: " + url));
    });
  });

  it("zeigt Vorschläge nach Eingabe eines Suchbegriffs", async () => {
    render(
      <BrowserRouter>
        <NavbarEnd />
      </BrowserRouter>
    );

    const input = screen.getAllByPlaceholderText("Suche")[0];
    fireEvent.change(input, { target: { value: "klettern" } });

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "/api/locations/search?query=klettern"
      );
    });

    expect(await screen.findByText("Klettergebiet A")).toBeInTheDocument();
    expect(await screen.findByText("Boulderhalle B")).toBeInTheDocument();
  });
});

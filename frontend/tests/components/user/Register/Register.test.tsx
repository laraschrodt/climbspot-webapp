// tests/components/auth/Register.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../../../../src/components/user/Register/Register";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// 🧪 Mocks
jest.mock("../../../../src/api/RegisterApi", () => {
  return {
    RegisterApi: jest.fn().mockImplementation(() => ({
      register: mockRegister,
    })),
  };
});

const mockRegister = jest.fn();

// 🧪 useNavigate Mock
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Register-Komponente", () => {
  beforeEach(() => {
    mockRegister.mockReset();
    mockNavigate.mockReset();
  });

  it("soll Benutzer erfolgreich registrieren und weiterleiten", async () => {
    mockRegister.mockResolvedValueOnce({ username: "TestUser" });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Eingabefelder ausfüllen
    fireEvent.change(screen.getByLabelText("Benutzername"), {
      target: { value: "TestUser" },
    });
    fireEvent.change(screen.getByLabelText("E-Mail Adresse"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Passwort"), {
      target: { value: "123456" },
    });

    // Absenden
    fireEvent.click(screen.getByRole("button", { name: /registrieren/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        "TestUser",
        "test@example.com",
        "123456"
      );
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  it("soll Fehlermeldung anzeigen, wenn Registrierung fehlschlägt", async () => {
    mockRegister.mockRejectedValueOnce(new Error("Registrierung fehlgeschlagen"));

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText("Benutzername"), {
      target: { value: "FehlerUser" },
    });
    fireEvent.change(screen.getByLabelText("E-Mail Adresse"), {
      target: { value: "fail@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Passwort"), {
      target: { value: "fehlerpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrieren/i }));

    expect(await screen.findByText(/registrierung fehlgeschlagen/i)).toBeInTheDocument();
  });
});

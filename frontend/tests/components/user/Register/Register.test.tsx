import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../../../../src/components/user/Register/Register";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

/**
 * @file Register.test.tsx
 * @description Unit tests for the `Register` component, which handles user registration functionality.
 * This file uses React Testing Library to render the component and simulate user interactions.
 * It also mocks external dependencies such as navigation and API calls.
 *
 * @dependencies
 * - React
 * - @testing-library/react: For rendering and testing React components.
 * - react-router-dom: For mocking navigation functionality.
 * - @testing-library/jest-dom: For extended DOM matchers.
 * - ../../../../src/api/RegisterApi: Mocked API for user registration.
 *
 * @setup
 * - `beforeAll`: Mocks the `window.alert` function to prevent actual alerts during tests.
 * - Mocks `useNavigate` from `react-router-dom` to track navigation calls.
 * - Mocks the `RegisterApi` class to simulate API calls for registration.
 *
 * @mockFunctions
 * - `mockNavigate`: Tracks calls to the `useNavigate` function.
 * - `mockRegister`: Tracks calls to the `register` method of the `RegisterApi` class.
 */

beforeAll(() => {
  window.alert = jest.fn();
});


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


const mockRegister = jest.fn();


jest.mock("../../../../src/api/RegisterApi", () => {
  return {
    RegisterApi: class {
      register = (...args: any[]) => mockRegister(...args);
    },
  };
});

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

    fireEvent.change(screen.getByLabelText("Benutzername"), {
      target: { value: "TestUser" },
    });
    fireEvent.change(screen.getByLabelText("E-Mail Adresse"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Passwort"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrieren/i }));

    await waitFor(() => {

      expect(mockRegister).toHaveBeenCalledWith(
        "TestUser",
        "test@example.com",
        "123456"
      );
      expect(mockNavigate).toHaveBeenCalledWith("/login");
      expect(window.alert).toHaveBeenCalledWith(
        "Willkommen, TestUser! Registrierung erfolgreich."
      );
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

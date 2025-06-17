// 👇 Mock für useUserSession
jest.mock("../../../src/auth/UseUserSession", () => ({
  useUserSession: () => ({
    user: { username: "TestUser", role: "user" },
    clearSession: jest.fn(),
  }),
}));

// 👇 Imports
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Filter from "../../../src/components/locationSearch/Filter";
import "@testing-library/jest-dom";

describe("Filter-Komponente", () => {
  it("ruft onApply mit den richtigen Filterwerten auf", () => {
    const mockOnApply = jest.fn();

    render(
      <BrowserRouter>
        <Filter onApply={mockOnApply} />
      </BrowserRouter>
    );

    // Kletterart
    const selectKletterart = screen.getByRole("combobox");
    fireEvent.change(selectKletterart, {
      target: { value: "klettern" },
    });

    // Schwierigkeit (Slider)
    const rangeInput = screen.getByRole("slider");
    fireEvent.change(rangeInput, { target: { value: "7" } });

    // Standort
    const standortInput = screen.getByPlaceholderText("Land, Region …");
    fireEvent.change(standortInput, { target: { value: "Bayern" } });

    // Kletterzeit
    const zeitInput = screen.getByPlaceholderText("z. B. 2");
    fireEvent.change(zeitInput, { target: { value: "3" } });

    // Kletterlänge
    const laengeInput = screen.getByPlaceholderText("z. B. 30");
    fireEvent.change(laengeInput, { target: { value: "25" } });

    // Kinderfreundlich: Ja
    fireEvent.click(screen.getByText("Ja"));

    // Absenden
    fireEvent.click(screen.getByRole("button", { name: "Filter anwenden" }));

    expect(mockOnApply).toHaveBeenCalledWith({
      kletterart: "klettern",
      maxDifficulty: 7,
      standort: "Bayern",
      kletterzeit: 3,
      kletterlaenge: 25,
      kinderfreundlich: true,
    });
  });

  it("ruft onApply mit kinderfreundlich: false auf, wenn 'Nein' gewählt wird", () => {
    const mockOnApply = jest.fn();

    render(
      <BrowserRouter>
        <Filter onApply={mockOnApply} />
      </BrowserRouter>
    );

    // Kletterart
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "klettersteig" },
    });

    // Schwierigkeit
    fireEvent.change(screen.getByRole("slider"), { target: { value: "5" } });

    // Standort
    fireEvent.change(screen.getByPlaceholderText("Land, Region …"), {
      target: { value: "Tirol" },
    });

    // Kletterzeit
    fireEvent.change(screen.getByPlaceholderText("z. B. 2"), {
      target: { value: "2" },
    });

    // Kletterlänge
    fireEvent.change(screen.getByPlaceholderText("z. B. 30"), {
      target: { value: "20" },
    });

    // Kinderfreundlich: Nein
    fireEvent.click(screen.getByText("Nein"));

    // Absenden
    fireEvent.click(screen.getByRole("button", { name: "Filter anwenden" }));

    expect(mockOnApply).toHaveBeenCalledWith({
      kletterart: "klettersteig",
      maxDifficulty: 5,
      standort: "Tirol",
      kletterzeit: 2,
      kletterlaenge: 20,
      kinderfreundlich: false,
    });
  });
});

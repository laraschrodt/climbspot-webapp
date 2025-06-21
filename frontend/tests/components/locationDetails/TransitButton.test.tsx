import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TransitButton } from "../../../src/components/locationDetails/LeftSide/TransitButton";

describe("TransitButton", () => {
  const lat = 50.1234;
  const long = 8.5678;

  test.only("renders a link with correct attributes", () => {
    render(<TransitButton lat={lat} long={long} />);

    const link = screen.getByRole("link", { name: /ÖPNV Route/i });
    const expectedHref = `https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=${lat},${long}`;

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", expectedHref);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

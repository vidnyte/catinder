import React from "react";
import { render } from "@testing-library/react";
import Header from "./index.js";

test("Header wrapper renders", () => {
  const { getByTestId } = render(<Header />);
  const headerElem = getByTestId("app-header");
  expect(headerElem).toBeInTheDocument();
});

test("Header logo text renders", () => {
  const { getByTestId } = render(<Header />);
  const logoTextElem = getByTestId("catinder-logo-text");
  expect(logoTextElem).toHaveTextContent("Catinder");
});

test("Header logo image renders", () => {
  const { getByTestId } = render(<Header />);
  const logoImageElem = getByTestId("catinder-logo-image");
  expect(logoImageElem).toBeInTheDocument();
});

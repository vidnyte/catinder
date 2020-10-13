import React from "react";
import { render } from "@testing-library/react";
import Footer from "./index.js";

test("Footer wrapper renders", () => {
  const { getByTestId } = render(<Footer />);
  const wrapperElem = getByTestId("footer-wrapper");
  expect(wrapperElem).toBeInTheDocument();
});

test("Footer image renders", () => {
  const { getByTestId } = render(<Footer />);
  const imageElem = getByTestId("footer-image");
  expect(imageElem).toBeInTheDocument();
});

import React from "react";
import { render } from "@testing-library/react";
import Options from "./index.js";

test("Options tabs renders", () => {
  const { getByTestId } = render(<Options />);
  const tabsElem = getByTestId("tab-wrapper");
  expect(tabsElem).toBeInTheDocument();
});

test("Options container renders", () => {
  const { getByTestId } = render(<Options />);
  const containerElem = getByTestId("options-container");
  expect(containerElem).toBeInTheDocument();
});

import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("App wrapper renders", () => {
  const { getByTestId } = render(<App />);
  const appElem = getByTestId("app");
  expect(appElem).toBeInTheDocument();
});

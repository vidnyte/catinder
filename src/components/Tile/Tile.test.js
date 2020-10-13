import React from "react";
import { render } from "@testing-library/react";
import Tile from "./index.js";

const mockData = {
  adaptability: 5,
  alt_names: "Long-haired Siamese",
  description:
    "Balinese are curious, outgoing, intelligent cats with excellent communication skills. They are known for their chatty personalities and are always eager to tell you their views on life, love, and what you’ve served them for dinner. ",
  id: "bali",
  life_span: "10 - 15",
  name: "Balinese",
  origin: "United States",
  temperament: "Affectionate, Intelligent, Playful",
};

const mockTile = (
  <Tile key={mockData.id} breed={mockData.id} data={mockData} language={"en"} />
);

test("Tile wrapper renders", () => {
  const { getByTestId } = render(mockTile);
  const headerElem = getByTestId("tile-wrapper");
  expect(headerElem).toBeInTheDocument();
});

test("Tile name renders", () => {
  const { getByTestId } = render(mockTile);
  const tileNameElem = getByTestId("tile-name");
  expect(tileNameElem).toHaveTextContent(mockData.name);
});

test("Tile altname renders", () => {
  const { getByTestId } = render(mockTile);
  const tileAltElem = getByTestId("tile-altname");
  expect(tileAltElem).toHaveTextContent(mockData.alt_names);
});

test("Tile description renders", () => {
  const { getByTestId } = render(mockTile);
  const tileDescElem = getByTestId("tile-description");
  expect(tileDescElem).toContainHTML(mockData.description);
});

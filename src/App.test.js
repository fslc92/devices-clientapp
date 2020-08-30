import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("should render menu header", () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Ninja RMM Device Manager/i);
  expect(headerElement).toBeInTheDocument();
});

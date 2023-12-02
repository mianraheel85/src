import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

test("Card renders without crashing", () => {
  render(
    <Card
      caption="Test Caption"
      src="test-image.jpg"
      currNum={1}
      totalNum={3}
    />
  );
  // If the component renders without throwing an error, the test passes
});

test("Card snapshot test", () => {
  const { asFragment } = render(
    <Card
      caption="Test Caption"
      src="test-image.jpg"
      currNum={1}
      totalNum={3}
    />
  );
  // Capture the rendered output
  const component = asFragment();
  // Compare with the saved snapshot
  expect(component).toMatchSnapshot();
});

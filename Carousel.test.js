import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

//  smoke test
test("Carousel renders without crashing", () => {
  render(<Carousel photos={[]} title="Test Carousel" />);
  // If the component renders without throwing an error, the test passes
});

// snapshot test
test("Carousel snapshot test", () => {
  const { asFragment } = render(<Carousel photos={[]} title="Test Carousel" />);
  // Capture the rendered output
  const component = asFragment();
  // Compare with the saved snapshot
  expect(component).toMatchSnapshot();
});

// clicking on left arrow
it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();

  // move to image 2
  fireEvent.click(container.querySelector(".bi-arrow-right-circle"));

  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

// clicking on right arrow
it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

// missing arrows
test("left arrow is missing on the first image, and right arrow is missing on the last image", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="Test Carousel" />
  );

  // Check that the left arrow is missing on the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).not.toBeInTheDocument(); // This will fail

  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // Move to the last image
  TEST_IMAGES.forEach(() => {
    //expect(rightArrow).toBeInTheDocument();
    fireEvent.click(rightArrow);
  });

  // Check that the right arrow is missing on the last image
  // const rightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(rightArrow).not.toBeInTheDocument(); // This will fail
});

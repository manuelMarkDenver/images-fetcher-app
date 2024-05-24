import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import PhotoComponent from "../../features/photos/PhotoComponent";
import { Photo } from "../../types/Photo";

describe("PhotoComponent", () => {
  it("should render the photo component", () => {
    const photo = {
      id: 1,
      title: "Photo title",
      url: "https://example.com/photo.jpg",
    } as Photo;

    render(<PhotoComponent photo={photo} />);

    expect(screen.getByText("Photo title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/photo.jpg"
    );
  });
});

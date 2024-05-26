import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import PhotoComponent from "../../features/photos/PhotoComponent";
import { Photo } from "../../types/Photo";

describe("PhotoComponent", () => {
  it("should render the photo component", async () => {
    const photo = {
      id: 1,
      title: "Photo title",
      url: "https://example.com/photo.jpg",
    } as Photo;

    render(<PhotoComponent photo={photo} />);

    // Assert the title is in the document
    expect(screen.getByText("Photo title")).toBeInTheDocument();

    // Assert the placeholder is in the document initially
    expect(screen.getByText("Loading image...")).toBeInTheDocument();
  });
});

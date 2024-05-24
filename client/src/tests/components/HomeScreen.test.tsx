import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { vi } from "vitest";

// Mock the PhotosContainer component
vi.mock("../../features/photos/PhotosContainer", () => ({
  default: () => <div>Mocked PhotosContainer</div>,
}));

import HomeScreen from "../../screens/HomeScreen";

describe("HomeScreen", () => {
  it("should render the home screen component", () => {
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    screen.debug();
    // Check that the header is rendered
    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    // Check that the mocked PhotosContainer is rendered
    expect(screen.getByText("Mocked PhotosContainer")).toBeInTheDocument();
  });
});

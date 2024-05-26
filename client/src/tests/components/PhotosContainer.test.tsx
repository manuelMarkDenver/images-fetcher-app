// src/features/photos/PhotosContainer.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store"; // Adjust the path to your store
import PhotosContainer from "../../features/photos/PhotosContainer";
import { Photo } from "../../types/Photo";
import { usePhotos } from "../../features/photos/shared/usePhotos";

describe("PhotosContainer", () => {
  beforeEach(() => {
    (usePhotos as ReturnType<typeof vi.fn>).mockReset();

    vi.mock("../../features/photos/shared/usePhotos", () => {
      return {
        __esModule: true,
        usePhotos: vi.fn(),
      };
    });

    vi.mock(
      "../../features/photos/components/PlaceholderPhotoCards",
      async (importOriginal) => {
        const mod = await importOriginal<
          typeof import("../../features/photos/components/PlaceholderPhotoCards")
        >();
        return {
          ...mod,
          skeletonExport: vi.fn(),
          default: () => <div>Mocked SkeletonCards</div>,
        };
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockPhotos: Photo[] = [
    {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
    {
      albumId: 1,
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
    {
      albumId: 1,
      id: 3,
      title: "officia porro iure quia iusto qui ipsa ut modi",
      url: "https://via.placeholder.com/600/24f355",
      thumbnailUrl: "https://via.placeholder.com/150/24f355",
    },
  ];

  const emptyMockPhotos: Photo[] = [];

  const mockedUsePhotos = usePhotos as ReturnType<typeof vi.fn>;

  const mockWithPhotos = (
    PhotoContainerComponent: React.ComponentType<{ photos: Photo[] }>
  ) => {
    return <PhotoContainerComponent photos={mockPhotos} />;
  };

  vi.mock("../../components/withPhotos", () => ({
    __esModule: true,
    withPhotos: (Component: React.ComponentType<{ photos: Photo[] }>) =>
      mockWithPhotos(Component),
  }));

  it("should render No photos found when data is null or empty", () => {
    mockedUsePhotos.mockReturnValue({
      data: null,
      isLoadingMore: false,
      isError: false,
      size: 1,
      setSize: vi.fn(),
      isEmpty: false,
      isReachingEnd: false,
      isRefreshing: false,
    });

    render(
      <Provider store={store}>
        <PhotosContainer />
      </Provider>
    );

    expect(screen.getByText(/No photos found/i)).toBeInTheDocument();
  });

  it("should render No photos found when data is null or empty", () => {
    mockedUsePhotos.mockReturnValue({
      data: null,
      isLoadingMore: false,
      isError: false,
      size: 1,
      setSize: vi.fn(),
      isEmpty: false,
      isReachingEnd: false,
      isRefreshing: false,
    });

    render(
      <Provider store={store}>
        <PhotosContainer />
      </Provider>
    );

    expect(screen.getByText(/No photos found/i)).toBeInTheDocument();
  });

  it("renders SkeletonCards Component when isLoading is true", async () => {
    mockedUsePhotos.mockReturnValue({
      data: null,
      isLoadingMore: true,
      isError: false,
      size: 1,
      setSize: vi.fn(),
      isEmpty: false,
      isReachingEnd: false,
      isRefreshing: false,
    });

    render(
      <Provider store={store}>
        <PhotosContainer />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(screen.getByText(/Mocked Skeleton/i)).toBeInTheDocument();
  });

  it("renders button with 'Loading...' text when isLoading or isRefreshing is true", () => {
    mockedUsePhotos.mockReturnValue({
      data: mockPhotos,
      isLoadingMore: true,
      isError: false,
      size: 1,
      setSize: vi.fn(),
      isEmpty: false,
      isReachingEnd: false,
      isRefreshing: true,
    });

    render(
      <Provider store={store}>
        <PhotosContainer />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("renders button with 'Nothing more to load' when isReachingEnd is true", async () => {
    mockedUsePhotos.mockReturnValue({
      data: mockPhotos,
      isLoadingMore: false,
      isError: false,
      size: 1,
      setSize: vi.fn(),
      isEmpty: false,
      isReachingEnd: true,
      isRefreshing: false,
    });

    render(
      <Provider store={store}>
        <PhotosContainer />
      </Provider>
    );

    const button = screen.getByRole("button");

    await waitFor(() => {
      expect(screen.getByText(/Nothing more/i)).toBeInTheDocument();
    });

    expect(button).toHaveTextContent(/Nothing more/i);

    expect(button).toBeDisabled();
  });

  test('should render empty list and "No photos found" message when data is empty', async () => {
    mockedUsePhotos.mockReturnValue({
      data: emptyMockPhotos,
      isLoadingMore: false,
      isError: false,
      size: 1,
      setSize: vi.fn(),
      isEmpty: false,
      isReachingEnd: true,
      isRefreshing: false,
    });

    render(
      <Provider store={store}>
        <PhotosContainer />
      </Provider>
    );

    const itemsByRole = screen.queryAllByRole("photo");
    expect(itemsByRole.length).toBe(0);

    expect(screen.getByText(/no photos found/i)).toBeInTheDocument();

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent(/Nothing more to load/i);

    expect(button).toBeDisabled();
  });

  it("should render list of photos and button with 'Load More Photos' text when has data or photos, isReachingEnd is false and isLoading is false", async () => {
    mockedUsePhotos.mockReturnValue({
      data: mockPhotos,
      isLoadingMore: false,
      isError: false,
      size: 1,
      setSize: vi.fn(),
      isEmpty: false,
      isReachingEnd: false,
      isRefreshing: false,
    });

    render(
      <Provider store={store}>
        <PhotosContainer />
      </Provider>
    );

    // Query all items by role
    const itemsByRole = screen.getAllByRole("photo");
    expect(itemsByRole.length).toBe(mockPhotos.length);

    // Query each item by test ID
    mockPhotos.forEach((photo) => {
      const itemByTestId = screen.getByTestId(`photo-${photo.id}`);
      expect(itemByTestId).toHaveTextContent(photo.title);
    });

    await waitFor(() => {
      expect(screen.getByText(/Load More Photos/i)).toBeInTheDocument();
    });
  });
});

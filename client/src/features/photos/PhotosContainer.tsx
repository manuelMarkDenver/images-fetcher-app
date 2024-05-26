import { Button, Col, Row, Spinner, Stack } from "react-bootstrap";
import PhotoComponent from "./PhotoComponent";
import { Photo } from "../../types/Photo";
// import ItemsPerPageDropdown from "../../components/ItemsPerPageDropdown";
import StyledInput from "../../components/StyledInput";
import { usePhotos } from "./shared/usePhotos";
import { useSelector } from "react-redux";
import { selectSearchString } from "../../slices/photosSlice";
import PlaceholderPhotoCards from "./components/PlaceholderPhotoCards";
import { Suspense } from "react";

const PhotosContainer = () => {
  const cacheKey = `https://jsonplaceholder.typicode.com/photos`;

  const searchString = useSelector(selectSearchString);

  const {
    data: photos,
    isLoading,
    isError,
    size,
    setSize,
    isEmpty,
    isReachingEnd,
    isRefreshing,
  } = usePhotos({ url: cacheKey, searchString: searchString });
  // const isLoading = true;

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  const withPhotos = photos && Array.isArray(photos) && photos.length > 0;

  const emptyPhotosList = !photos || photos.length === 0 || isEmpty;

  return (
    <Stack gap={3}>
      {/* Search Input */}

      <StyledInput />

      {/* Photos List */}
      {isLoading ? (
        <PlaceholderPhotoCards />
      ) : withPhotos ? (
        <Row
          xs={1}
          md={3}
          className="g-4 max-h-[550px] overflow-y-scroll w-100"
        >
          {photos.map((photo: Photo) => (
            <Col key={photo.id}>
              <Suspense fallback={<PlaceholderPhotoCards />}>
                <PhotoComponent photo={photo} />
              </Suspense>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="flex justify-center items-center text-center w-100">
          No photos found
        </p>
      )}

      <Button
        onClick={() => setSize(size + 1)}
        disabled={isLoading || isReachingEnd || isEmpty || isRefreshing}
      >
        {isLoading && (
          <Spinner animation="border" role="status" aria-hidden="true" />
        )}

        {isLoading || isRefreshing
          ? "Loading..."
          : isReachingEnd || emptyPhotosList
          ? "Nothing more to load"
          : "Load More Photos"}
      </Button>
    </Stack>
  );
};

export default PhotosContainer;

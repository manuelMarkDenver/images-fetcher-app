import { Button, Col, Row, Stack } from "react-bootstrap";
import PhotoComponent from "./PhotoComponent";
import { Photo } from "../../types/Photo";
// import CustomPagination from "../../components/CustomPagination";
// import ItemsPerPageDropdown from "../../components/ItemsPerPageDropdown";
import StyledInput from "../../components/StyledInput";
import { usePhotos } from "./shared/usePhotos";
import { useSelector } from "react-redux";
import { selectSearchString } from "../../slices/photosSlice";

const PhotosContainer = () => {
  const cacheKey = `https://jsonplaceholder.typicode.com/photos`;

  const searchString = useSelector(selectSearchString);
  const {
    data: photos,
    isLoading,
    isError,
    size,
    setSize,
  } = usePhotos({ url: cacheKey, searchString: searchString });

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack gap={3}>
      {/* Search Input */}
      <StyledInput />

      {/* Photos List */}
      <Row xs={1} md={3} className="g-4 max-h-[700px] overflow-y-scroll">
        {photos &&
          Array.isArray(photos) &&
          photos.map((photo: Photo) => (
            <Col key={photo.id}>
              <PhotoComponent photo={photo} />
            </Col>
          ))}
      </Row>

      <Button onClick={() => setSize(size + 1)}>Load More</Button>
    </Stack>
  );
};

export default PhotosContainer;

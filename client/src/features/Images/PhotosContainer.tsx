import { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import PhotoComponent from "./PhotoComponent";
import { Photo } from "../../types/Photo";
// import CustomPagination from "../../components/CustomPagination";
// import ItemsPerPageDropdown from "../../components/ItemsPerPageDropdown";
import StyledInput from "../../components/StyledInput";

const PhotosContainer = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [searchString, setSearchString] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filterPhotosBySearchString = (
    photos: Photo[],
    searchString?: string | undefined
  ) => {
    if (!searchString || searchString === "") return photos;

    try {
      const regex = new RegExp(searchString, "i");

      return photos.filter((photo) => regex.test(photo.title));
    } catch (err) {
      console.error("Invalid regular expression:", err);
      return photos;
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const apiUrl = `https://jsonplaceholder.typicode.com/photos`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: Photo[] = await response.json();

        setPhotos(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    if (!searchString || searchString === "") {
      setFilteredPhotos(photos);
      return;
    }

    const filteredPhotos = filterPhotosBySearchString(photos, searchString);
    setFilteredPhotos(filteredPhotos);
  }, [searchString, photos]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack gap={3}>
      {/* Search Input */}
      <StyledInput
        searchString={searchString}
        setSearchString={setSearchString}
      />

      {/* Photos List */}
      <Row xs={1} md={3} className="g-4 max-h-[700px] overflow-y-scroll">
        {filteredPhotos.map((photo) => (
          <Col key={photo.id}>
            <PhotoComponent photo={photo} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {/* <Stack direction="horizontal" className="flex justify-content-between">
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <ItemsPerPageDropdown
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </Stack> */}
    </Stack>
  );
};

export default PhotosContainer;

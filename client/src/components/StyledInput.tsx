import React, { useState } from "react";
import { Form, Stack } from "react-bootstrap";
import { usePhotos } from "../features/photos/shared/usePhotos";

const StyledInput: React.FC = () => {
  const cacheKey = `https://jsonplaceholder.typicode.com/photos`;

  const [searchString, setSearchString] = useState<string | undefined>("");
  const { filterPhotosBySearchString } = usePhotos(cacheKey);

  const debouncedChange = async (searchString: string | undefined) => {
    filterPhotosBySearchString(0, searchString);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchString(value);
    debouncedChange(searchString);
  };

  return (
    <Form.Group className="mb-4">
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          type="text"
          placeholder="Search images by title..."
          value={searchString}
          onChange={handleChange}
        />
      </Stack>
    </Form.Group>
  );
};

export default StyledInput;

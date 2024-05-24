import { Form, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchString } from "../slices/photosSlice";
import { setPhotoSearchString } from "../slices/photosSlice";
import debounce from "just-debounce-it";
import { useEffect, useState } from "react";
// import { usePhotos } from "../features/photos/shared/usePhotos";

const StyledInput: React.FC = () => {
  const [searchString, setSearchString] = useState<string>("");

  const globalSearchString = useSelector(selectSearchString);

  useEffect(() => {
    if (globalSearchString) setSearchString(globalSearchString);
  }, [globalSearchString]);

  const dispatch = useDispatch();

  const debounceSearch = debounce((value: string) => {
    dispatch(setPhotoSearchString(value));
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchString(value);
    debounceSearch(value);
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

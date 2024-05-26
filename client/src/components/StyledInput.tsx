import { Form, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPhotoSearchString } from "../slices/photosSlice";
import debounce from "just-debounce-it";

const StyledInput: React.FC = () => {
  const dispatch = useDispatch();

  const debounceSearch = debounce((value: string) => {
    dispatch(setPhotoSearchString(value.trim()));
  }, 700);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debounceSearch(value);
  };

  return (
    <Form.Group className="mb-4">
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          type="text"
          placeholder="Search images by title..."
          onChange={handleChange}
        />
      </Stack>
    </Form.Group>
  );
};

export default StyledInput;

import React, {
  useState,
  useCallback,
  useEffect,
  useDeferredValue,
} from "react";
import { Form, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPhotoSearchString } from "../slices/photosSlice";

const StyledInput: React.FC = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const debounceSearch = useCallback(
    (value: string) => {
      dispatch(setPhotoSearchString(value));
    },
    [dispatch]
  );

  const deferredValue = useDeferredValue(inputValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    debounceSearch(deferredValue);
  }, [deferredValue, debounceSearch]);

  return (
    <Form.Group className="mb-4">
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          type="text"
          placeholder="Search images by title..."
          value={inputValue}
          onChange={handleChange}
        />
      </Stack>
    </Form.Group>
  );
};

export default StyledInput;

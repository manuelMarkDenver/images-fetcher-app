import React from "react";
import { Form, Stack } from "react-bootstrap";

type StyledInputProps = {
  searchString?: string;
  setSearchString: (searchString: string) => void; // Callback function to handle search
};

const StyledInput: React.FC<StyledInputProps> = ({
  searchString,
  setSearchString,
}: StyledInputProps) => {
  const handleOnChangeSearchString = (searchString: string) => {
    setSearchString(searchString);
  };

  return (
    <Form.Group className="mb-4">
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          type="text"
          placeholder="Search images by title..."
          value={searchString}
          onChange={(e) => handleOnChangeSearchString(e.target.value)}
        />
      </Stack>
    </Form.Group>
  );
};

export default StyledInput;

import React from "react";
import { Dropdown } from "react-bootstrap";

type ItemsPerPageDropdownProps = {
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
};

const ItemsPerPageDropdown: React.FC<ItemsPerPageDropdownProps> = ({
  itemsPerPage,
  setItemsPerPage,
}) => {
  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setItemsPerPage(Number(eventKey));
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {itemsPerPage}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {[1, 6, 10, 20, 50, 100].map((number) => (
          <Dropdown.Item key={number} eventKey={number.toString()}>
            {number}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ItemsPerPageDropdown;

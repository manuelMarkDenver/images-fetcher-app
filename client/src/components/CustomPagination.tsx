import { Pagination } from "react-bootstrap";

type CustomPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

const CustomPagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: CustomPaginationProps) => {
  const pageNumbers = [];
  const maxPagesToShow = 10;

  const getPageNumbers = () => {
    if (totalPages <= maxPagesToShow) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2));

    const pages = [];
    
    if (startPage > 1) {
      pages.push(1, "...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      pages.push("...", totalPages);
    }

    return pages;
  };

  pageNumbers.push(...getPageNumbers());

  return (
    <Pagination>
      <Pagination.First onClick={() => onPageChange(1)} />
      <Pagination.Prev
        onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
      />
      {pageNumbers.map((number, index) => (
        <Pagination.Item
          key={index}
          active={number === currentPage}
          onClick={() => typeof number === "number" && onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() =>
          onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
        }
      />
      <Pagination.Last onClick={() => onPageChange(totalPages)} />
    </Pagination>
  );
};

export default CustomPagination;

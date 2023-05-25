import React from "react";

export default function Pagniation({
  block,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}) {
  const totalPages = Math.ceil(block?.transactions?.length / itemsPerPage);

  const handleNext = () =>
    setCurrentPage((prevPageNumber) =>
      Math.min(prevPageNumber + 1, totalPages),
    );
  const handlePrev = () =>
    setCurrentPage((prevPageNumber) => Math.max(prevPageNumber - 1, 1));

  // Pagination display settings
  const pagesToShow = 10;
  let pagesBefore = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  if (pagesBefore < 1) pagesBefore = 1;

  let pagesAfter = Math.min(pagesBefore + pagesToShow - 1, totalPages);

  if (pagesAfter - pagesToShow + 1 < pagesBefore) {
    pagesBefore = pagesAfter - pagesToShow + 1;
  }

  return (
    <div className="pagination-container">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      {block ? (
        <span>{`${currentPage}/${totalPages ? totalPages : "Loading"}`}</span>
      ) : (
        <span>Loading...</span>
      )}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

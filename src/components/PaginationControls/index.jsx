import "./PaginationControls.css";
import { memo } from "react";

function PaginationControls({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) {
  if (totalPages <= 0) return null;

  return (
    <div className="pagination-controls">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="page-btn"
      >
        prev
      </button>

      <span className="page-info">
        <strong>{currentPage}</strong> of {totalPages}
      </span>

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="page-btn"
      >
        next
      </button>
    </div>
  );
}

export default memo(PaginationControls);

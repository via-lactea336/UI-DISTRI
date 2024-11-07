import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
      >
        Anterior
      </button>
      <span>
        Página {currentPage + 1} de {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;

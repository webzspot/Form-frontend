import { useState, useEffect } from "react";

const usePagination = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return {
    currentData,
    currentPage,
    totalPages,
    nextPage,
    prevPage
  };
};

export default usePagination;

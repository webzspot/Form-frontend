import React from "react";


const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
   <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-4">
              {colIndex === 0 ? (
                // Reference ID column
                <div className="h-6 w-24 bg-slate-100 rounded-lg"></div>
              ) : colIndex === 1 ? (
                // Issue Details column
                <div>
                  <div className="h-5 bg-slate-100 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-slate-100 rounded w-64"></div>
                </div>
              ) : colIndex === 2 ? (
                // Status Action column
                <div className="h-8 bg-slate-100 rounded-full w-36 mx-auto"></div>
              ) : (
                // Filed Date column
                <div className="h-4 bg-slate-100 rounded w-24 ml-auto"></div>
              )}
            </td>
          ))}
        </tr>
      ))}
   </>
  );
};

export default TableSkeleton;

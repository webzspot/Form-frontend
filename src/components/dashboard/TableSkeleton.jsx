

const TableSkeleton = ({ rows = 5, columns = 6 }) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <tr key={i} className="animate-pulse  ">
          {[...Array(columns)].map((_, j) => (
            <td key={j} className={`px-6 py-4 ${j !== columns - 1 ? 'border-r border-[#E9EAEB]' : ''}`}>
              <div className="h-4 bg-gray-200/60 rounded w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
export default TableSkeleton;
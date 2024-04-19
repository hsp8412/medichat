const PaginationItem = ({
  label,
  currentPage,
  handlePageChange,
}: {
  label: number | string;
  currentPage: number;
  handlePageChange: (page: number) => void;
}) => {
  if (typeof label === "number") {
    return (
      <li>
        <div
          onClick={() => {
            handlePageChange(label);
          }}
          className={`${
            label === currentPage
              ? "z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border-2 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-neutral-800 dark:text-white dark:border-white"
              : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white dark:bg-neutral-800 dark:border-transparent dark:text-white dark:hover:text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          } cursor-pointer`}
        >
          {label}
        </div>
      </li>
    );
  }
  return (
    <li>
      <div
        className={
          "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-neutral-800 dark:border-transparent dark:text-white"
        }
      >
        {label}
      </div>
    </li>
  );
};

export default PaginationItem;

import React from "react";

/**
 * This is the previous page button component for the pagination bar.
 */

const NextPage = () => {
  return (
    <div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white dark:bg-neutral-800 dark:border-transparent border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:text-white dark:hover:text-gray-500">
      <span className="sr-only">Next</span>
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 9 4-4-4-4"
        />
      </svg>
    </div>
  );
};

export default NextPage;

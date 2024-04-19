import React, { Dispatch } from "react";

const FilterButtons = ({
  filterUnread,
  setFilterUnread,
}: {
  filterUnread: boolean;
  setFilterUnread: Dispatch<boolean>;
}) => {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        onClick={() => setFilterUnread(false)}
        className={`${
          !filterUnread && "text-blue-700"
        } px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700`}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => setFilterUnread(true)}
        className={` ${
          filterUnread && "text-blue-700"
        } px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 `}
      >
        Unread
      </button>
    </div>
  );
};

export default FilterButtons;

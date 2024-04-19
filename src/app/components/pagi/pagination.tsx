import _ from "lodash";
import PaginationItem from "@/app/components/pagi/paginationItem";
import PrevPage from "@/app/components/pagi/prevPage";
import NextPage from "@/app/components/pagi/nextPage";

/**
 * This is the pagination bar component for tables/lists.
 * @param pageCount - The total number of pages.
 * @param currentPage - The current page.
 * @param setCurrentPage - The setter for the current page.
 */

const Pagination = ({ pageCount, currentPage, setCurrentPage }: Props) => {
  //if the page count is 1 or 0, don't display the pagination bar
  if (pageCount === 1 || pageCount === 0) {
    return <></>;
  }

  //get the list of all possible pages (1 to pageCount)
  const pages = _.range(1, pageCount + 1);

  //define the max number of pages to display without omitting
  const maxPage = 5;

  //define the number of pages to display on each side of the current page
  const displayOneSideCount = 1;

  //handle previous page button clicked
  const handlePrevPage = () => {
    //if already on the first page, do nothing
    if (currentPage == 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  //handle next page button clicked
  const handleNextPage = () => {
    //if already on the last page, do nothing
    if (currentPage == pageCount) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  //handle pagination item clicked
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //render the pagination items
  const renderPages = () => {
    //if the page count is less than the max number of pages to display, display all pages
    if (pageCount <= maxPage) {
      return pages.map((page) => (
        <PaginationItem
          key={page}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          label={page}
        />
      ));
    }
    //else, display the pages according to the @maxPages and @displayOneSideCount
    // e.g. if @pageCount=39, @maxPages = 5 and @displayOneSideCount = 1
    // if @currentPage = 1, display [1, 2, ... , 9]
    // if @currentPage = 2, display [1, 2, 3, ... , 39]
    // if @currentPage = 3, display [1, 2, 3, 4, ... , 39]
    // if @currentPage = 4, display [1, ... , 3, 4, 5, ... , 39]
    // if @currentPage = 5, display [1, ... , 4, 5, 6, ... , 39]

    //calculate the start and end index of the pages to display in the middle
    let startIndex = currentPage - displayOneSideCount;
    let endIndex = currentPage + displayOneSideCount;

    //if end index is greater than the page count, set it to the page count
    //e.g. if @pageCount=10, @maxPages = 7 and @displayOneSideCount = 2
    //when @currentPage = 9, @startIndex=7, @endIndex = 11
    //so set @endIndex = 10, display [1, ... 7, 8, 9, 10]
    if (endIndex >= pageCount) {
      endIndex = pageCount;
      return (
        <>
          {/*Dispaly first page*/}
          <PaginationItem
            key={1}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            label={1}
          />
          {/*omits pages*/}
          <PaginationItem
            key="omit"
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            label="..."
          />
          {/*display the pages from startIndex to endIndex*/}
          {pages.slice(startIndex - 1, endIndex).map((page) => (
            <PaginationItem
              key={page}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              label={page}
            />
          ))}
        </>
      );
    }

    //if end index is greater than the page count, set it to the page count
    //e.g. if @pageCount=10, @maxPages = 5 and @displayOneSideCount = 1
    //when @currentPage = 1, @startIndex=0, @endIndex = 2
    //so set @startIndex=1, display [1, 2, ..., 10]
    if (startIndex <= 1) {
      startIndex = 1;
      return (
        <>
          {/*Display the pages from startIndex to endIndex*/}
          {pages.slice(startIndex - 1, endIndex).map((page) => (
            <PaginationItem
              key={page}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              label={page}
            />
          ))}
          {/*Omits pages*/}
          <PaginationItem
            key="omit"
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            label="..."
          />
          {/*Display the last page*/}
          <PaginationItem
            handlePageChange={handlePageChange}
            key={pageCount}
            currentPage={currentPage}
            label={pageCount}
          />
        </>
      );
    }

    //if start index is greater than 1 and end index is less than the page count
    //e.g. if @pageCount=10, @maxPages = 5 and @displayOneSideCount = 1
    //when @currentPage = 5, @startIndex=4, @endIndex = 6
    //so display [1, ... , 4, 5, 6, ... , 10]
    return (
      <>
        {/*First page*/}
        <PaginationItem
          key={1}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          label={1}
        />
        {/*if start index is not 2, display ... between page 1 and page startIndex*/}
        {/*e.g.[1, ... , 2, 3, 4]*/}
        {startIndex !== 2 && (
          <PaginationItem
            key="omit-start"
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            label="..."
          />
        )}
        {/*Display pages from start index to end index*/}
        {pages.slice(startIndex - 1, endIndex).map((page) => (
          <PaginationItem
            key={page}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            label={page}
          />
        ))}
        {/*Display ... if end index is not the last page index - 1*/}
        {/*avoid [1, 2, 3, ...., 4]*/}
        {endIndex !== pageCount - 1 && (
          <PaginationItem
            handlePageChange={handlePageChange}
            key="omit-end"
            currentPage={currentPage}
            label="..."
          />
        )}
        {/*Display the last page*/}
        <PaginationItem
          handlePageChange={handlePageChange}
          key={pageCount}
          currentPage={currentPage}
          label={pageCount}
        />
      </>
    );
  };

  return (
    <ul className="flex justify-start md:justify-center items-center h-10 text-base">
      {/*Previous page button*/}
      <li onClick={handlePrevPage} className="cursor-pointer">
        <PrevPage />
      </li>
      {/*Display pagination items*/}
      {renderPages()}
      {/*Next page button*/}
      <li onClick={handleNextPage} className="cursor-pointer">
        <NextPage />
      </li>
    </ul>
  );
};

type Props = {
  pageCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export default Pagination;

import { FC } from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface Props {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  className?: string;
  onPageChange: (page: string | number) => void;
}

const CustomPagination: FC<Props> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (paginationRange === undefined) return <></>;

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const renderPages = paginationRange.map((pageNumber, i) => {
    // If the pageItem is a DOT, render the DOTS unicode character

    if (pageNumber === DOTS) {
      return (
        <li
          key={i}
          className=" py-0 px-3 h-8 text-center my-auto mx-1 text-gray-500 flex items-center tracking-widest border-spacing-4 leading-snug min-w-[32px] --dots-- hover:bg-transparent cursor-default ">
          &#8230;
        </li>
      );
    }

    return (
      <li
        key={i}
        className={` border px-3 py-2 inline-block rounded-full mx-1 cursor-pointer ${
          pageNumber === currentPage
            ? "bg-teal-700 text-teal-50 font-semibold px-4 hover:bg-teal-700 pointer-events-none "
            : "text-teal-600 font-semibold hover:bg-gray-100  "
        } `}
        onClick={() => onPageChange(pageNumber)}>
        {pageNumber}
      </li>
    );
  });

  return (
    <ul className={`flex justify-center items-center ${className}`}>
      {/* Left navigation arrow */}
      <li
        className={`border px-2 py-2 inline-block rounded-full mx-2 cursor-pointer ${
          currentPage === 1
            ? "pointer-events-none hidden"
            : "text-teal-700 font-semibold hover:bg-gray-100"
        }`}
        onClick={onPrevious}>
        <HiChevronLeft size={24} />
      </li>
      {/* render pages */}
      {renderPages}
      {/*  Right Navigation arrow */}
      <li
        className={`border px-2 py-2 inline-block rounded-full mx-2 cursor-pointer ${
          currentPage === lastPage
            ? "pointer-events-none hidden"
            : "text-teal-700 font-semibold hover:bg-gray-100"
        }`}
        onClick={onNext}>
        <HiChevronRight size={24} />
      </li>
    </ul>
  );
};

export default CustomPagination;

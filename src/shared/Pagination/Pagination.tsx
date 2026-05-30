import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { MdOutlineArrowDropDown } from "react-icons/md";

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  pageNumber,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;

  return (
    <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 text-sm text-[#4F4F4F] dark:text-gray-300 font-montserrat my-5 pt-5 w-full">
      <div className="flex items-center gap-2">
        <span className="font-normal">Showing</span>
        <div className="relative flex items-center">
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="appearance-none pl-3 pr-8 py-1.5 border border-[#26385A40] dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-[#4F4F4F] dark:text-gray-200 font-normal focus:outline-none cursor-pointer text-sm transition-colors"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <MdOutlineArrowDropDown size={16} className="text-gray-500 dark:text-gray-400" />
          </span>
        </div>
        <span className="font-normal pl-1">of {totalRecords} Results</span>
      </div>

      <div className="font-normal">
        Page {pageNumber} of {totalPages}
      </div>

      <div className="flex items-center gap-3 pl-2">
        <button
          disabled={pageNumber === 1}
          onClick={() => onPageChange(pageNumber - 1)}
          className="text-black/90 dark:text-white/90 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors cursor-pointer"
        >
          <GoChevronLeft size={20} />
        </button>
        <button
          disabled={pageNumber * pageSize >= totalRecords}
          onClick={() => onPageChange(pageNumber + 1)}
          className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors cursor-pointer"
        >
          <GoChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export default function PaginationProject({
  pageNumber,
  pageSize,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const totalPages =
    pageSize > 0
      ? Math.ceil(totalCount / pageSize)
      : 0;

  const startItem =
    totalCount > 0
      ? (pageNumber - 1) * pageSize + 1
      : 0;

  const endItem = Math.min(
    pageNumber * pageSize,
    totalCount
  );

  if (totalPages === 0) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">
      {/* LEFT */}
      <div className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-700">
          {startItem}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-700">
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-700">
          {totalCount}
        </span>{" "}
        results
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* PREVIOUS */}
        <button
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {/* PAGES */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex h-10 min-w-[40px] items-center justify-center rounded-xl px-3 text-sm font-medium transition ${
                pageNumber === page
                  ? "bg-orange-500 text-white shadow-md"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
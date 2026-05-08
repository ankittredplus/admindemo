"use client";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 disabled:opacity-50"
      >
        Previous
      </button>

      <p className="text-sm text-white/70">
        Page {page} of {pageCount}
      </p>

      <button
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
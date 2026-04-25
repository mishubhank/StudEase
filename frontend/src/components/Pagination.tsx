interface PagesProps {
  page: number;
  hasNext: boolean;
  onPageChange: (page: number) => void;
}

const Pages = ({ page, hasNext, onPageChange }: PagesProps) => {
  const pages = [Math.max(1, page - 1), page, page + 1].filter(
    (value, index, list) => list.indexOf(value) === index,
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="h-10 px-4 rounded-lg border border-slate-700 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>

      {pages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`h-10 min-w-10 px-3 rounded-lg border text-sm font-bold transition-colors ${
            pageNumber === page
              ? "border-emerald-500 bg-emerald-500 text-slate-950"
              : "border-slate-700 text-slate-300 hover:bg-slate-800"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className="h-10 px-4 rounded-lg border border-slate-700 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pages;

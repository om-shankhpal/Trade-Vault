function Pagination({ pagination }) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4 px-2">
      <p className="text-xs font-medium text-slate-500">
        Showing Page <span className="font-semibold text-slate-800">{pagination.page}</span> of{" "}
        <span className="font-semibold text-slate-800">{pagination.totalPages}</span>
      </p>
    </div>
  );
}

export default Pagination;
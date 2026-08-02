function Pagination({ pagination }) {
  if (!pagination) {
    return null;
  }

  return (
    <div className="mt-6 flex justify-end">

      <span className="text-sm text-slate-500">
        Page {pagination.page} of {pagination.totalPages}
      </span>

    </div>
  );
}

export default Pagination;
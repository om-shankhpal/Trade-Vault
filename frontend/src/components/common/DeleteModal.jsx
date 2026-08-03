function DeleteModal({ title, message, onCancel, onConfirm, loading = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="mt-3 text-slate-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-lg border px-4 py-2">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

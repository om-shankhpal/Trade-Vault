import { AlertTriangle } from "lucide-react";

function DeleteModal({ title, message, onCancel, onConfirm, loading = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-600">{message}</p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50 shadow-sm"
          >
            {loading ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

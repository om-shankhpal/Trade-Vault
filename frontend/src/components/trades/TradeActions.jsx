import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function TradeActions({ tradeId, onDelete }) {
  return (
    <div className="inline-flex items-center gap-1">
      <Link
        to={`/trades/${tradeId}`}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
        title="Inspect Trade"
      >
        <Eye className="h-4 w-4" />
      </Link>

      <Link
        to={`/trades/${tradeId}/edit`}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-amber-50 hover:text-amber-700 transition"
        title="Edit Trade"
      >
        <Pencil className="h-4 w-4" />
      </Link>

      <button
        onClick={onDelete}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-700 transition"
        title="Delete Trade"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default TradeActions;
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function TradeActions({ tradeId }) {
  return (
    <div className="flex items-center gap-3">

      <Link
        to={`/trades/${tradeId}`}
        className="text-blue-600 hover:text-blue-800"
        title="View Trade"
      >
        <Eye size={18} />
      </Link>

      <Link
        to={`/trades/${tradeId}/edit`}
        className="text-amber-600 hover:text-amber-800"
        title="Edit Trade"
      >
        <Pencil size={18} />
      </Link>

      <button
        className="text-red-600 hover:text-red-800"
        title="Delete Trade"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
}

export default TradeActions;